import { Button } from '../../ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-white">Have fun baddie</h2>
                    <p className="mt-4 text-white">Chat with the charcter you inspired most</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/chat/anime">
                                <span>Get Started</span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="/models">
                                <span>Learn more</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}