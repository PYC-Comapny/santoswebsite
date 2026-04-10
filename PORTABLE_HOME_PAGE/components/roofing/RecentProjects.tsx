'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Project {
    id: number;
    title: string;
    category: string;
    location: string;
    description: string;
    imageUrl: string;
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Premium Architectural Installation',
        category: 'Residential',
        location: 'Greater Erie Area',
        description: 'A high-performance roofing system installed with meticulous attention to detail, maximizing both curb appeal and home protection.',
        imageUrl: '/unnamed.jpg',
    },
    {
        id: 2,
        title: 'Full Roof Replacement',
        category: 'Residential',
        location: 'Erie, PA',
        description: 'Complete tear-off and installation of high-definition architectural shingles with enhanced ventilation system.',
        imageUrl: '/2.jpg',
    },
    {
        id: 3,
        title: 'Emergency Storm Repair',
        category: 'Repair',
        location: 'Millcreek, PA',
        description: 'Rapid response storm damage repair including structural reinforcement and matching shingle replacement.',
        imageUrl: '/3.jpg',
    },
    {
        id: 4,
        title: 'Metal Roofing Install',
        category: 'Premium',
        location: 'Fairview, PA',
        description: 'Installation of a standing seam metal roofing system for lifetime durability and energy efficiency.',
        imageUrl: '/1.jpg',
    },
    {
        id: 5,
        title: 'Siding & Trim Upgrade',
        category: 'Remodeling',
        location: 'Erie, PA',
        description: 'Premium vinyl siding installation and custom trim work for a complete exterior transformation.',
        imageUrl: '/5.jpg',
    },
];

export default function RecentProjects() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollToForm = () => {
        const element = document.getElementById('universal-lead-form');
        if (element) {
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.pageYOffset - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-premiumAccent font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Jobs Just Completed
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] mb-6 tracking-tighter uppercase">
                        Recent Projects
                    </h2>

                    <div className="w-16 h-1.5 bg-premiumAccent mx-auto rounded-full"></div>
                </div>
            </div>

            <div className="relative px-4 md:px-12 max-w-[1700px] mx-auto group">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                className="flex-[0_0_85%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4 min-w-0"
                            >
                                <div className="relative group/card overflow-hidden rounded-[24px] bg-white shadow-sm transition-all duration-500 ease-organic hover:shadow-2xl hover:-translate-y-2 aspect-[4/3]">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-organic group-hover/card:scale-110"
                                    />
                                    {/* Project Info Overlay Removed */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 shadow-xl flex items-center justify-center text-slate-900 hover:bg-premiumAccent hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex z-10 hover:scale-110 active:scale-90"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 shadow-xl flex items-center justify-center text-slate-900 hover:bg-premiumAccent hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex z-10 hover:scale-110 active:scale-90"
                >
                    <ChevronRight className="w-7 h-7" />
                </button>
            </div>

        </section>
    );
}
