'use client';

import React, { useState, useRef, useEffect } from 'react';
import NextImage from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Shield, Clock, Star, Play, X, Volume2, VolumeX } from 'lucide-react';

import LeadFormModal from './LeadFormModal';

export default function HeroSection() {
  const containerRef = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Optimized: We only start the video once user interacts
  const toggleFullPlay = () => {
    if (!videoLoaded) {
      setVideoLoaded(true);
    }

    // If currently playing full, stop it. Otherwise, start it.
    if (isPlayingFull) {
      setIsPlayingFull(false);
      setIsMuted(true); // Mute when stopping full play
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true;
      }
    } else {
      setIsPlayingFull(true);
      setIsMuted(false); // Unmute when starting full play
      if (videoRef.current) {
        videoRef.current.currentTime = 0; // Start from beginning
        videoRef.current.muted = false;
        videoRef.current.play().catch(err => console.error("Video play failed:", err));
      }
    }
  };

  useEffect(() => {
    // This effect handles playing the video when it's loaded and meant to be playing full screen
    if (videoLoaded && isPlayingFull && videoRef.current) {
      videoRef.current.muted = false; // Ensure it's unmuted when playing full
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    } else if (videoRef.current && !isPlayingFull) {
      // If not playing full, pause and reset
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
  }, [videoLoaded, isPlayingFull]);


  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <NextImage 
          src="/image 2.png" 
          alt="Roofing Hero Background" 
          fill
          priority
          className="object-cover scale-x-[-1]"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      {/* Subtle Background Elements - Clean SaaS Style */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-premiumAccent/5 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-trustBlue/5 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* 1. Headline & Shield */}
          <div className="flex flex-col items-center text-center animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#8CC63F]/20 border border-[#8CC63F]/30 backdrop-blur-md">
              <Shield className="w-4 h-4 text-[#8CC63F]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#8CC63F]">
                LICENSE: CCC1336136
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 lg:mb-10 tracking-tighter text-white uppercase">
              TAMPA&apos;S #1 ROOFER
            </h1>
          </div>


          {/* 3. CTA & Features */}
          <div className="flex flex-col items-center text-center">
            <p className="text-xl md:text-2xl text-slate-200 font-medium mb-10 max-w-2xl leading-snug animate-on-scroll stagger-1">
              A roofer you can trust
            </p>


            {/* Features row - 4 columns on all screens */}
            <div className="grid grid-cols-4 gap-2 md:gap-6 mb-12 justify-center animate-on-scroll stagger-2 w-full max-w-6xl px-4">
              {[
                { label: 'Free Estimate', icon: CheckCircle2 },
                { label: 'Licensed Pro', icon: CheckCircle2 },
                { label: 'Certified', icon: CheckCircle2 },
                { label: 'Warranty', icon: CheckCircle2 }
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-2 md:gap-3 group bg-white/10 backdrop-blur-md border border-white/20 p-2 md:px-5 md:py-4 rounded-xl md:rounded-2xl hover:bg-white/20 transition-all duration-500 hover:scale-105 flex-1 shadow-sm">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center text-[#8CC63F] group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-inner shrink-0">
                    <feature.icon className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <span className="font-black text-[7px] md:text-xs uppercase tracking-wider text-white text-center md:text-left leading-tight">{feature.label}</span>
                </div>
              ))}
            </div>


            <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-10 animate-on-scroll stagger-3 justify-center w-full sm:w-auto mt-4 lg:mt-0">
              <LeadFormModal location="Hero Section">
                <div className="relative cursor-pointer">
                  {/* IT'S FREE Bubble */}
                  <div className="absolute -top-4 -right-4 z-20 bg-secondary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg transform rotate-12 animate-pulse border-2 border-white pointer-events-none whitespace-nowrap">
                    FREE SCHEDULING
                  </div>
                  <Button
                    size="lg"
                    className="h-16 px-12 rounded-2xl bg-[#8CC63F] hover:bg-[#8CC63F]/90 text-white font-black text-base uppercase tracking-widest shadow-xl shadow-[#8CC63F]/20 group w-full sm:w-auto transform hover:scale-105 transition-all duration-300"
                  >
                    GET STARTED
                  </Button>
                </div>
              </LeadFormModal>
            </div>



            {/* Trust Indicator Line */}
            <div className="flex items-center gap-3 justify-center animate-on-scroll stagger-5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#8CC63F] text-[#8CC63F]" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                <span className="text-white">5 Star Rating • </span>200+ Roofs Saved
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
