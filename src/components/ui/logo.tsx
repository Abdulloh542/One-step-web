import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="flex flex-col">
          <div className="h-6 w-24 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
          <div className="h-2 w-32 bg-black/10 dark:bg-white/10 rounded mt-1 animate-pulse" />
        </div>
      </div>
    );
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Part */}
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        <Image
          src={isDark ? "/logo-dark.png" : "/logo-light.png"}
          alt="One Step Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text Part */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl md:text-3xl font-bold tracking-tighter text-black dark:text-white lowercase">
            one
          </span>
          <span className="text-2xl md:text-3xl font-bold tracking-tighter text-[#16FF00] lowercase">
            step
          </span>
        </div>
        <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-black/80 dark:text-white/80 uppercase mt-0.5 whitespace-nowrap">
          DIGITAL MARKETING
        </span>
      </div>
    </div>
  );
};
