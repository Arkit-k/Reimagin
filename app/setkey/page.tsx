'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { useApiKeyNotification } from '@/hooks/use-api-key-notification';
import { toast } from 'sonner';
import Link from 'next/link';

export default function SetKeyPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const { resetMessageCount } = useApiKeyNotification();

  useEffect(() => {
    const storedKey = localStorage.getItem('geminiApiKey');
    if (storedKey) {
      setSavedKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('geminiApiKey', apiKey.trim());
      setSavedKey(apiKey.trim());
      setApiKey('');
      resetMessageCount(); // Reset message count when API key is set
      router.push('/chats/anime');
    } else {
      toast.error('Please enter a valid API key.');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('geminiApiKey');
    setSavedKey('');
    toast.success('API Key cleared.');
  };

  return (
    <div className="min-h-screen md:bg-stone-900 pt-10">
    <div className='m-10'>
      <Link href="/">
        <FaArrowLeft className='text-white' />
      </Link>
    </div>
    <div className="container mx-auto mt-20 p-4 max-w-md">
      <h1 className="text-xl text-white font-bold mb-4">Set Google Gemini API Key</h1>
      <div className="space-y-4">
        <p className='text-primary'><Link href='/getgeminikey'>How to get gemini api key</Link></p>
        <div>
          <label htmlFor="apiKey"  className="block text-white text-sm font-medium mb-2">API Key</label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Google Gemini API Key"
            className="w-full px-3 py-2 border border-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <Button onClick={handleSave} className="w-full">
          Save API Key
        </Button>
        {savedKey && (
          <div className="mt-4">
            <p className="text-sm text-white">Current API Key: {savedKey.slice(0, 10)}...</p>
            <Button onClick={handleClear} variant="outline" className="w-full mt-2">
              Clear API Key
            </Button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}