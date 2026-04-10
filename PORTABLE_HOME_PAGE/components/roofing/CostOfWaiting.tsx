'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle,
    XCircle,
    TrendingDown,
    ArrowRight,
    Activity,
    Circle,
    LucideIcon
} from 'lucide-react';

import Link from 'next/link';

const ICON_MAP: Record<string, LucideIcon> = {
    Activity,
    AlertTriangle,
    XCircle
};
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import { useInView } from 'react-intersection-observer';
import LeadFormModal from './LeadFormModal';
import { Button } from '@/components/ui/button';

const defaultData = [
    { name: 'Stage 1', decay: 500, color: '#F59E0B', label: 'Stable' },
    { name: 'Stage 2', decay: 3500, color: '#EF4444', label: 'Accelerating' },
    { name: 'Stage 3', decay: 20000, color: '#7F1D1D', label: 'Detrimental' },
];

const defaultStages = [
    {
        id: 1,
        title: "Stage 1",
        problem: "Temporarily stable",
        decayLabel: "Minor Leaks",
        decayValue: 500,
        impact: "Concerning",
        impactColor: "text-amber-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        iconName: 'Activity',
        description: "Surface level entry. While interior looks dry, moisture is already trapped in your insulation."
    },
    {
        id: 2,
        title: "Stage 2",
        problem: "Warning",
        decayLabel: "Hidden Mold & Wood Rot",
        decayValue: 3500,
        impact: "Accelerating",
        impactColor: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        iconName: 'AlertTriangle',
        description: "The 'Wood Rot Bomb'. Water has soaked into the deck, requiring full plywood replacement."
    },
    {
        id: 3,
        title: "Stage 3",
        problem: "Danger",
        decayLabel: "Structural Collapse",
        decayValue: 20000,
        impact: "Detrimental",
        impactColor: "text-red-900",
        bgColor: "bg-red-900/10",
        borderColor: "border-red-900/20",
        iconName: 'XCircle',
        description: "Interior damage + total roof system failure. Home value plummets and insurance claims are often denied for neglect."
    }
];

interface CostOfWaitingProps {
    data?: typeof defaultData;
    stages?: any[];
    title?: string;
    subtitle?: string;
    windowTitle?: string;
    showHeader?: boolean;
    showCTA?: boolean;
    prefix?: string;
    suffix?: string;
    ctaLink?: string;
    showLiabilityMatrix?: boolean;
    showCalculationsLive?: boolean;
    ctaColor?: string;
    hideMobileStages?: boolean;
    isHome?: boolean;
}

export default function CostOfWaiting({ 
    data = defaultData, 
    stages = defaultStages,
    title = "Waiting Won't Save You",
    subtitle = "“Don't Make Stage 1 Become Stage 3”",
    windowTitle = "Don't Make Stage 1 Become Stage 3",
    showHeader = true,
    showCTA = true,
    prefix = "$",
    suffix = "",
    ctaLink = "/22-point-roof-inspection",
    showLiabilityMatrix = true,
    showCalculationsLive = true,
    ctaColor = "bg-premiumAccent hover:bg-amber-600 shadow-premiumAccent/20",
    hideMobileStages = false,
    isHome = false
}: CostOfWaitingProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [displayDecay, setDisplayDecay] = useState(0);
    const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    // Animated Counter logic
    React.useEffect(() => {
        if (!inView) return;

        const target = activeIndex !== null ? data[activeIndex].decay : data[data.length - 1].decay;
        const duration = 3000; 
        const startTime = Date.now();
        const startValue = displayDecay;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            const easeOutCubic = (t: number) => (--t) * t * t + 1;
            const current = Math.floor(startValue + (target - startValue) * easeOutCubic(progress));

            setDisplayDecay(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [activeIndex, inView]);

    return (
        <section ref={sectionRef} className={`relative ${showHeader ? 'py-20 md:py-32' : 'pt-4 md:pt-8 pb-16 md:pb-24'} bg-white overflow-hidden`}>
            {/* Ambient Background "Risk Pulses" */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-slate-100/50 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -40, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#C8B38A]/5 rounded-full blur-[150px]"
                />
            </div>

            <div className={`container mx-auto px-4 relative z-20 ${!showHeader ? 'pt-0' : ''}`}>
                {showHeader && (
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-slate-100 border border-slate-200"
                        >
                            <TrendingDown className="w-3 h-3 text-[#CF3F5C]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                Liability Forecasting
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: [0.21, 0.45, 0.32, 0.9] }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-slate-900 mb-6 leading-[0.9]"
                        >
                            {title.includes("Won't Save") ? (
                                <>
                                    {title.split("Won't Save")[0]}
                                    <span className="text-red-600">Won&apos;t Save</span>
                                    {title.split("Won't Save")[1]}
                                </>
                            ) : (
                                title
                            )}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-tight"
                        >
                            {subtitle}
                        </motion.p>
                    </div>
                )}

                {/* Dashboard Window Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* The "App Window" Frame */}
                    <div className="relative rounded-[2rem] p-1 bg-gradient-to-b from-slate-200 to-slate-400/10 shadow-2xl">
                        <div className="bg-white rounded-[1.9rem] overflow-hidden border border-slate-200 shadow-inner relative">

                            {/* Sweeping Scanner Overlay */}
                            <motion.div
                                animate={{ x: ['-200%', '300%'] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-transparent via-slate-100/40 to-transparent skew-x-12 pointer-events-none z-10"
                            />

                            {/* Window Header / Tab Bar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5 mr-4">
                                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-[80%] text-center">
                                    <p className="text-[9px] md:text-xs font-black uppercase tracking-widest md:tracking-[0.3em] text-slate-900">
                                        {windowTitle}
                                    </p>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-0 min-h-[435px]">
                                {/* Left Side: Metric Selectors */}
                                <div className={`lg:col-span-4 order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-slate-100 p-6 md:p-8 flex-col bg-slate-50/30 ${hideMobileStages ? 'hidden lg:flex' : 'flex'}`}>
                                    {showLiabilityMatrix && (
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                                            <TrendingDown className="w-3 h-3 text-[#CF3F5C]" /> Liability_Matrix
                                        </h3>
                                    )}

                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0 },
                                            show: {
                                                opacity: 1,
                                                transition: { staggerChildren: 0.3 }
                                            }
                                        }}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        className="flex-1 flex flex-col justify-between space-y-4"
                                    >
                                        {stages.map((stage, i) => (
                                            <motion.div
                                                key={i}
                                                variants={{
                                                    hidden: { opacity: 0, x: -20 },
                                                    show: { opacity: 1, x: 0 }
                                                }}
                                                onMouseEnter={() => setActiveIndex(i)}
                                                onMouseLeave={() => setActiveIndex(null)}
                                                className={`p-4 rounded-xl border transition-all duration-500 cursor-pointer group/card relative overflow-hidden ${activeIndex === i
                                                    ? 'bg-white border-[#C8B38A]/30 translate-x-1 shadow-xl'
                                                    : 'bg-white/50 border-slate-100 hover:bg-white hover:border-slate-200'
                                                    }`}
                                            >
                                                {/* Card Hover Pulse Background */}
                                                <AnimatePresence>
                                                    {activeIndex === i && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.8 }}
                                                            className="absolute inset-0 bg-gradient-to-br from-[#C8B38A]/5 to-transparent -z-10"
                                                        />
                                                    )}
                                                </AnimatePresence>

                                                <div className="flex items-start gap-4">
                                                    <div className={`mt-0.5 p-2 rounded-lg ${stage.bgColor} border ${stage.borderColor} transition-all duration-500 ${activeIndex === i ? 'scale-110 rotate-3 shadow-lg' : ''}`}>
                                                        {(() => {
                                                            const Icon = ICON_MAP[stage.iconName] || Activity;
                                                            return <Icon className={`w-5 h-5 ${stage.impactColor}`} />;
                                                        })()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-0.5">
                                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{stage.title}</span>
                                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border border-current ${stage.impactColor}`}>
                                                                {stage.impact}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-slate-900 font-black uppercase tracking-tighter text-sm mb-1">{stage.problem}</h4>
                                                        <p className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${activeIndex === i ? 'text-slate-900' : 'text-slate-600'}`}>
                                                            {stage.decayLabel}
                                                        </p>

                                                        <AnimatePresence>
                                                            {activeIndex === i && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden mt-2 pt-2 border-t border-slate-100 font-medium"
                                                                >
                                                                    <div className="text-[10px] text-slate-500 leading-relaxed">
                                                                        {stage.description}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* System Status Footer */}
                                    {showCalculationsLive && (
                                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <motion.div
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                                                />
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Calculations_Live</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Visualizer */}
                                <div className="lg:col-span-8 order-1 lg:order-2 p-6 md:p-8 flex flex-col justify-between items-stretch bg-white border-b lg:border-b-0 border-slate-100">

                                    <div className="flex flex-row justify-end items-start gap-4 mb-4 md:mb-6">
                                        <motion.div
                                            initial={{ x: 20, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            className="px-4 py-3 md:px-6 md:py-4 bg-slate-50 rounded-2xl border border-slate-100 text-right shadow-sm group/metric"
                                        >
                                            <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 md:mb-2 leading-none">Structural Decay Risk</p>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-3xl md:text-5xl font-black leading-none tracking-tighter"
                                                style={{ color: activeIndex !== null ? data[activeIndex].color : data[data.length - 1].color }}
                                            >
                                                {prefix}{displayDecay.toLocaleString()}{suffix}{activeIndex === data.length - 1 || activeIndex === null ? '+' : ''}
                                            </motion.p>
                                        </motion.div>
                                    </div>

                                    <div className="flex-1 min-h-[305px] relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                key={inView ? 'inview' : 'outview'}
                                                data={data}
                                                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                                            >
                                                <defs>
                                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                                        <stop offset="0%" stopColor="#10B981" />
                                                        <stop offset="40%" stopColor="#F59E0B" />
                                                        <stop offset="100%" stopColor="#EF4444" />
                                                    </linearGradient>
                                                    <linearGradient id="colorDecay" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor={activeIndex !== null ? data[activeIndex].color : "#EF4444"} stopOpacity={0.1} />
                                                        <stop offset="95%" stopColor={activeIndex !== null ? data[activeIndex].color : "#EF4444"} stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                                <XAxis
                                                    dataKey="name"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: 'rgba(0,0,0,0.3)', fontSize: 10, fontWeight: 900 }}
                                                    dy={15}
                                                    padding={{ left: 0, right: 0 }}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: 'rgba(0,0,0,0.3)', fontSize: 9, fontWeight: 700 }}
                                                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                                                />
                                                <Tooltip
                                                    cursor={{ stroke: 'rgba(0,0,0,0.05)', strokeWidth: 1 }}
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            const d = payload[0].payload;
                                                            return (
                                                                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xl backdrop-blur-md">
                                                                    <p className="text-[9px] uppercase font-black tracking-widest text-emerald-500 mb-1">{d.name}</p>
                                                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">${d.decay.toLocaleString()}</p>
                                                                    <div className={`h-0.5 w-6 my-3 rounded-full ${d.decay > 70 ? 'bg-red-500' : d.decay > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.label}</p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="decay"
                                                    stroke="url(#lineGradient)"
                                                    strokeWidth={6}
                                                    fillOpacity={1}
                                                    fill="url(#colorDecay)"
                                                    isAnimationActive={inView}
                                                    animationDuration={4000}
                                                    animationEasing="ease-in-out"
                                                    activeDot={{ r: 10, stroke: '#fff', strokeWidth: 4, fill: '#000' }}
                                                />

                                                {activeIndex !== null && (
                                                    <ReferenceLine
                                                        x={data[activeIndex].name}
                                                        stroke="rgba(0,0,0,0.1)"
                                                        strokeDasharray="5 5"
                                                    />
                                                )}
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {showCTA && (
                    <div className="mt-20 text-center relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="max-w-xl mx-auto"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isHome ? (
                                    <Link href={ctaLink} passHref legacyBehavior>
                                        <Button
                                            size="lg"
                                            className={`group h-20 px-12 md:px-20 rounded-2xl ${ctaColor} text-white font-black text-base md:text-xl uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 flex items-center gap-4 mx-auto`}
                                        >
                                            Stop the Damage Now
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <LeadFormModal location="Cost of Waiting - Stop Damage">
                                        <Button
                                            size="lg"
                                            className={`group h-20 px-12 md:px-20 rounded-2xl ${ctaColor} text-white font-black text-base md:text-xl uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 flex items-center gap-4 mx-auto`}
                                        >
                                            Stop the Damage Now
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                                        </Button>
                                    </LeadFormModal>
                                )}
                            </motion.div>
                            <div className="mt-8 flex items-center justify-center gap-4">
                                <div className="h-px w-8 bg-slate-200" />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                                    Zero Obligation Assessment
                                </p>
                                <div className="h-px w-8 bg-slate-200" />
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}
