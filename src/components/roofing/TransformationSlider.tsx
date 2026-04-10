'use client';

import { useState, useRef, useEffect } from 'react';
import NextImage from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SliderProps {
    beforeImage: string;
    afterImage: string;
}

function SingleSlider({ beforeImage, afterImage }: SliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [containerWidth, setContainerWidth] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            setContainerWidth(sliderRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (sliderRef.current) setContainerWidth(sliderRef.current.offsetWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
        const position = ((x - rect.left) / rect.width) * 100;

        setSliderPosition(Math.max(0, Math.min(100, position)));
    };

    return (
        <div
            ref={sliderRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] cursor-col-resize select-none border-4 md:border-8 border-white group"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
        >
            {/* After Image */}
            <div className="absolute inset-0">
                <NextImage
                    src={afterImage}
                    alt="After: Premium Roof"
                    fill
                    className="object-cover"
                    loading="lazy"
                />
                <div className="absolute top-6 right-6 glass px-4 py-2 rounded-xl border-white/20 shadow-2xl backdrop-blur-[12px]">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-premiumAccent">After</span>
                </div>
            </div>

            {/* Before Image */}
            <div
                className="absolute inset-0 overflow-hidden z-10"
                style={{ width: `${sliderPosition}%` }}
            >
                <div className="h-full relative" style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}>
                    <NextImage
                        src={beforeImage}
                        alt="Before: Damaged Roof"
                        fill
                        className="object-cover filter grayscale-[0.3] brightness-[0.8]"
                        loading="lazy"
                    />
                </div>
                <div className="absolute top-6 left-6 glass px-4 py-2 rounded-xl border-white/10 shadow-xl backdrop-blur-[4px] bg-black/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Before</span>
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_30px_rgba(0,0,0,0.5)] z-20 group-hover:w-2 transition-all duration-300"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_40px_rgba(0,0,0,0.3)] flex items-center justify-center border-4 border-premiumAccent transform group-hover:scale-110 transition-transform duration-500 ease-organic">
                    <svg className="w-6 h-6 text-premiumAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function TransformationSlider() {
    const containerRef = useScrollAnimation();

    const sliderSets = [
        { before: '/before1.jpg', after: '/after1.jpg' },
        { before: '/before2.jpg', after: '/after2.jpg' },
    ];

    return (
        <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
            <div className="bg-glow-blob top-0 right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] opacity-10 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-16 flex justify-center gap-16 animate-on-scroll">
                    <div className="text-center group cursor-default">
                        <p className="text-4xl md:text-6xl font-black text-slate-200 tracking-tighter uppercase transition-colors group-hover:text-slate-300">Before</p>
                    </div>
                    <div className="text-center group cursor-default">
                        <p className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase transition-transform group-hover:scale-110 duration-500">After</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-on-scroll stagger-1">
                    {sliderSets.map((set, index) => (
                        <div key={index} className="flex flex-col">
                            <SingleSlider beforeImage={set.before} afterImage={set.after} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
