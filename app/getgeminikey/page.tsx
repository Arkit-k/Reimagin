import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function GetGeminiKeyPage() {
  return (
    <div>
      <Link href="/">
        <FaArrowLeft className='text-white m-10' />
      </Link>
    <div className="container mx-auto mt-20 p-4 max-w-2xl">
      <h1 className="text-2xl text-white font-bold mb-6">How to Get Google Gemini API Key</h1>

      <div className="space-y-6 text-white">
        <p className="text-lg">
          Follow these steps to obtain your Google Gemini API key:
        </p>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Go to Google AI Studio:</strong> Visit{' '}
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              https://makersuite.google.com/app/apikey
            </a>
          </li>

          <li>
            <strong>Sign in with your Google account:</strong> If you're not already signed in, click the "Sign in" button and use your Google credentials.
          </li>

          <li>
            <strong>Create or select a project:</strong> If prompted, create a new Google Cloud project or select an existing one.
          </li>

          <li>
            <strong>Enable the Gemini API:</strong> Make sure the Gemini API is enabled for your project. If not, you'll be prompted to enable it.
          </li>

          <li>
            <strong>Create an API key:</strong> Click on "Create API key" or "Get API key". You may need to agree to the terms of service.
          </li>

          <li>
            <strong>Copy your API key:</strong> Once created, copy the API key and store it securely. You'll need this key to use Gemini in this application.
          </li>
        </ol>

        <div className="bg-yellow-900 border border-yellow-600 rounded p-4">
          <h3 className="font-semibold text-yellow-200 mb-2">Important Notes:</h3>
          <ul className="list-disc list-inside space-y-1 text-yellow-100">
            <li>Keep your API key secure and don't share it publicly</li>
            <li>Google may charge for API usage beyond the free tier</li>
            <li>You can manage your API keys in the Google Cloud Console</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href="/setkey"
            className="bg-primary hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
          >
            Back to Set API Key
          </Link>
          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            Get API Key Now
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}