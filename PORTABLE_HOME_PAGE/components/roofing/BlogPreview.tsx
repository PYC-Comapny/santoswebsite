'use client';

import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { blogPosts } from '@/lib/blogData';

export default function BlogPreview() {
  const containerRef = useScrollAnimation();
  
  // Define our 3 specific blogs
  const selectedSlugs = [
    'common-roofing-mistakes-erie-pa',
    'how-to-determine-roof-age-erie-pa',
    'how-to-find-roof-leak-erie-pa'
  ];
  
  const displayedPosts = blogPosts.filter(post => selectedSlugs.includes(post.slug));

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-on-scroll">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-4">
              Roofing <span className="text-premiumAccent">Education</span>
            </h2>

          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-premiumAccent font-black uppercase tracking-widest text-sm hover:gap-3 transition-all group"
          >
            Explore All Guides <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedPosts.map((post, idx) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group animate-on-scroll"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex flex-col h-full bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 hover:border-premiumAccent/20 hover:shadow-2xl hover:shadow-premiumAccent/10 transition-all duration-500">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <NextImage 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-900">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-premiumAccent transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-200/60">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-premiumAccent transition-colors">
                      Read Lesson
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-premiumAccent group-hover:border-premiumAccent group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
