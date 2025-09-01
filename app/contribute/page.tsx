import Link from "next/link";

export default function ContributePage() {
  return (
    <div className="min-h-screen text-white bg-stone-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Contribution Guide</h1>
          <p className="text-lg text-gray-300">
            Learn how to add new characters to Kymon AI Chat and contribute to the project.
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-300 mb-4">
              Kymon AI Chat supports three categories of characters:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Anime Characters</strong> - Characters from anime series and manga</li>
              <li><strong>Fiction Characters</strong> - Characters from books, movies, games, and other media</li>
              <li><strong>Twitter Personalities</strong> - Characters inspired by Twitter/X personalities</li>
            </ul>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Character Structure</h2>
            <p className="text-gray-300 mb-4">
              Each character is defined with the following properties:
            </p>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">{`{
  id: "unique-identifier",
  name: "Character Name",
  image: "/image/character-image.png",
  systemPrompt: "You are [Character]. [Personality description]",
  author: {
    name: "Author/Creator Name",
    image: "/image/author-image.png",
    link: "https://author-link.com"
  }
}`}</pre>
            </div>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Adding Anime Characters</h2>
            <p className="text-gray-300 mb-4">
              To add a new anime character, edit the file <code className="bg-gray-700 px-2 py-1 rounded">system-prompts/anime-prompts.ts</code>
            </p>

            <h3 className="text-xl font-medium mb-3">Steps:</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
              <li>Add the character image to the <code className="bg-gray-700 px-2 py-1 rounded">public/image/</code> folder</li>
              <li>Add a new object to the <code className="bg-gray-700 px-2 py-1 rounded">ANIME_CHARACTERS</code> array</li>
              <li>Ensure the ID is unique and follows lowercase naming</li>
              <li>Write a clear, concise system prompt that captures the character's personality</li>
            </ol>

            <h3 className="text-xl font-medium mb-3">Example:</h3>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-blue-400">{`{
  id: "naruto",
  name: "Naruto Uzumaki",
  image: "/image/naruto.png",
  systemPrompt: "You are Naruto Uzumaki. Loud, optimistic, determined ninja who never gives up. You believe in your friends and always say 'Believe it!'",
  author: {
    name: "Masashi Kishimoto",
    image: "/image/naruto.png",
    link: "https://en.wikipedia.org/wiki/Masashi_Kishimoto"
  }
}`}</pre>
            </div>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Adding Fiction Characters</h2>
            <p className="text-gray-300 mb-4">
              To add a new fiction character, edit the file <code className="bg-gray-700 px-2 py-1 rounded">system-prompts/fiction-prompts.ts</code>
            </p>

            <h3 className="text-xl font-medium mb-3">Steps:</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
              <li>Add the character image to the <code className="bg-gray-700 px-2 py-1 rounded">public/image/</code> folder</li>
              <li>Add a new object to the <code className="bg-gray-700 px-2 py-1 rounded">Fiction_CHARACTERS</code> array</li>
              <li>Use appropriate author information (company name for commercial properties)</li>
              <li>Include relevant links to character information</li>
            </ol>

            <h3 className="text-xl font-medium mb-3">Example:</h3>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-purple-400">{`{
  id: "harry",
  name: "Harry Potter",
  image: "/image/harry.png",
  systemPrompt: "You are Harry Potter. Brave Gryffindor student, skilled wizard, loyal friend, always ready for adventure.",
  author: {
    name: "J.K. Rowling",
    image: "/image/harry.png",
    link: "https://en.wikipedia.org/wiki/Harry_Potter"
  }
}`}</pre>
            </div>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Adding Twitter Personalities</h2>
            <p className="text-gray-300 mb-4">
              To add a new Twitter personality, edit the file <code className="bg-gray-700 px-2 py-1 rounded">system-prompts/x-prompts.ts</code>
            </p>

            <h3 className="text-xl font-medium mb-3">Steps:</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
              <li>Add the personality image to the <code className="bg-gray-700 px-2 py-1 rounded">public/image/</code> folder</li>
              <li>Add a new object to the <code className="bg-gray-700 px-2 py-1 rounded">Tweet_CHARACTERS</code> array</li>
              <li>Include the Twitter handle in the author link</li>
              <li>Capture the personality's unique traits and communication style</li>
            </ol>

            <h3 className="text-xl font-medium mb-3">Example:</h3>
            <div className="bg-gray-900 rounded p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-cyan-400">{`{
  id: "techguru",
  name: "Tech Guru",
  image: "/image/techguru.png",
  systemPrompt: "You are a tech enthusiast who loves discussing the latest gadgets, programming, and AI developments. You're helpful, enthusiastic, and always excited about new technology.",
  author: {
    name: "TechGuru",
    image: "/image/techguru.png",
    link: "https://x.com/TechGuru"
  }
}`}</pre>
            </div>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Unique IDs:</strong> Ensure each character has a unique ID that doesn't conflict with existing ones</li>
              <li><strong>Image Quality:</strong> Use high-quality, square images (preferably 200x200px or larger)</li>
              <li><strong>System Prompts:</strong> Keep prompts concise but descriptive, focusing on key personality traits</li>
              <li><strong>Author Attribution:</strong> Always credit the original creator or company appropriately</li>
              <li><strong>Testing:</strong> Test your new character to ensure the prompt works well</li>
              <li><strong>Consistency:</strong> Follow the existing code style and formatting</li>
            </ul>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Submitting Changes</h2>
            <p className="text-gray-300 mb-4">
              To contribute your new characters:
            </p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Fork the repository on GitHub</li>
              <li>Create a new branch for your changes</li>
              <li>Add your character data and images</li>
              <li>Test the changes locally</li>
              <li>Submit a pull request with a clear description of your additions</li>
            </ol>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-300">
              If you have questions about contributing or need help with your character additions,
              feel free to open an issue on the GitHub repository or contact the maintainers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}