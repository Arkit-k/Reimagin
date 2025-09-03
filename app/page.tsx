'use client';
import { useState, useEffect } from 'react';
import { HeroHeader } from "@/components/landing/header/page";
import { HeroVideoDialogcompo } from "@/components/landing/hero/herovideo";
import HeroSection from "@/components/landing/hero/page";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    // Check if this is a redirect from within the site
    const isRedirect = document.referrer && document.referrer.includes(window.location.hostname);

    if (isRedirect) {
      setShowLoading(false);
    }

    setInitialCheckDone(true);

    // Check for mobile
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const checkMobile = (e: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setLoaded(true);
    };
    checkMobile(mediaQuery);
    mediaQuery.addEventListener('change', checkMobile);
    return () => mediaQuery.removeEventListener('change', checkMobile);
  }, []);

  const handleVideoEnd = () => {
    setShowLoading(false);
  };

  const handleSkipLoading = () => {
    setShowLoading(false);
  };

  if (showLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <video
          key={loaded ? (isMobile ? 'mobile' : 'desktop') : 'loading'}
          autoPlay
          muted
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={loaded ? (isMobile ? "/backgrounds/loadingmobile.mp4" : "/backgrounds/loadingbg.mp4") : "/backgrounds/loadingbg.mp4"} type="video/mp4" />
        </video>
        {loaded && (
          <button
            onClick={handleSkipLoading}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white px-4 py-2 rounded hover:bg-black/70 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <main className='bg-transparent'>
        <HeroSection/>
        <div className="m-15 top-10">
        <HeroVideoDialogcompo/>
        </div>
      </main>
    </div>
  );
}
