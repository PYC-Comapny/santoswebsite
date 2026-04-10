import React from 'react';

interface WavyDividerProps {
    color?: string;
    position?: 'top' | 'bottom';
    className?: string;
    flip?: boolean;
}

export default function WavyDivider({ 
    color = "#C8B38A", 
    position = 'top', 
    className = "",
    flip = false
}: WavyDividerProps) {
    return (
        <div 
            className={`absolute left-0 w-full overflow-hidden leading-[0] z-20 ${position === 'top' ? 'top-[-1px]' : 'bottom-[-1px]'} ${className}`}
            style={{ 
                transform: position === 'bottom' ? 'rotate(180deg)' : flip ? 'scaleX(-1)' : 'none' 
            }}
        >
            <svg 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none" 
                className="relative block w-full h-[50px] md:h-[120px]"
                style={{ fill: color }}
            >
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
            </svg>
        </div>
    );
}
