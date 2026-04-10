'use client';

import React from 'react';
import NextImage from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Hammer, Search, Flame, Sun, Wind, Home, Layout, ArrowDownToLine, Leaf, Droplets, CheckCircle2, Star, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadFormModal from './LeadFormModal';

const iconMap: Record<string, any> = {
    Hammer,
    Search,
    Flame,
    Sun,
    Wind,
    Home,
    Layout,
    ArrowDownToLine,
    Leaf,
    Droplets,
    Activity
};

interface ServiceHeroProps {
    slug: string;
    title: string;
    headline: string;
    subheadline: string;
    badge: string;
    features: {
        name: string;
        outcome: string;
        mechanism: string;
        iconName: string;
    }[];
    inferredGoal?: string;
}

export default function ServiceHero({ 
    slug, 
    title, 
    headline, 
    subheadline, 
    badge, 
    features,
    inferredGoal
}: ServiceHeroProps) {
    const containerRef = useScrollAnimation();

    return (
        <section ref={containerRef} className="relative min-h-[80vh] flex items-center pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <NextImage 
                    src="/hero backgorund.jpg" 
                    alt={`${title} Hero Background`} 
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
            </div>

            {/* Subtle Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-premiumAccent/5 blur-[80px] md:blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-trustBlue/5 blur-[80px] md:blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center max-w-5xl mx-auto text-center">
                    
                    {/* 1. Headline & Badge */}
                    <div className="flex flex-col items-center animate-on-scroll">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-premiumAccent/20 border border-premiumAccent/30 backdrop-blur-md"
                        >
                            <Shield className="w-4 h-4 text-premiumAccent" />
                            <span className="text-xs font-black uppercase tracking-widest text-premiumAccent">
                                {badge}
                            </span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 lg:mb-10 tracking-tighter text-white uppercase">
                            {headline}
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-200 font-medium mb-10 max-w-3xl leading-snug animate-on-scroll stagger-1">
                            {subheadline}
                        </p>
                    </div>

                    {/* 2. Dynamic Features Row - 4 columns on all screens */}
                    <div className="grid grid-cols-4 gap-2 md:gap-8 mb-12 w-full animate-on-scroll stagger-2 max-w-5xl">
                        {features.slice(0, 4).map((feature, idx) => {
                            const Icon = iconMap[feature.iconName] || CheckCircle2;
                            return (
                                <div key={idx} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center group bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-5 rounded-xl md:rounded-[2rem] hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-premiumAccent/10">
                                    <div className="w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-white/10 shrink-0">
                                        <Icon className="w-4 h-4 md:w-7 md:h-7" />
                                    </div>
                                    <span className="font-black text-[8px] md:text-sm uppercase tracking-wider text-white text-center md:text-left leading-tight">
                                        {feature.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* 3. CTA Section */}
                    <div className="flex flex-col items-center w-full animate-on-scroll stagger-3">
                        <LeadFormModal location={`${title} Hero`} inferredGoal={inferredGoal}>
                            <div className="relative cursor-pointer">
                                {/* IT'S FREE Bubble */}
                                <div className="absolute -top-4 -right-4 z-20 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg transform rotate-12 animate-pulse border-2 border-white pointer-events-none whitespace-nowrap">
                                    FREE SCHEDULING
                                </div>
                                <Button
                                    size="lg"
                                    className="h-16 md:h-20 px-12 md:px-16 rounded-2xl bg-premiumAccent hover:bg-premiumAccent/90 text-white font-black text-base md:text-lg uppercase tracking-widest shadow-xl shadow-premiumAccent/20 group w-full sm:w-auto transform hover:scale-105 transition-all duration-300 flex items-center gap-4"
                                >
                                    GET STARTED
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </LeadFormModal>

                        {/* Trust Indicator Line */}
                        <div className="mt-8 flex items-center gap-3 justify-center">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-premiumAccent text-premiumAccent" />
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                                <span className="text-white">5 Star Rating • </span>Erie&apos;s Preferred Choice
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
