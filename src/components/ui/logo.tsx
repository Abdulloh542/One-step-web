import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon Part */}
      <div className="relative flex-shrink-0">
        <svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 md:w-12 md:h-12"
        >
            {/* Circle border */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              className="text-black dark:text-white"
            />
            {/* Digit 1 */}
            <text
              x="35"
              y="65"
              fontSize="45"
              fontWeight="900"
              fill="currentColor"
              className="text-black dark:text-white font-sans"
            >
              1
            </text>
            {/* Steps */}
            <path
              d="M55 65H65V55H75V45H85"
              stroke="#16FF00"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
  
        {/* Text Part */}
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-black dark:text-white lowercase">
              one
            </span>
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-[#16FF00] lowercase">
            step
          </span>
        </div>
        <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-black/80 dark:text-white/80 uppercase mt-0.5">
          DIGITAL MARKETING
        </span>
      </div>
    </div>
  );
};
