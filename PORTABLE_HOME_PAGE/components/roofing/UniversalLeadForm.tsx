'use client';

import React from 'react';
import UniversalLeadFormInner from './UniversalLeadFormInner';

export default function UniversalLeadForm() {
    return (
        <section id="universal-lead-form" className="py-20 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-200/20 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl mx-auto text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-slate-900 mb-4">
                        Get Your Free Inspection
                    </h2>
                </div>

                <div className="relative z-10">
                    <UniversalLeadFormInner location="Main Section Inline Form" />
                </div>
            </div>
        </section>
    );
}
