'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => {
            elements?.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return containerRef;
}
