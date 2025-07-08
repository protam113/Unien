'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/helpers/utils';
import ParticleOverlay from '@/components/design/ParticleOverlay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib';
import AppData from '@/data/app.data.json';

export function HeroBanner() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleExploreClick = () => {
    // Scroll to the next section
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const scrollY = window.scrollY;
      const blurAmount = Math.min(scrollY / 100, 5); // max 10px blur
      heroRef.current.style.filter = `blur(${blurAmount}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden transition-all duration-300"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/img/boiler.jpg')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 dark:from-black/90 dark:via-black/60 dark:to-black/40"></div>
      </div>

      {/* Particle Overlay */}
      <ParticleOverlay />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20">
        <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8 ">
          <div className="animate-fadeIn space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight max-w-3xl leading-tight">
              <span>
                <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                UNIEN
              </span>
              <span className="block text-2xl md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-primary-foreground/80 dark:from-primary-foreground dark:to-primary-foreground/80 animate-gradient">
                {AppData.AppData.slogan}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              {AppData.AppData.intro}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">
              <Button
                size="lg"
                className={cn(
                  'group text-base rounded-none transition-all duration-300 ease-in-out ',
                  'hover:shadow-lg hover:scale-105 active:scale-95 bg-main hover:bg-main/80'
                )}
                onClick={() => router.push(ROUTES.CONTACT)}
              >
                Liên Hệ Ngay
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-background/10 backdrop-blur-sm border-white/20 text-white hover:bg-background/20 hover:text-white text-base rounded-none transition-all duration-300 ease-in-out hover:shadow-lg"
                onClick={() => router.push(ROUTES.SERVICE.ROOT)}
              >
                {/* button content */}
                Dịch Vụ
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <button
        onClick={handleExploreClick}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors"
        aria-label="Start Exploring"
      >
        <span className="text-sm font-medium">Start Exploring</span>
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </button>
    </div>
  );
}
