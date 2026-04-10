'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import NextImage from 'next/image';
import LeadFormModal from './LeadFormModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 border-b border-slate-200 shadow-sm backdrop-blur-[20px]">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group cursor-pointer">
          <div className="relative h-14 w-40 md:h-20 md:w-56 overflow-hidden">
            <NextImage 
              src="/logo.png" 
              alt="Fix Roofing LLC" 
              fill
              priority
              className="object-contain transition-transform group-hover:scale-105" 
              style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
            />
          </div>
        </Link>

        {/* The Menu Button is placed on the far right */}
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#8CC63F] text-white font-black text-xs hover:scale-105 hover:shadow-lg hover:shadow-[#8CC63F]/20 transition-all uppercase tracking-[0.2em] active:scale-95 shadow-md flex-row-reverse"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Menu</span>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-4 w-72 bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] p-6 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 ease-out z-50">
              <div className="flex flex-col gap-2">
                <LeadFormModal location="Header Dropdown - Blog">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-between px-5 py-4 text-[11px] font-black text-[#8CC63F] uppercase tracking-[0.2em] hover:bg-[#8CC63F]/5 rounded-2xl transition-all border border-[#8CC63F]/10 mb-4 text-center ring-1 ring-[#8CC63F]/20"
                  >
                    Learn About Your Roof
                  </button>
                </LeadFormModal>
                
                <div className="space-y-1">
                  <a 
                    href="#services" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-5 py-3.5 text-sm font-black text-slate-700 hover:text-[#8CC63F] hover:bg-slate-50 rounded-xl transition-all uppercase tracking-tight"
                  >
                    Our Services
                  </a>

                  <div className="px-5 py-5 bg-slate-50/50 rounded-2xl border border-slate-100 my-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block text-center">Service Areas</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Tampa', 'Brandon', 'Riverview', 'Wesley Chapel'].map((city) => (
                        <LeadFormModal key={city} location={`Header Dropdown - ${city}`}>
                          <button
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full px-3 py-2.5 text-[10px] font-bold text-slate-600 hover:text-[#8CC63F] hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 text-center shadow-sm"
                          >
                            {city}
                          </button>
                        </LeadFormModal>
                      ))}
                    </div>
                  </div>

                  <a 
                    href="#process" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-5 py-3.5 text-sm font-black text-slate-700 hover:text-[#8CC63F] hover:bg-slate-50 rounded-xl transition-all uppercase tracking-tight"
                  >
                    3 Step Process
                  </a>
                  <a 
                    href="#reviews" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-5 py-3.5 text-sm font-black text-slate-700 hover:text-[#8CC63F] hover:bg-slate-50 rounded-xl transition-all uppercase tracking-tight"
                  >
                    Success Stories
                  </a>
                  <LeadFormModal location="Header Dropdown - Contact">
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-left block px-5 py-3.5 text-sm font-black text-slate-700 hover:text-[#8CC63F] hover:bg-slate-50 rounded-xl transition-all uppercase tracking-tight"
                    >
                      Contact Us
                    </button>
                  </LeadFormModal>
                </div>

                {/* Call Now Option */}
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                       <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Immediate Response</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Need Immediate Help?</h4>
                  </div>
                  
                  <a 
                    href="tel:8137338521"
                    className="relative group block overflow-hidden rounded-2xl bg-[#8CC63F] p-[1px] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8CC63F] via-[#A8E05F] to-[#8CC63F] bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex flex-col items-center justify-center py-5 bg-[#8CC63F] rounded-[inherit]">
                      <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-1">Call Now</span>
                      <div className="flex items-center gap-2 text-white">
                        <Phone className="w-5 h-5 fill-white" />
                        <span className="text-2xl font-black tracking-tighter">(813) 733-8521</span>
                      </div>
                    </div>
                  </a>

                  <p className="text-center text-[9px] text-slate-400 font-bold mt-4 uppercase tracking-[0.2em]">
                    Certified Technicians On-Standby 24/7
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
