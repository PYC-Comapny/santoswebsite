'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Shield, Clock, Hammer } from 'lucide-react';
import Link from 'next/link';

const defaultFaqs = [
    {
        icon: <Hammer className="w-5 h-5" />,
        question: "What are your Roofing services?",
        answer: (
            <ul className="space-y-4 list-none">
                <li className="flex gap-3">
                    <span className="text-premiumAccent font-black group-hover:scale-110 transition-transform">•</span>
                    <span><strong className="text-slate-900">Master Roof Repair:</strong> Permanent leak fixes and shingle replacement to restore full protection.</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-premiumAccent font-black group-hover:scale-110 transition-transform">•</span>
                    <span><strong className="text-slate-900">Leak Detection:</strong> Expert tracing to find the exact source of water before damage spreads.</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-premiumAccent font-black group-hover:scale-110 transition-transform">•</span>
                    <span><strong className="text-slate-900">Chimney Flashing:</strong> Custom metal protection to keep fireplace areas bone-dry.</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-premiumAccent font-black group-hover:scale-110 transition-transform">•</span>
                    <span><strong className="text-slate-900">Skylight Service:</strong> Professional resealing for natural light without the "drip."</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-premiumAccent font-black group-hover:scale-110 transition-transform">•</span>
                    <span><strong className="text-slate-900">Attic Venting:</strong> Intake and exhaust balancing to lower energy bills and protect shingles.</span>
                </li>
            </ul>
        )
    },
    {
        icon: <HelpCircle className="w-5 h-5" />,
        question: "What is a 22 Point Roof Inspection?",
        answer: "A 22-point roof inspection is a multi-part assessment of a roofing system's structure, materials, and drainage to ensure integrity and prevent leaks. We evaluate areas from the ground, on the roof, and in the attic, covering shingles, flashing, gutters, and structural elements to provide a detailed report to better understand the problem."
    },
    {
        icon: <Shield className="w-5 h-5" />,
        question: "Are you licensed and insured?",
        answer: (
            <>
                Absolutely. We are fully licensed nearby (<Link href="/" prefetch={false} className="hover:text-premiumAccent underline transition-colors">LICENSE: CCC1336136</Link>) and carry both comprehensive liability and workers&apos; compensation insurance for your protection. With 25+ years of experience, we operate with maximum integrity on every project.
            </>
        )
    },
    {
        icon: <Clock className="w-5 h-5" />,
        question: "How long does a typical project take?",
        answer: "Minor damadges can take a couple days, when we run the inspecitons we like to ensure that is the root cause otherwise you'd pay twice."
    },
];

interface FAQProps {
    items?: {
        question: string;
        answer: string;
        icon?: React.ReactNode;
    }[];
}

export default function FAQ({ items }: FAQProps) {
    const containerRef = useScrollAnimation();
    
    // Merge standard items with page-specific ones
    const displayFaqs = items 
        ? [...items.map(item => ({ ...item, icon: item.icon || <HelpCircle className="w-5 h-5" /> })), ...defaultFaqs]
        : defaultFaqs;

    return (
        <section ref={containerRef} className="py-24 relative overflow-hidden bg-white">
            {/* Premium Atmospheric Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-premiumAccent/5 blur-[80px] md:blur-[120px] rounded-full opacity-60" />
                <div className="absolute bottom-[20%] left-[-10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-trustBlue/5 blur-[80px] md:blur-[100px] rounded-full opacity-40" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10 animate-on-scroll">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 mb-6">
                            F<span className="text-premiumAccent">AQ</span>
                        </h2>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-12 border border-slate-200/60 shadow-xl shadow-slate-200/50 animate-on-scroll stagger-1">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {displayFaqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-none bg-slate-50/50 rounded-2xl px-6 transition-all duration-300 hover:bg-white hover:shadow-md border border-transparent hover:border-premiumAccent/10 group"
                                >
                                    <AccordionTrigger className="hover:no-underline py-6">
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-premiumAccent group-data-[state=open]:bg-premiumAccent group-data-[state=open]:text-white transition-all duration-300">
                                                {faq.icon}
                                            </div>
                                            <span className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter">
                                                {faq.question}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 text-base md:text-lg font-medium leading-relaxed pb-8 pt-2 pl-4 md:pl-14">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}

