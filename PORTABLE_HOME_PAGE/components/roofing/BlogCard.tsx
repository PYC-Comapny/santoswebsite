'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
}

export default function BlogCard({ slug, title, excerpt, date, readTime, image, category }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
        >
            <Link href={`/blog/${slug}`} className="block">
                <div className="relative h-64 overflow-hidden">
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 border border-slate-200">
                            {category}
                        </span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {readTime}
                        </div>
                    </div>

                    <h3 className="text-2xl font-black italic tracking-tighter text-slate-900 mb-4 group-hover:text-premiumAccent transition-colors leading-[1.1] uppercase">
                        {title}
                    </h3>

                    <p className="text-slate-500 font-medium text-sm mb-6 line-clamp-2 leading-relaxed italic">
                        {excerpt}
                    </p>

                    <div className="flex items-center text-slate-900 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Read Full Report
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
