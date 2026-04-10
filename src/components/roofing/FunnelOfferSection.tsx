'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import LeadFormModal from './LeadFormModal';
import { Button } from '@/components/ui/button';

export default function FunnelOfferSection() {
  const containerRef = useScrollAnimation();

  return (
    <section id="offer" ref={containerRef} className="relative bg-white pt-2 pb-8 md:pt-4 md:pb-12 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="flex flex-col items-center text-center">
          


          {/* 2. Russell Brunson Style Offer Layout */}
          <div className="w-full max-w-4xl mx-auto border-[6px] md:border-[16px] border-slate-100 p-6 md:p-14 bg-slate-50 relative animate-on-scroll">
            {/* Header Tagline */}
            <h3 className="text-lg md:text-2xl font-black uppercase text-slate-800 tracking-wider mb-2">
              For A Limited Time Only
            </h3>
            
            {/* Main Headline */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-4 tracking-tighter capitalize">
              The 22-Point Roof Audit
            </h2>
            
            {/* Sub-Headline / Value */}
            <h3 className="text-xl md:text-4xl font-bold text-premiumAccent mb-6 md:mb-8">
              (<span className="line-through decoration-red-600 decoration-4 text-slate-500">$297</span> - <span className="text-emerald-500">FREE</span>)
            </h3>

            <div className="flex justify-center mt-4 md:mt-6">
              <LeadFormModal location="Offer Section" showGoal={false}>
                <Button
                  size="lg"
                  className="h-16 md:h-20 px-8 md:px-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-base md:text-2xl uppercase tracking-widest md:tracking-[0.2em] shadow-2xl shadow-emerald-500/20 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  Get Scheduled
                </Button>
              </LeadFormModal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
