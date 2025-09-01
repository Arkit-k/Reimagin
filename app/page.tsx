import Link from "next/link";
import Image from "next/image";
import { GitHubStarsButton } from "@/components/animate-ui/buttons/github-stars";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900">
      <div className="text-center space-y-6 p-4 md:p-8">
        <Image
          src="/image/Logo.png"
          alt="Kymon AI Chat Logo"
          width={120}
          height={120}
          className="mx-auto mb-4 md:mb-6 md:w-[150px] md:h-[150px]"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">Welcome to Reimagine AI Chat</h1>
        <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8">Chat with AI personalities from your favorite anime, fiction, and Twitter characters</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/chats/anime"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Chat with Anime Characters
          </Link>
          <Link
            href="/chats/fiction"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Chat with Fiction Characters
          </Link>
          <Link
            href="/chats/twitter"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Chat with Twitter Personalities
          </Link>
        </div>
        <div className="mt-8 space-y-2">
          <Link
            href="/setkey"
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Set your API key to get started
          </Link>
          <Link
            href="/contribute"
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Learn how to contribute new characters
          </Link>
        </div>
        <div className="mt-8">
          <GitHubStarsButton username="Arkit-k" repo="Reimagine" showStars={false} />
        </div>
      </div>
    </div>
  );
}
