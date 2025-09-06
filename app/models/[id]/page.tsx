
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { getModelById } from '@/lib/models';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const model = getModelById(id);

  if (!model) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Navigation Buttons */}
        <div className="mb-8 flex gap-4">
          <Button variant="outline" className='text-black' asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="outline" className='text-black' asChild>
            <Link href="/models">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Models
            </Link>
          </Button>
        </div>

        {/* Model Header */}
        <div className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src={model.image}
              alt={model.name}
              fill
              className="object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{model.name}</h1>
          <p className="text-lg text-gray-300 mb-6">
            Created by{' '}
            <Link
              href={model.author.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline inline-flex items-center"
            >
              {model.author.name}
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </p>
        </div>

        {/* Model Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Prompt */}
          <div className="lg:col-span-2">
            <Card className="bg-stone-800 border-stone-700">
              <CardHeader>
                <CardTitle className="text-white">About {model.name}</CardTitle>
                <CardDescription className="text-gray-300">
                  Learn more about this Characters personality and background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                    {model.systemPrompt}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card className="bg-stone-800 border-stone-700">
              <CardHeader>
                <CardTitle className="text-white">Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={model.author.image}
                      alt={model.author.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">{model.author.name}</p>
                    <Link
                      href={model.author.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-white inline-flex items-center"
                    >
                      View Profile
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card className="bg-stone-800 border-stone-700">
              <CardHeader>
                <CardTitle className="text-white">Category</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200 capitalize">{model.category}</p>
              </CardContent>
            </Card>

            {/* Chat Button */}
            <Button
              size="lg"
              className="w-full"
              asChild
            >
              <Link href={`/chat/${model.category === 'twitter' ? 'twitter' : model.category === 'elite' ? 'elite' : model.category}`}>
                Chat with {model.name}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}