'use client';

import React from 'react';
import { Shield, AlertTriangle, CheckCircle2, Users, HardHat, FileText, UserCheck, Sparkles, XCircle, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import WavyDivider from './WavyDivider';

import LeadFormModal from './LeadFormModal';
import { Button } from '@/components/ui/button';

export default function TrustComparison() {
    const containerRef = useScrollAnimation();

    const comparisons = [
        {
            title: "The Crew Structure",
            icon: Users,
            bigCo: "Random subcontractors who rotate daily. Impossible to keep track.",
            ejLocal: "Same 100% focused crew from start to finish."
        },
        {
            title: "Material Transparency",
            icon: FileText,
            bigCo: "Hidden wood rot fees and \"unforeseen damages\" during middle of job.",
            ejLocal: "Itemized lumber pricing. We treat your home like our own, not a line item."
        },
        {
            title: "Owner Accessibility",
            icon: UserCheck,
            bigCo: "You'll never talk to the person whose name is on the license.",
            ejLocal: "You talk to EJ, the owner."
        },
        {
            title: "Final Cleanup",
            icon: HardHat,
            bigCo: "Rushed sites leave behind dangerous hazards for children and pets.",
            ejLocal: "We treat your home like it's one of ours."
        }
    ];

    return (
        <section ref={containerRef} className="pt-32 pb-32 md:pt-48 md:pb-48 bg-premiumAccent relative overflow-hidden">
            {/* Wavy Dividers */}
            <WavyDivider position="top" color="white" />

            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24 animate-on-scroll">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-slate-900/10 border border-slate-900/10">
                        <Shield className="w-4 h-4 text-slate-900" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Consumer Protection</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-slate-900 leading-[1.1]">
                        Why <span className="text-white drop-shadow-sm">Choose EJ</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-stretch max-w-6xl mx-auto">
                    {/* Big Companies Side */}
                    <div className="bg-white/40 backdrop-blur-md rounded-[3rem] p-8 md:p-14 relative overflow-hidden animate-on-scroll border border-white/40 shadow-xl">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.05] rotate-12 pointer-events-none">
                            <AlertTriangle className="w-48 h-48 md:w-64 md:h-64 text-slate-900" />
                        </div>
                        
                        <div className="flex items-center gap-5 mb-10 md:mb-14">
                            <div className="w-14 h-14 rounded-2xl bg-white/50 flex items-center justify-center text-slate-600 shadow-inner">
                                <XCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-1">Competitors</span>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-700">Nationwide Crews</h3>
                            </div>
                        </div>

                        <div className="space-y-10 md:space-y-12">
                            {comparisons.map((item, idx) => (
                                <div key={idx} className="group mr-2">
                                    <div className="flex items-start gap-5 md:gap-6">
                                        <div className="mt-1 p-2 rounded-xl bg-white/50 border border-white/20 group-hover:bg-white transition-colors shadow-sm">
                                            <item.icon className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[10px] md:text-[11px] uppercase tracking-widest text-slate-600 mb-2">{item.title}</h4>
                                            <p className="text-slate-700 font-bold leading-relaxed text-base md:text-lg">{item.bigCo}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EJ's Local Roofing Side */}
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-14 border-4 border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden animate-on-scroll stagger-1">
                        {/* Premium Glow Effect */}
                        <div className="absolute -top-24 -right-24 w-80 h-80 bg-premiumAccent/30 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 pointer-events-none">
                            <Shield className="w-48 h-48 md:w-64 md:h-64 text-premiumAccent" />
                        </div>
                        
                        <div className="flex items-center gap-5 mb-10 md:mb-14 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-premiumAccent flex items-center justify-center text-white shadow-[0_0_30px_rgba(200,179,138,0.5)]">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div>
                                <span className="text-[10px] font-black text-premiumAccent uppercase tracking-widest block mb-1">Preferred Choice</span>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">EJ's Local Roofing</h3>
                            </div>
                        </div>

                        <div className="space-y-10 md:space-y-12 relative z-10">
                            {comparisons.map((item, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex items-start gap-5 md:gap-6">
                                        <div className="mt-1 p-2 rounded-xl bg-white/10 border border-white/10 group-hover:bg-white/20 transition-colors">
                                            <item.icon className="w-5 h-5 text-premiumAccent" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-[10px] md:text-[11px] uppercase tracking-widest text-premiumAccent mb-2">{item.title}</h4>
                                            <p className="text-white font-black leading-relaxed text-base md:text-lg">{item.ejLocal}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 md:mt-16 pt-10 border-t border-white/10 flex flex-col items-center justify-center gap-6 relative z-10">
                            <div className="flex items-center gap-3 text-center">
                                <Sparkles className="w-5 h-5 text-starYellow fill-starYellow" />
                                <span className="text-white font-black uppercase tracking-widest text-xs">The Gold Standard In Erie</span>
                            </div>

                            <LeadFormModal location="Trust Comparison">
                                <Button className="h-14 px-10 rounded-2xl bg-premiumAccent hover:bg-premiumAccent/90 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-premiumAccent/20 transition-all duration-300 transform hover:scale-105 active:scale-95">
                                    Get Your Free Inspection <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </LeadFormModal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
