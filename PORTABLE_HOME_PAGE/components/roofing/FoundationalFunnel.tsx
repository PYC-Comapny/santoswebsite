'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
    ClipboardCheck,
    Search,
    Wrench,
    ShieldCheck,
    LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
    Search,
    ClipboardCheck,
    Wrench,
    ShieldCheck
};

const defaultSteps = [
    {
        id: 1,
        title: 'Initial Assessment',
        description: 'We evaluate your roof\'s condition and identify underlying issues.',
        iconName: 'Search',
    },
    {
        id: 2,
        title: 'Detailed Proposal',
        description: 'You receive a transparent, itemized scope of work with no hidden fees.',
        iconName: 'ClipboardCheck',
    },
    {
        id: 3,
        title: 'Precision Execution',
        description: 'Our certified crews implement the solution using premium materials.',
        iconName: 'Wrench',
    },
    {
        id: 4,
        title: 'Final Protection',
        description: 'Your home is secured with our industry-leading lifetime warranty.',
        iconName: 'ShieldCheck',
    },
];

interface FoundationalFunnelProps {
    title?: string;
    description?: string;
    steps?: any[];
}

export default function FoundationalFunnel({ 
    title = 'How We Protect Your Home', 
    description = 'A systematic, transparent approach to ensuring your roof performs flawlessly for decades.',
    steps = defaultSteps 
}: FoundationalFunnelProps) {
    const containerRef = useScrollAnimation();

    return (
        <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16 animate-on-scroll">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Visual Anchor */}
                    <div className="order-2 lg:order-1 relative animate-on-scroll">
                        <div className="w-full aspect-square rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col items-center justify-center relative overflow-hidden">
                            {/* Decorative Subtle Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-premiumAccent/5 blur-[80px] rounded-full" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200/50 blur-[80px] rounded-full" />

                            {/* Funnel/Stack Visual Elements */}
                            <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-xs">
                                {/* Level 1 */}
                                <div className="w-full h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center translate-y-2 relative z-40">
                                    <div className="w-1/2 h-2 bg-slate-100 rounded-full" />
                                </div>
                                {/* Level 2 */}
                                <div className="w-[85%] h-16 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center translate-y-1 relative z-30">
                                    <div className="w-1/2 h-2 bg-slate-100 rounded-full" />
                                </div>
                                {/* Level 3 */}
                                <div className="w-[70%] h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center relative z-20">
                                    <div className="w-1/2 h-2 bg-slate-100 rounded-full" />
                                </div>
                                {/* Level 4 (Outcome) */}
                                <div className="w-[55%] h-16 bg-premiumAccent/10 rounded-2xl shadow-xl border border-premiumAccent/20 flex items-center justify-center relative z-10 mt-2">
                                    <ShieldCheck className="w-6 h-6 text-premiumAccent" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Text Stack */}
                    <div className="order-1 lg:order-2 relative py-4">
                        {/* Vertical Connector Line (hidden on very small screens, aligns with icons) */}
                        <div className="absolute left-6 lg:left-8 top-12 bottom-12 w-px bg-slate-200 hidden sm:block z-0" />

                        <div className="space-y-6 relative z-10">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isLast = index === steps.length - 1;

                                return (
                                    <div
                                        key={step.id}
                                        className={`
                      relative group flex gap-6 p-4 rounded-2xl transition-all duration-300
                      hover:-translate-y-1 hover:shadow-md hover:bg-white border border-transparent hover:border-slate-100
                      animate-on-scroll stagger-${index + 1}
                      ${isLast ? 'bg-slate-50/80 hover:bg-white' : 'bg-transparent'}
                    `}
                                    >
                                        {/* Icon / Step Marker */}
                                        <div className="relative shrink-0">
                                            <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shadow-sm relative z-10 bg-white border border-slate-100
                        ${isLast ? 'ring-2 ring-premiumAccent/20' : ''}
                      `}>
                                                {(() => {
                                                    const Icon = ICON_MAP[step.iconName] || Search;
                                                    return <Icon className={`w-5 h-5 ${isLast ? 'text-premiumAccent' : 'text-slate-600 group-hover:text-premiumAccent transition-colors'}`} />;
                                                })()}
                                            </div>
                                            {/* Step Number Badge */}
                                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold z-20">
                                                {step.id}
                                            </div>
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex-1 pt-1">
                                            <h3 className={`text-xl font-bold mb-1 tracking-tight ${isLast ? 'text-slate-900' : 'text-slate-800'}`}>
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
