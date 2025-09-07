import { cn } from "@/lib/utils";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { type VariantProps, cva } from "class-variance-authority";
import { SparklesIcon, UserIcon } from "lucide-react";
import React, { type ReactNode } from "react";
import Image from "next/image";

const chatMessageVariants = cva("flex gap-4 w-100", {
       variants: {
       variant: {
	       default: "",
	       bubble: "max-w-2xl w-auto min-w-[120px] mx-auto mb-2",
	       full: "p-5",
       },
       type: {
	       incoming: "justify-start",
	       outgoing: "justify-end",
       },
       },
	compoundVariants: [
		{
			variant: "full",
			type: "outgoing",
			className: "bg-muted",
		},
		{
			variant: "full",
			type: "incoming",
			className: "bg-background",
		},
	],
	defaultVariants: {
		variant: "default",
		type: "incoming",
	},
});

interface MessageContextValue extends VariantProps<typeof chatMessageVariants> {
	id: string;
}

const ChatMessageContext = React.createContext<MessageContextValue | null>(
	null,
);

const useChatMessage = () => {
	const context = React.useContext(ChatMessageContext);
	return context;
};

// Root component
interface ChatMessageProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof chatMessageVariants> {
	children?: React.ReactNode;
	id: string;
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
	(
		{
			className,
			variant = "default",
			type = "incoming",
			id,
			children,
			...props
		},
		ref,
	) => {
		return (
			<ChatMessageContext.Provider value={{ variant, type, id }}>
				<div
					ref={ref}
					className={cn(chatMessageVariants({ variant, type, className }))}
					{...props}
				>
					{children}
				</div>
			</ChatMessageContext.Provider>
		);
	},
);
ChatMessage.displayName = "ChatMessage";

// Avatar component

const chatMessageAvatarVariants = cva(
	"w-8 h-8 flex items-center rounded-full justify-center ring-1 shrink-0 bg-transparent overflow-hidden",
	{
		variants: {
			type: {
				incoming: "ring-border",
				outgoing: "ring-muted-foreground/30",
			},
		},
		defaultVariants: {
			type: "incoming",
		},
	},
);

interface ChatMessageAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	imageSrc?: string;
	icon?: ReactNode;
	name?: string;
}

const ChatMessageAvatar = React.forwardRef<
	HTMLDivElement,
	ChatMessageAvatarProps
>(({ className, icon: iconProps, imageSrc, name, ...props }, ref) => {
	const context = useChatMessage();
	const type = context?.type ?? "incoming";
	const icon =
		iconProps ?? (type === "incoming" ? <SparklesIcon /> : <UserIcon />);
	return (
		<div
			ref={ref}
			className={cn("flex flex-col items-center gap-1", className)}
			{...props}
		>
			<div className={cn(chatMessageAvatarVariants({ type }))}>
				{imageSrc ? (
					<Image
						src={imageSrc}
						alt="Avatar"
						width={32}
						height={32}
						className="h-full w-full object-cover"
					/>
				) : (
					<div className="translate-y-px [&_svg]:size-4 [&_svg]:shrink-0">
						{icon}
					</div>
				)}
			</div>
			{name && (
				<span className="text-xs text-muted-foreground text-center max-w-[60px] truncate">
					{name}
				</span>
			)}
		</div>
	);
});
ChatMessageAvatar.displayName = "ChatMessageAvatar";

// Content component

const chatMessageContentVariants = cva("flex flex-col gap-2", {
       variants: {
	       variant: {
		       default: "",
		       bubble: "rounded-xl px-4 py-2 shadow bg-white text-black dark:bg-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800",
		       full: "",
	       },
	       type: {
		       incoming: "",
		       outgoing: "",
	       },
       },
	compoundVariants: [
		{
			variant: "bubble",
			type: "incoming",
			className: "bg-secondary text-secondary-foreground",
		},
		{
			variant: "bubble",
			type: "outgoing",
			className: "bg-primary text-primary-foreground",
		},
	],
	defaultVariants: {
		variant: "default",
		type: "incoming",
	},
});

interface ChatMessageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  content: string;
}

const ChatMessageContent = React.forwardRef<
  HTMLDivElement,
  ChatMessageContentProps
>(({ className, content, id: idProp, children, ...props }, ref) => {
  const context = useChatMessage();

  const variant = context?.variant ?? "default";
  const type = context?.type ?? "incoming";
  const id = idProp ?? context?.id ?? "";

  return (
    <div
      ref={ref}
      className={cn(chatMessageContentVariants({ variant, type, className }))}
      {...props}
    >
      {content.length > 0 && <MarkdownContent id={id} content={content} />}
      {children}
    </div>
  );
});
ChatMessageContent.displayName = "ChatMessageContent";

export { ChatMessage, ChatMessageAvatar, ChatMessageContent };
