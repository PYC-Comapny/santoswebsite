'use client';

import React from 'react';
import Image from 'next/image';

const LOGOS = [
    {
        name: 'ABC Supply',
        url: '/logos/abc-supply.svg',
    },
    {
        name: 'Elevate',
        url: '/logos/elevate.png',
    },
    {
        name: 'SRS Distribution',
        url: '/logos/srs.png',
    },
];

export default function LogoTicker() {
    // Duplicate logos for seamless looping
    const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

    return (
        <section className="py-12 bg-white border-y border-slate-50 overflow-hidden select-none">
            <div className="container mx-auto px-4 mb-8">
                <p className="text-center text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Trusted by Industrial Leaders & Local Homeowners
                </p>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* Gradient Overlays for smooth edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

                <div className="flex animate-scroll whitespace-nowrap min-w-full items-center py-4">
                    {duplicatedLogos.map((logo, index) => (
                        <div
                            key={`${logo.name}-${index}`}
                            className="mx-6 md:mx-12 flex items-center justify-center transition-all duration-500 cursor-pointer scale-95 hover:scale-105"
                        >
                            <div className="relative h-12 w-32 md:w-40">
                                <Image
                                    src={logo.url}
                                    alt={logo.name}
                                    fill
                                    className="object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
