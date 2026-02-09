"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useI18n, languages } from '@/i18n';

export function LanguageSwitcher() {
    const { language, setLanguage } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
                aria-label="Change language"
            >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="text-sm font-bold text-foreground">{currentLang.label}</span>
                <ChevronDown
                    className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-44 bg-background/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden z-[100]"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${language === lang.code ? 'bg-primary/10' : ''
                                    }`}
                            >
                                <span className="text-xl">{lang.flag}</span>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-bold text-foreground">{lang.label}</span>
                                    <span className="text-xs text-muted-foreground">{lang.fullName}</span>
                                </div>
                                {language === lang.code && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
