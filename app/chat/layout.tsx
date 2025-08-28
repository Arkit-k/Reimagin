
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone-900">
      <div className="bg-stone-900">{children}</div>
    </div>
  );
}
