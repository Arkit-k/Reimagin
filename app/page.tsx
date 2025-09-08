'use client';
import { useState, useEffect } from 'react';


import HeroSection from "@/components/landing/hero/page";
import Image from 'next/image';
import Logo from '@/public/image/Logo.png'
import Features from '@/components/landing/feature/page'
import CallToAction from '@/components/landing/calltoaction/page'
import FooterSection from '@/components/landing/footer/page';

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [landingVisible, setLandingVisible] = useState(false);

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

  useEffect(() => {
    if (!showLoading) {
      const timer = setTimeout(() => setLandingVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setLandingVisible(false);
    }
  }, [showLoading]);

  const handleVideoEnd = () => {
    setShowLoading(false);
  };

  const handleSkipLoading = () => {
    setShowLoading(false);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration && video.currentTime >= video.duration - 5) {
      setShowWelcomeText(true);
    }
  };

  if (showLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          autoPlay
          muted
          onEnded={handleVideoEnd}
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={isMobile ? "/backgrounds/loadingmobile.mp4" : "/backgrounds/loadingbg.mp4"} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-1000 px-4 ${showWelcomeText ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center max-w-sm mx-auto">
            <h1 className="text-white md:text-stone-900 text-3xl sm:text-4xl md:text-6xl font-bold mb-2">
              welcome to <span className='text-primary'> Reimagine ai</span>
            </h1>
          </div>
        </div>
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
    <div className={`transition-opacity duration-1000 ${landingVisible ? 'opacity-100' : 'opacity-0'}`}>
      <main className='bg-stone-950'>
        <HeroSection/>
        <Features />
        <CallToAction/>
        <FooterSection/>
      </main>
    </div>
  );
}
