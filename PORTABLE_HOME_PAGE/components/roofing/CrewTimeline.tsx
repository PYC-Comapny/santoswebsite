'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Clock, Hammer, CheckCircle2, Coffee, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CrewTimeline() {
    const containerRef = useScrollAnimation();

    const schedule = [
        {
            time: "7:00 AM",
            action: "Crew Arrival",
            desc: "Full 8-person team arrives with all equipment. No late shows.",
            icon: <Clock className="w-5 h-5" />,
            color: "bg-slate-900"
        },
        {
            time: "9:00 AM",
            action: "Tear-Off & Inspection",
            desc: "Old materials removed. We inspect the deck for hidden wood rot.",
            icon: <Hammer className="w-5 h-5" />,
            color: "bg-premiumAccent"
        },
        {
            time: "1:00 PM",
            action: "Precision Install",
            desc: "Underlayment and premium shingles installed to spec.",
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: "bg-trustBlue"
        },
        {
            time: "4:00 PM",
            action: "Clean Sweep",
            desc: "Advanced magnetic sweeping—we find every single stray nail.",
            icon: <Sparkles className="w-5 h-5" />,
            color: "bg-green-600"
        }
    ];

    return (
        <section ref={containerRef} className="py-24 bg-black text-white overflow-hidden relative">
            {/* Dark Mode Atmospheric Depth */}
            <div className="bg-glow-blob top-[20%] left-[10%] w-[500px] h-[500px] opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--premiumAccent) 0%, transparent 70%)' }} />

            {/* Background Graphic Parallax */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black tracking-tighter uppercase italic select-none text-white/10 blur-[2px]">
                    24H
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24 animate-on-scroll">
                    <div className="inline-block px-4 py-1.5 mb-8 glass-dark rounded-full border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic">The Efficiency Engine</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic mb-8 leading-[0.85]">
                        The <span className="text-premiumAccent">24-HOUR</span> Difference
                    </h2>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-tight italic">
                        "Your neighbors won't even know we were there until they see the stunning new architectural statement."
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto mb-32">
                    {/* High-Contrast Connector Line */}
                    <div className="hidden md:block absolute top-[28px] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                    <div className="grid md:grid-cols-4 gap-12">
                        {schedule.map((item, i) => (
                            <div key={i} className="relative animate-on-scroll group" style={{ transitionDelay: `${i * 150}ms` }}>
                                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl border border-white/20 mx-auto md:mx-0 group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-700 ease-organic`}>
                                    {item.icon}
                                </div>

                                <div className="md:border-t-0 border-l-2 md:border-l-0 border-white/5 pl-8 md:pl-0 pt-0 md:pt-4">
                                    <span className="text-premiumAccent font-black text-xs uppercase tracking-[0.2em]">{item.time}</span>
                                    <h4 className="text-2xl font-black mt-2 mb-4 uppercase italic tracking-tighter leading-none">{item.action}</h4>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center animate-on-scroll stagger-3">
                    <div className="glass-dark p-12 rounded-[2.5rem] border-white/5 text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-premiumAccent/5 blur-3xl -z-10 group-hover:bg-premiumAccent/10 transition-colors duration-700" />
                        <p className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-white mb-6 leading-none">
                            Elite Manpower. <br /><span className="text-premiumAccent">Zero Compromise.</span>
                        </p>
                        <p className="text-slate-400 font-medium leading-relaxed text-lg">
                            We don't work "faster"—we work smarter. While others send 2 workers to struggle for weeks, we deploy an <span className="text-white font-black">8-Person Tactical Unit</span>.
                            <br /><br />
                            This "Parallel Execution" model means every critical component gets 100% focused attention. Speed is simply a byproduct of our elite logistics.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { val: '8X', label: 'Tactical Units', color: 'text-premiumAccent' },
                            { val: '1 DAY', label: 'Site Duration', color: 'text-trustBlue' },
                            { val: '3X', label: 'QC CHECKS', color: 'text-white' },
                            { val: '100%', label: 'NAIL SWEEP', color: 'text-green-500' }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] text-center shadow-2xl hover:bg-white/[0.07] transition-all duration-500 group">
                                <p className={cn("text-5xl font-black italic tracking-tighter group-hover:scale-110 transition-transform duration-700", stat.color)}>{stat.val}</p>
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mt-3">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
