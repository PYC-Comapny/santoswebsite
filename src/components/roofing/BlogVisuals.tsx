'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Wind, ThermometerSnowflake, AlertTriangle } from 'lucide-react';

export function ErieWeatherVisual() {
    const factors = [
        { icon: <Snowflake className="w-5 h-5" />, label: "Lake Effect Moisture", desc: "Constant dampness and heavy snow loads" },
        { icon: <Wind className="w-5 h-5" />, label: "Off-Lake Gale Winds", desc: "High-pressure gusts that lift shingles" },
        { icon: <ThermometerSnowflake className="w-5 h-5" />, label: "Rapid Freeze-Thaw", desc: "Expanding ice that widens small cracks" }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-6 my-12">
            {factors.map((f, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500"
                >
                    <div className="mb-4 p-3 rounded-2xl bg-white border border-slate-100 text-premiumAccent group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                        {f.icon}
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2">{f.label}</h4>
                    <p className="text-[11px] font-medium text-slate-500 italic uppercase leading-tight">{f.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}

export function WaitMeter() {
    return (
        <div className="my-12 p-8 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <AlertTriangle className="w-24 h-24" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Risk_Assessment_Live</span>
                </div>

                <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-8 leading-tight">
                    Liability <span className="text-premiumAccent">Escalation</span> Meter
                </h4>

                <div className="relative h-4 bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div
                        initial={{ width: "20%" }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                    />
                </div>

                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <span>Maintenance Window</span>
                    <span className="text-red-500">Critical Failure</span>
                </div>
            </div>
        </div>
    );
}

export function LifespanMatrix() {
    const materials = [
        { name: "3-Tab Shingles", lifespan: 15, color: "bg-slate-400" },
        { name: "Architectural", lifespan: 28, color: "bg-premiumAccent" },
        { name: "Metal Roofing", lifespan: 50, color: "bg-slate-900" },
        { name: "Slate / Stone", lifespan: 75, color: "bg-emerald-600" }
    ];

    return (
        <div className="my-16 p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 text-center">Material_Longevity_Analysis_Erie</h4>
            <div className="space-y-8">
                {materials.map((m, i) => (
                    <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-black uppercase italic tracking-tighter text-slate-900">{m.name}</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.lifespan} Years</span>
                        </div>
                        <div className="h-4 bg-white rounded-full overflow-hidden border border-slate-200">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(m.lifespan / 75) * 100}%` }}
                                transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
                                className={`h-full ${m.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-10 text-[10px] font-medium text-slate-400 uppercase tracking-widest text-center italic leading-relaxed">
                *Adjusted for Northwest PA freeze-thaw cycles and lake-effect wind loads.
            </p>
        </div>
    );
}
