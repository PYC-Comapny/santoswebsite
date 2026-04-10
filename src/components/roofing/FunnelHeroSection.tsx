'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Shield, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadFormModal from './LeadFormModal';
import Image from 'next/image';

export default function FunnelHeroSection() {
  const containerRef = useScrollAnimation();

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex flex-col justify-center py-12 md:py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
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
 
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="flex flex-col items-center text-center">
          
          <div className="flex items-center gap-3 mb-6 animate-on-scroll">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-premiumAccent shadow-xl shadow-premiumAccent/10 bg-white">
              <Image 
                src="/logo.png" 
                alt="Santo's Roofing Logo"
                fill
                priority
                className="object-contain p-1"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-premiumAccent/20 border border-premiumAccent/30 backdrop-blur-md">
              <Shield className="w-4 h-4 text-premiumAccent" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-premiumAccent">
                LICENSE: CCC1336136
              </span>
            </div>
          </div>
 
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-[26px] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 md:mb-10 tracking-tighter text-white animate-on-scroll uppercase text-center">
              Worried About Roof Damages <br className="sm:hidden" /> You Don&apos;t See?
            </h1>
 
            <div className="mb-8 md:mb-14 animate-on-scroll stagger-1 text-center flex justify-center w-full">
              <p className="text-[11px] sm:text-lg md:text-3xl lg:text-4xl font-black text-white uppercase mb-3 px-4 leading-tight whitespace-nowrap text-center">
                Get a <span className="text-premiumAccent">trusted local roofer</span> like FIX ROOFING
              </p>
            </div>
 
            <div className="flex justify-center mb-10 md:mb-20 animate-on-scroll stagger-2">
              <LeadFormModal location="Funnel Hero" showGoal={false}>
                <Button 
                  size="lg"
                  className="h-14 md:h-18 px-10 md:px-20 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg md:text-2xl uppercase tracking-widest md:tracking-[0.2em] shadow-2xl shadow-secondary/20 transition-all duration-300 transform hover:scale-105"
                >
                  Get Free Inspection
                </Button>
              </LeadFormModal>
            </div>
          </div>
 
          {/* Features Row - 4 columns on all screens */}
          <div className="grid grid-cols-4 gap-2 md:gap-10 mb-6 md:mb-10 justify-center animate-on-scroll stagger-2 w-full max-w-4xl mx-auto px-1">
            {[
              { label: 'Free-Est', icon: CheckCircle2 },
              { label: 'Licensed', icon: CheckCircle2 },
              { label: 'Certified', image: '/master-elite.webp' },
              { label: 'Warranty', icon: CheckCircle2 }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-1 md:gap-3 group bg-white/10 backdrop-blur-md p-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105 flex-1 shadow-sm">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-inner shrink-0">
                  {feature.image ? (
                    <div className="relative w-5 h-5 md:w-10 md:h-10">
                      <Image 
                        src={feature.image} 
                        alt={feature.label}
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                  ) : feature.icon ? (
                    <feature.icon className="w-4 h-4 md:w-6 md:h-6" />
                  ) : null}
                </div>
                <span className="font-black text-[7px] md:text-[11px] uppercase tracking-widest text-white text-center md:text-left leading-tight">{feature.label}</span>
              </div>
            ))}
          </div>
 
        </div>
      </div>
    </section>
  );
}
