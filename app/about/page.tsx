import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-900 text-white">
      <div className="pt-4 px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
          <FaArrowLeft className="text-lg" />
          <span className="text-sm">Back</span>
        </Link>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">


        <div className="space-y-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-white">Hi, I&apos;m <Link href='https://www.arkitworks.xyz/'>Arkit Karmokar</Link></h2>
              <Link href="">
                <div className="flex items-center gap-2">
                  <Image src="/image/rythm.png" alt="Rythm" height={30} width={30} />
                  <h2 className="text-3xl font-bold text-white">Rythm</h2>
                </div>
              </Link>
            </div>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
              A passionate full-stack developer creating innovative web applications that bring ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">My Background</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                As a full-stack developer, I work with modern technologies including React, Next.js, Node.js,
                and various AI integrations. I enjoy the challenge of bringing ideas to life through code.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My expertise spans frontend development with React and TypeScript, backend development
                with Node.js and databases, and integrating cutting-edge AI technologies.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">What Drives Me</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I&apos;m driven by the desire to create technology that makes a positive impact on people&apos;s lives.
                Whether through entertainment, productivity tools, or educational platforms.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new anime series, reading science fiction novels,
                or experimenting with the latest web technologies.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">The Inspiration Behind Reimagin AI Chat</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                The idea for Reimagine AI Chat was born from my fascination with both anime culture and artificial intelligence.
                I&apos;ve always been captivated by the rich storytelling and diverse characters in anime series,
                and I wondered what it would be like to have conversations with these iconic personalities.
              </p>
              <p>
                At the same time, the rapid advancements in AI technology, particularly language models like Google&apos;s Gemini,
                opened up incredible possibilities for creating interactive and engaging experiences.
                I saw an opportunity to combine these two passions into something unique and fun.
              </p>
              <p>
                The project started as a personal experiment to explore AI integration and grew into a platform
                that allows users to chat with AI-powered versions of their favorite characters from anime,
                fiction books, and even Twitter personalities.
              </p>
              <p>
                Through this project, I&apos;ve learned a lot about AI ethics, user experience design,
                and the importance of creating technology that brings people together through shared interests.
              </p>
            </div>
          </div>

          <div className="text-center border-t border-gray-700 pt-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">Get In Touch</h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4">
              I&apos;m always interested in connecting with fellow developers, anime enthusiasts, and anyone
              passionate about AI and technology. Feel free to reach out if you&apos;d like to collaborate
              on projects or discuss development ideas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}