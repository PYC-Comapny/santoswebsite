'use client';

import React, { useState, useEffect } from 'react';
import {
    ShieldAlert,
    Hammer,
    Home,
    ArrowRight,
    Droplets,
    Sparkles,
    Waves,
    Construction,
    Layers,
    Fan,
    Sun,
    CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ServicesSection() {


    const serviceHubs = [
        {
            id: 'roofing',
            title: 'Master Roofing',
            description: '25+ years of master craftsmanship. Whether it is a quick leak repair or a full replacement, we ensure your home is protected by the best materials.',
            icon: ShieldAlert,
            tag: 'Emergency Ready',
            color: 'text-red-600 bg-red-50/50 border-red-100',
            accent: 'red',
            subServices: ['Master roof repair', 'Leak detection', 'Chimney flashing', 'Skylight service', 'Attic venting'],
            cta: 'THIS IS THE PROBLEM',
            slug: 'master-roofing'
        },
        {
            id: 'siding',
            title: 'Exterior & Siding',
            description: 'Transform your home inside and out. We specialize in siding repairs and high-quality remodeling that stands the test of time.',
            icon: Hammer,
            tag: 'Expert Finish',
            color: 'text-premiumAccent bg-premiumAccent/5 border-premiumAccent/10',
            accent: 'amber',
            subServices: ['Siding repairs', 'Interior remodeling', 'Exterior remodeling', 'Full Transformation'],
            cta: 'THIS IS THE PROBLEM',
            slug: 'siding-exterior'
        },
        {
            id: 'gutters',
            title: 'Gutter Systems',
            description: 'Professional installation and repairs to safeguard your foundation and siding from water damage. Reliable protection for every storm.',
            icon: Home,
            tag: 'Full Shield',
            color: 'text-blue-600 bg-blue-50/50 border-blue-100',
            accent: 'blue',
            subServices: ['Gutter installation', 'Gutter repairs', 'Leaf Protection', 'Seamless Setup'],
            cta: 'THIS IS THE PROBLEM',
            slug: 'gutter-systems'
        }
    ];

    return (
        <section id="services" className="py-10 bg-white relative overflow-hidden">
            {/* Premium Atmospheric Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-premiumAccent/5 blur-[80px] md:blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-500/5 blur-[80px] md:blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 opacity-40" />
                {/* Technical Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-slate-900">
                        Service <span className="text-premiumAccent">Hub</span>
                    </h2>

                </div>

                {/* Unified Hub Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {serviceHubs.map((hub, idx) => (
                        <div
                            key={hub.id}
                            className="group relative flex flex-col bg-white/70 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 border border-slate-200/60 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-premiumAccent/10 hover:border-premiumAccent/30 transition-all duration-500 hover:-translate-y-2"
                        >

                            <div className="flex items-start justify-between mb-8">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${hub.color} border border-current/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                                    <hub.icon className="w-8 h-8" />
                                </div>
                                <Badge variant="outline" className={`rounded-full font-bold uppercase tracking-widest text-[9px] px-3 py-1 ${hub.color}`}>
                                    {hub.tag}
                                </Badge>
                            </div>

                            <div className="mb-6">
                                <Link href={`/services/${hub.slug}`}>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 hover:text-premiumAccent transition-colors cursor-pointer">
                                        {hub.title}
                                    </h3>

                                </Link>
                            </div>

                            <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-grow">
                                {hub.description}
                            </p>

                            {/* Sub-Services Micro-Chips */}
                            <div className="mb-10">
                                <div className="flex flex-wrap gap-2">
                                    {hub.subServices.map((service, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="px-3 py-1.5 rounded-lg bg-slate-100/50 border border-slate-200/50 flex items-center gap-2 group/chip hover:bg-white hover:border-premiumAccent/30 hover:shadow-sm transition-all duration-300"
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5 text-premiumAccent opacity-40 group-hover/chip:opacity-100 transition-opacity" />
                                            <span className="text-sm font-bold text-slate-500 group-hover/chip:text-slate-900 transition-colors">
                                                {service}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>



                            <Link href={`/services/${hub.slug}`} className="w-full block">
                                <Button
                                    className="w-full justify-between items-center group/btn py-5 md:py-7 px-6 rounded-2xl transition-all duration-300 shadow-lg bg-premiumAccent hover:bg-amber-600 shadow-premiumAccent/20 text-white mb-4"
                                >
                                    <span className="font-black uppercase tracking-widest text-sm">{hub.cta}</span>

                                    <div className="p-1 rounded-full bg-white/20 group-hover/btn:bg-white/30 transition-colors">
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

