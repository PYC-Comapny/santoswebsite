'use client';

import React from 'react';
import NextImage from 'next/image';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function SingleTestimonial() {
  const containerRef = useScrollAnimation();

  return (
    <section ref={containerRef} className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content first on mobile, second on desktop */}
            <div className="flex flex-col animate-on-scroll stagger-1 lg:order-2">
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-starYellow text-starYellow" />
                ))}
              </div>

              <div className="relative mb-8">
                <Quote className="absolute -top-8 -left-8 w-16 h-16 text-slate-200 -z-10 opacity-50" />
                <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-800 leading-relaxed">
                  "We had EJ’s redo our chimney cap, replace the entire roof, reseal a large window and properly reinstall some siding. The company is top notch. They were wonderful to work with from start to finish. The entire crew is extremely hard working. Overall, great people who work really hard and provide excellent workmanship. We highly recommend EJ’s."
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-slate-200 pt-8">
                <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white text-xl font-bold">
                  G
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Teya G</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">5 reviews · 1 photo</span>
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-extrabold text-[10px]">G</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image second on mobile, first on desktop */}
            <div className="relative aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl animate-on-scroll lg:order-1">
              <NextImage 
                src="/5.jpg" 
                alt="Happy Customer" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
