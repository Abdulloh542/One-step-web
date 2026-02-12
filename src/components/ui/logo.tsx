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
    <div className={`flex items-center ${className}`}>
      {/* Centered Logo Badge */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
        <Image
          src={isDark ? "/logo-light.png" : "/logo-dark.png"}
          alt="One Step Logo"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
    </div>
  );
};
