'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, 
    Target, 
    Zap, 
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
    Activity,
    ArrowRight,
    BookOpen,
    Undo2,
    LucideIcon
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, LucideIcon> = {
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

import LeadFormModal from './LeadFormModal';

interface Feature {
    name: string;
    outcome: string;
    mechanism: string;
    iconName: string;
}

interface ServiceFeaturesProps {
    features: Feature[];
    inferredGoal?: string;
    showNav?: boolean;
    compact?: boolean;
    showCTA?: boolean;
}

interface FeatureCTAProps {
    featureName: string;
    inferredGoal?: string;
}

function FeatureCTA({ featureName, inferredGoal }: FeatureCTAProps) {
    const [isHighlighted, setIsHighlighted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsHighlighted(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-8 flex justify-center">
            <LeadFormModal location={`Service Solutions - ${featureName}`} inferredGoal={inferredGoal}>
                <button
                    className="px-8 py-4 rounded-2xl bg-premiumAccent hover:bg-amber-600 text-white shadow-xl shadow-premiumAccent/20 transition-all duration-300 flex items-center gap-3 group/mini-cta text-xs font-black uppercase tracking-widest"
                >
                    THIS IS THE PROBLEM
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/mini-cta:translate-x-1" />
                </button>
            </LeadFormModal>
        </div>
    );
}

export default function ServiceFeatures({ features, inferredGoal, showNav = true, compact = false, showCTA = true }: ServiceFeaturesProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="services" className={`relative bg-white overflow-hidden ${compact ? 'py-6 md:py-10' : 'py-10 md:py-20'}`}>
            {/* Geometric Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-[-12deg] translate-x-24 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 gap-4">
                        {features.map((feature, i) => {
                            const IconComponent = iconMap[feature.iconName] || Hammer;
                            
                            return (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group overflow-hidden rounded-[2rem] border transition-all duration-500 ${
                                        openIndex === i 
                                        ? 'bg-white border-premiumAccent/30 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] scale-[1.01]' 
                                        : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 hover:bg-white'
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                        className="w-full flex items-center justify-between p-6 md:p-10 text-left outline-none"
                                    >
                                        <div className="flex items-center gap-4 md:gap-8">
                                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                                openIndex === i ? 'bg-premiumAccent text-white rotate-[10deg] scale-110 shadow-lg shadow-premiumAccent/30' : 'bg-slate-900 text-white group-hover:bg-slate-800'
                                            }`}>
                                                <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                                            </div>
                                            <div>
                                                <h3 className={`text-xl md:text-3xl font-black uppercase tracking-tighter transition-colors duration-300 ${
                                                    openIndex === i ? 'text-slate-900' : 'text-slate-600'
                                                }`}>
                                                    {feature.name}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className={`w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-500 ${
                                            openIndex === i ? 'bg-premiumAccent border-premiumAccent text-white rotate-180' : 'bg-white text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600'
                                        }`}>
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                            >
                                                <div className="px-8 md:px-10 pb-12 pt-0">
                                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-12" />
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                                                        <div className="relative p-8 rounded-3xl bg-emerald-50/50 border border-emerald-100/50 overflow-hidden group/card">
                                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:scale-110 transition-transform duration-500">
                                                                <Target className="w-16 h-16 text-emerald-600" />
                                                            </div>
                                                            <div className="flex items-center gap-3 mb-6">
                                                                 <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                                                                    <Target className="w-4 h-4 text-white" />
                                                                </div>
                                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">The Outcome</span>
                                                            </div>
                                                            <p className="text-xl font-bold text-slate-900 leading-tight">
                                                                {feature.outcome}
                                                            </p>
                                                        </div>

                                                        <div className="relative p-8 rounded-3xl bg-slate-50 border border-slate-200/50 overflow-hidden group/card">
                                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:scale-110 transition-transform duration-500">
                                                                <IconComponent className="w-16 h-16 text-slate-900" />
                                                            </div>
                                                            <div className="flex items-center gap-3 mb-6">
                                                                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                                                                    <Zap className="w-4 h-4 text-white" />
                                                                </div>
                                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">The Process</span>
                                                            </div>
                                                            <p className="text-lg font-medium text-slate-600 leading-relaxed">
                                                                {feature.mechanism}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {showCTA && (
                                                        <FeatureCTA 
                                                            featureName={feature.name} 
                                                            inferredGoal={inferredGoal} 
                                                        />
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {showNav && (
                        <div className="mt-20 flex flex-col md:flex-row items-center gap-6 pt-12 border-t border-slate-100 w-full justify-center">
                            <Link 
                                href="/blogs" 
                                className="group/nav flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-premiumAccent/20 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 transition-transform group-hover/nav:-rotate-6">
                                    < BookOpen className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Learn about your roof</p>
                                </div>
                            </Link>

                            <div className="hidden md:block w-px h-12 bg-slate-100" />

                            <Link 
                                href="/#services" 
                                className="group/nav flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-premiumAccent/20 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-900/10 flex items-center justify-center text-slate-900 transition-transform group-hover/nav:rotate-6">
                                    <Undo2 className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Go Back To Service Hub</p>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

