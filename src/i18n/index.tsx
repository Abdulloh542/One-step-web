"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import uzTranslations from './uz.json';
import ruTranslations from './ru.json';
import enTranslations from './en.json';

export type Language = 'uz' | 'ru' | 'en';

type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

const translations: Record<Language, Translations> = {
    uz: uzTranslations,
    ru: ruTranslations,
    en: enTranslations,
};

export const languages: { code: Language; label: string; flag: string; fullName: string }[] = [
    { code: 'uz', label: 'UZ', flag: '🇺🇿', fullName: "O'zbekcha" },
    { code: 'ru', label: 'RU', flag: '🇷🇺', fullName: 'Русский' },
    { code: 'en', label: 'EN', flag: '🇬🇧', fullName: 'English' },
];

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-language';

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('uz');
    const [isHydrated, setIsHydrated] = useState(false);

    // Load saved language on mount
    useEffect(() => {
        const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
        if (savedLang && translations[savedLang]) {
            setLanguageState(savedLang);
        }
        setIsHydrated(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem(STORAGE_KEY, lang);
    };

    // Translation function with nested key support (e.g., "nav.home")
    const t = (key: string): string => {
        const keys = key.split('.');
        let value: TranslationValue = translations[language];

        for (const k of keys) {
            if (typeof value === 'object' && value !== null && k in value) {
                value = value[k];
            } else {
                // Key not found, return the key itself
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    // Prevent hydration mismatch by rendering nothing until client-side
    if (!isHydrated) {
        return null;
    }

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
