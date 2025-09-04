import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MessageCircle, Users, Sparkles } from 'lucide-react'
import { ReactNode } from 'react'

const features = [
  {
    icon: MessageCircle,
    title: 'AI-Powered Conversations',
    description: 'Engage in intelligent, context-aware chats with AI characters that remember and adapt to your conversations.'
  },
  {
    icon: Users,
    title: 'Diverse Character Collection',
    description: 'Choose from anime heroes, fiction legends, eternal beings, and social media personalities for endless interactive experiences.'
  },
  {
    icon: Sparkles,
    title: 'Immersive Experience',
    description: 'Step into realistic conversations where AI characters respond naturally, creating unforgettable interactive storytelling.'
  }
]

export default function Features() {
  return (
    <section className="py-16 md:py-32">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-white">Why Choose Reimagine</h2>
          <p className="mt-4 text-white">Experience AI-powered conversations with your favorite characters brought to life.</p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 dark:[--color-muted:var(--color-zinc-900)]">
          {features.map((feature, index) => (
            <Card key={index} className="group border-0 shadow-none bg-stone-950">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <feature.icon className="size-6" aria-hidden />
                </CardDecorator>
                <h3 className="mt-6 font-medium text-white">{feature.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-stone-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-stone-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-stone-900)15%,transparent)] dark:group-hover:bg-stone-900/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-stone-900)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-stone-950 absolute inset-0 from-transparent to-75%"
    />
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t bg-stone-950 text-white">{children}</div>
  </div>
)