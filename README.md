# Reimagin AI

Reimagin AI is a cutting-edge platform that empowers AI to bring your favorite characters to life through interactive conversations. Transform anime icons, fictional heroes, legendary figures, and more into engaging chat companions powered by advanced AI technology.

## Features

- **Interactive Character Chats**: Engage in conversations with AI-powered versions of your favorite characters
- **Multiple Themes**: Explore chats in different categories:
  - Anime characters
  - Fiction heroes
  - Legendary figures (Eternals)
  - Social media personalities (Twitter)
- **Responsive Design**: Optimized for both desktop and mobile experiences
- **Real-time Conversations**: Powered by Google AI SDK for natural, immersive interactions
- **Customizable UI**: Built with modern React components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google AI SDK (@ai-sdk/google)
- **UI Components**: Radix UI, Lucide React
- **Animations**: Framer Motion
- **Markdown Rendering**: React Markdown with syntax highlighting (Shiki)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd reimagine
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Google AI API key:
```env
GOOGLE_AI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Navigate to the homepage and click "Get Started"
2. Choose your preferred chat theme (Anime, Fiction, Twitter, Eternals)
3. Set up your API key if prompted
4. Start chatting with AI-powered characters!

## Project Structure

```
reimagine/
├── app/                    # Next.js app directory
│   ├── api/chat/          # Chat API routes
│   ├── chat/              # Chat pages for different themes
│   ├── models/            # Models page
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── landing/          # Landing page sections
│   └── animate-ui/       # Animated components
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── backgrounds/      # Video backgrounds
│   └── image/            # Character images
└── system-prompts/       # AI system prompts for different themes
```

## API Routes

- `POST /api/chat` - Handles chat interactions with AI models

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

- `GOOGLE_AI_API_KEY` - Your Google AI API key (required)

## Deployment

This app can be easily deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## License

This project is private and proprietary.

## Support

For support or questions, please open an issue in the repository.
