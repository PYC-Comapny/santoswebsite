'use client';

import { ClipboardList, CalendarCheck, Hammer, ArrowDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import WavyDivider from './WavyDivider';
import LeadFormModal from './LeadFormModal';

interface TrustBadgesProps {
  pageName?: string;
  isHome?: boolean;
}

export default function TrustBadges({ pageName = 'Our', isHome = false }: TrustBadgesProps) {
  const containerRef = useScrollAnimation();

  const badges = [
    {
      icon: ClipboardList,
      title: isHome ? 'Pick your problem' : 'Fill out the form',
      description: isHome ? 'Choose here' : 'Takes 1 Minute',
      number: '01',
    },
    {
      icon: CalendarCheck,
      title: 'Schedule an appointment',
      description: 'Pick a time we can stop by',
      number: '02',
    },
    {
      icon: Hammer,
      title: 'Fix the Problem',
      description: 'We agree and handle the rest',
      number: '03',
    },
  ];

  return (
    <section id="three-step-process" ref={containerRef} className="pt-4 pb-32 md:pt-8 md:pb-48 bg-premiumAccent relative overflow-hidden">
      {/* Background Lighting Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 blur-3xl rounded-full pointer-events-none" />

      {/* Wavy Divider at bottom to transition back to white */}
      <WavyDivider position="bottom" color="white" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll flex flex-col items-center">
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase max-w-3xl mx-auto mb-4">
            3 Step Process
          </h2>
          <div className="w-24 h-1 bg-slate-900/20 rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-10 md:top-16 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-slate-900/10 to-transparent z-0" />

          <div className="grid grid-cols-3 gap-2 md:gap-12 relative z-10">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white/40 backdrop-blur-xl p-3 sm:p-4 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white hover:border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-out animate-on-scroll stagger-${index + 1}`}
                >
                  {/* Subtle Accent Glow inside the card */}
                  <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-b from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Decorative Background Number */}
                  <div className="absolute top-2 right-2 md:top-4 md:right-8 text-2xl md:text-6xl font-black text-slate-900/5 group-hover:scale-[1.10] group-hover:text-slate-900/10 group-hover:-translate-y-1 transition-all duration-700 pointer-events-none select-none">
                    {badge.number}
                  </div>

                  <div className="relative z-20 flex flex-col items-center text-center mt-1">
                    <div className="relative mb-3 md:mb-8">
                      {/* Icon Ambient Glow on Hover */}
                      <div className="absolute inset-0 bg-white/30 blur-md md:blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-125" />

                      {/* Icon Container */}
                      <div className="relative flex items-center justify-center w-10 h-10 md:w-20 md:h-20 bg-white border border-white/20 rounded-xl md:rounded-[2rem] group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:-translate-y-2 transition-all duration-700 shadow-lg group-hover:shadow-2xl rotate-0 group-hover:-rotate-6">
                        <Icon className="w-5 h-5 md:w-10 md:h-10 text-slate-900 group-hover:text-white transition-colors duration-500 rotate-0 group-hover:rotate-6" />
                      </div>
                    </div>

                    <h3 className="text-[10px] sm:text-[11px] md:text-2xl font-black text-slate-900 mb-1 md:mb-3 tracking-tight leading-tight uppercase">{badge.title}</h3>
                    <p className="text-slate-700 text-[8px] sm:text-[10px] md:text-base font-bold leading-tight md:leading-relaxed max-w-[200px] mb-1 md:mb-6 uppercase tracking-wider">{badge.description}</p>
                    
                    {index === 0 && (
                      <>
                        {isHome ? (
                          <div 
                            className="flex flex-col items-center gap-0 group/cta cursor-pointer mt-1 md:mt-4" 
                            onClick={(e) => {
                              e.stopPropagation();
                              const element = document.getElementById('services');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }}
                          >
                            <span className="text-[8px] sm:text-[9px] md:text-xs font-black text-slate-900 uppercase tracking-widest group-hover/cta:text-white transition-colors">
                              Pick problem
                            </span>
                            <div className="relative mt-2">
                              <div className="absolute inset-0 bg-red-500/20 blur-sm md:blur-lg rounded-full animate-pulse scale-150" />
                              <ArrowDown className="w-5 h-5 md:w-10 md:h-10 text-red-600 relative z-10 animate-bounce stroke-[4px]" />
                            </div>
                          </div>
                        ) : (
                          <LeadFormModal location="3 Step Process - Step 1" inferredGoal="Fill Form">
                            <div className="flex flex-col items-center gap-0 group/cta cursor-pointer mt-1 md:mt-4">
                              <span className="text-[8px] sm:text-[9px] md:text-xs font-black text-slate-900 uppercase tracking-widest group-hover/cta:text-white transition-colors">
                                Fill Form
                              </span>
                              <div className="relative mt-2">
                                <div className="absolute inset-0 bg-red-500/20 blur-sm md:blur-lg rounded-full animate-pulse scale-150" />
                                <ArrowDown className="w-5 h-5 md:w-10 md:h-10 text-red-600 relative z-10 animate-bounce stroke-[4px]" />
                              </div>
                            </div>
                          </LeadFormModal>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </div>
    </section>
  );
}
