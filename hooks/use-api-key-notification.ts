'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useApiKeyNotification() {
  const [messageCount, setMessageCount] = useState(0);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [notificationId, setNotificationId] = useState<string | number | null>(null);

  // Check for API key on mount and when localStorage changes
  useEffect(() => {
    const checkApiKey = () => {
      const apiKey = localStorage.getItem('geminiApiKey');
      const hasKey = !!apiKey;
      setHasApiKey(hasKey);

      // If API key is set, dismiss the notification
      if (hasKey && notificationId) {
        toast.dismiss(notificationId);
        setNotificationId(null);
      }
    };

    // Check immediately
    checkApiKey();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'geminiApiKey') {
        checkApiKey();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case localStorage is modified in same tab
    const interval = setInterval(checkApiKey, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [notificationId]);

  // Load message count from localStorage on mount
  useEffect(() => {
    const storedCount = localStorage.getItem('userMessageCount');
    if (storedCount) {
      setMessageCount(parseInt(storedCount, 10));
    }
  }, []);

  // Show notification when limit reached and no API key
  useEffect(() => {
    if (messageCount >= 5 && !hasApiKey && !notificationId) {
      const id = toast.error('Message limit reached! Please set your Google Gemini API key to continue.', {
        duration: Infinity,
        action: {
          label: 'Set API Key',
          onClick: () => {
            window.location.href = '/setkey';
          },
        },
      });
      setNotificationId(id);
    }
  }, [messageCount, hasApiKey, notificationId]);

  // Increment message count
  const incrementMessageCount = () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    localStorage.setItem('userMessageCount', newCount.toString());
  };

  // Reset message count (for testing or when API key is set)
  const resetMessageCount = () => {
    setMessageCount(0);
    localStorage.setItem('userMessageCount', '0');
  };

  return {
    messageCount,
    hasApiKey,
    incrementMessageCount,
    resetMessageCount,
  };
}