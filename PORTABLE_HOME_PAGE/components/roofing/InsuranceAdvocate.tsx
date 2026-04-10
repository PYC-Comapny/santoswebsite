'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ShieldCheck, FileText, Camera, CheckCircle2 } from 'lucide-react';

export default function InsuranceAdvocate() {
    const containerRef = useScrollAnimation();

    const features = [
        {
            icon: <Camera className="w-6 h-6" />,
            title: "Full Photo Inventory",
            desc: "We document every inch of damage so adjusters can't claim it 'doesn't exist'."
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Detailed Tech Reports",
            desc: "Comprehensive engineering-grade reports provided to your insurance company."
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "On-Site Representation",
            desc: "We'll be there when the insurance adjuster arrives to ensure they see what we see."
        }
    ];

    return (
        <section ref={containerRef} className="py-24 relative overflow-hidden bg-white">
            {/* Technical Texture Sub-layer */}
            <div className="absolute inset-0 bg-dot-grid opacity-30 -z-10" />

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="animate-on-scroll">
                        <div className="inline-block px-4 py-1.5 mb-8 glass rounded-full border-trustBlue/20">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-trustBlue italic">
                                Tactical Support
                            </span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black leading-[0.85] mb-8 tracking-tighter uppercase italic text-slate-900">
                            Stop Fighting <span className="text-trustBlue underline decoration-trustBlue/20 decoration-8 underline-offset-8">Adjusters</span> Alone.
                        </h2>

                        <p className="text-xl text-slate-600 mb-12 leading-snug max-w-xl font-medium">
                            Insurance companies often minimize repairs to protect their margins. We provide the technical evidence—high-res documentation and engineering-grade reports—to make your claim <span className="text-slate-900 font-black">Undeniable.</span>
                        </p>

                        <div className="space-y-8">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-6 group animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-trustBlue/5 border border-trustBlue/10 flex items-center justify-center text-trustBlue group-hover:bg-trustBlue group-hover:text-white group-hover:rotate-[10deg] transition-all duration-700 ease-organic">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">{f.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative animate-on-scroll stagger-2">
                        <div className="relative z-10 glass p-6 rounded-[2.5rem] border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                            <div className="bg-slate-950 p-10 rounded-[2rem] text-white">
                                <div className="flex justify-between items-center mb-12">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    </div>
                                    <div className="w-24 h-4 bg-white/5 rounded-full flex items-center px-2">
                                        <div className="w-1/2 h-full bg-premiumAccent/40 rounded-full" />
                                    </div>
                                </div>

                                <h5 className="text-2xl font-black mb-6 uppercase italic tracking-tighter">Diagnostic Report</h5>
                                <div className="space-y-6 mb-12">
                                    {[90, 75, 95].map((val, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <CheckCircle2 className="text-premiumAccent w-6 h-6 flex-shrink-0" />
                                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-premiumAccent shadow-[0_0_15px_rgba(242,140,56,0.5)] transition-all duration-1000 delay-500 group-hover:opacity-80" style={{ width: `${val}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center group/img">
                                        <span className="text-[10px] uppercase font-black text-white/30 tracking-widest group-hover/img:text-white/50 transition-colors">Damage-A</span>
                                    </div>
                                    <div className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center group/img">
                                        <span className="text-[10px] uppercase font-black text-white/30 tracking-widest group-hover/img:text-white/50 transition-colors">Evidence-B</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* High-End Atmospheric Blurs */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-trustBlue/10 rounded-full blur-[120px] -z-10" />
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-premiumAccent/5 rounded-full blur-[100px] -z-10" />

                        {/* Price Lock Guarantee Card - Premium Version */}
                        <div className="absolute bottom-[-30px] left-[-30px] z-20 glass p-8 rounded-[2rem] border-white/50 shadow-2xl max-w-[320px] animate-on-scroll stagger-3 group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-premiumAccent/10 flex items-center justify-center text-premiumAccent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h6 className="font-black text-slate-900 uppercase italic tracking-tighter leading-none text-lg">The Erie <br /><span className="text-premiumAccent text-xl underline decoration-premiumAccent/20">Price-Lock</span></h6>
                            </div>
                            <p className="text-xs text-slate-600 font-bold leading-relaxed uppercase italic">
                                The quote you sign is the price you pay. If we find hidden rot, we cover the costs. <span className="text-slate-900 font-black">Absolute Protection.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
