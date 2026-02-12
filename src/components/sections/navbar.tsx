"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Send, Phone } from 'lucide-react';
import { useI18n } from '@/i18n';

const logoImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/488925a3-a960-4fee-b5ba-48f81ac8ebe2-onestepmarketinguz-tilda-ws/assets/images/logo-1.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/onestepmarketinguz/', icon: <Instagram size={20} />, color: 'bg-[#E4405F]' },
    { name: 'Telegram', href: 'https://t.me/onestep_manager1', icon: <Send size={20} />, color: 'bg-[#229ED9]' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 transition-all duration-300 rounded-3xl bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-xl flex items-center w-[calc(100%-2rem)] md:w-full md:max-w-[1146px] min-h-[80px] md:min-h-[134px]">
        <div className="flex justify-between items-center relative z-10 w-full">
          <a href="/" className="flex items-center group">
            <Logo className="transition-all duration-500 group-hover:scale-105" />
          </a>

          <div className="hidden md:flex items-center gap-10 mr-4">
            {navItems.map((item) =>
              <a
                key={item.href}
                href={item.href}
                className="relative text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white text-[15px] font-black tracking-widest uppercase transition-all duration-300 group px-4 py-2">
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-[200] p-3 text-black dark:text-white transition-all active:scale-90"
              aria-label="Toggle Menu">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen &&
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[140] bg-black/80 md:hidden" />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 z-[150] w-[75%] sm:w-[60%] bg-white/95 dark:bg-black/95 backdrop-blur-xl md:hidden flex flex-col p-6 shadow-2xl border-l border-black/5 dark:border-white/10 will-change-transform">

              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">MENYU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-black dark:text-white hover:text-primary transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item, index) =>
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="text-3xl font-bold tracking-tight text-black dark:text-white hover:text-primary transition-all duration-300 flex items-center gap-4 group py-3 border-b border-black/5 dark:border-white/5">
                    <span className="text-xs font-medium text-primary/40 group-hover:text-primary transition-colors">0{index + 1}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                  </motion.a>
                )}
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">IJTIMOIY</span>
                  <div className="flex gap-4">
                    {socialLinks.map((social) =>
                      <a
                        key={social.name}
                        href={social.href}
                        className={`flex items-center justify-center w-12 h-12 rounded-2xl text-white transition-all hover:scale-110 active:scale-95 shadow-lg ${social.color}`}
                        aria-label={social.name}>
                        {social.icon}
                      </a>
                    )}
                  </div>
                </div>

                <a
                  href="tel:+998901234567"
                  className="flex items-center justify-center gap-3 w-full bg-black dark:bg-white text-white dark:text-black p-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-primary dark:hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95">
                  <Phone size={18} />
                  {t('nav.contact')}
                </a>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none w-48 h-48 rotate-12 flex items-center justify-center">
                <Logo className="scale-150" />
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>
  );
};

export default Navbar;