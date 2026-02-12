"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Instagram, ArrowRight, ChevronDown, Search, CheckCircle } from 'lucide-react';
import { useI18n } from '@/i18n';

const countries = [
  { code: 'UZ', name: 'O\'zbekiston', dial: '+998', flag: '🇺🇿', placeholder: '90 123 45 67' },
  { code: 'US', name: 'AQSH', dial: '+1', flag: '🇺🇸', placeholder: '(555) 000-0000' },
  { code: 'RU', name: 'Rossiya', dial: '+7', flag: '🇷🇺', placeholder: '(900) 000-00-00' },
  { code: 'KZ', name: 'Qozog\'iston', dial: '+7', flag: '🇰🇿', placeholder: '701 123 4567' },
  { code: 'TR', name: 'Turkiya', dial: '+90', flag: '🇹🇷', placeholder: '505 123 45 67' },
  { code: 'GB', name: 'Buyuk Britaniya', dial: '+44', flag: '🇬🇧', placeholder: '7400 123456' },
  { code: 'DE', name: 'Germaniya', dial: '+49', flag: '🇩🇪', placeholder: '151 12345678' },
  { code: 'FR', name: 'Fransiya', dial: '+33', flag: '🇫🇷', placeholder: '06 12 34 56 78' },
  { code: 'AE', name: 'BAA', dial: '+971', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: 'SA', name: 'Saudiya Arabistoni', dial: '+966', flag: '🇸🇦', placeholder: '50 123 4567' },
  { code: 'TJ', name: 'Tojikiston', dial: '+992', flag: '🇹🇯', placeholder: '90 123 4567' },
  { code: 'KG', name: 'Qirg\'iziston', dial: '+996', flag: '🇰🇬', placeholder: '550 123 456' },
  { code: 'TM', name: 'Turkmaniston', dial: '+993', flag: '🇹🇲', placeholder: '61 123456' },
  { code: 'AZ', name: 'Ozarbayjon', dial: '+994', flag: '🇦🇿', placeholder: '50 123 45 67' },
  { code: 'CN', name: 'Xitoy', dial: '+86', flag: '🇨🇳', placeholder: '138 0013 8000' },
  { code: 'JP', name: 'Yaponiya', dial: '+81', flag: '🇯🇵', placeholder: '090-1234-5678' },
  { code: 'KR', name: 'Janubiy Koreya', dial: '+82', flag: '🇰🇷', placeholder: '010-1234-5678' },
  { code: 'IN', name: 'Hindiston', dial: '+91', flag: '🇮🇳', placeholder: '91234 56789' },
  { code: 'CA', name: 'Kanada', dial: '+1', flag: '🇨🇦', placeholder: '(555) 000-0000' },
  { code: 'AU', name: 'Avstraliya', dial: '+61', flag: '🇦🇺', placeholder: '0412 345 678' },
];

const ContactSection: React.FC = () => {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activity, setActivity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dial.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁўЎқҚғҒҳҲ\s']/g, '');
    setName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/[^\d\s\-\(\)]/g, '');
    setPhoneNumber(cleaned);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const fullPhone = `${selectedCountry.dial} ${phoneNumber}`;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone: fullPhone,
          activity,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Yuborishda xatolik yuz berdi';
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          errorMessage = await response.text() || response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      setShowSuccess(true);
      setName('');
      setPhoneNumber('');
      setActivity('');
    } catch (error: any) {
      console.error('Submission error:', error);
      alert(error.message || 'Xabar yuborishda xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-background py-12 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[40%] aspect-square bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">

          <div className="lg:col-span-4">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 block">{t('contact.label')}</span>
              <h2 className="text-foreground text-3xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-10 leading-[0.9] tracking-tighter uppercase">
                {t('contact.title_1')} <br />
                <span className="text-primary">{t('contact.title_2')}</span>
              </h2>

              <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-6 md:mb-16 max-w-md">
                {t('contact.description')}
              </p>

              <div className="space-y-6 md:space-y-12">
                <div className="group cursor-pointer">
                  <p className="text-[8px] text-muted-foreground/60 uppercase tracking-[0.2em] mb-1 md:mb-2 font-bold">{t('contact.phone_label')}</p>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <a href="tel:+998770401414" className="text-foreground text-lg md:text-3xl font-medium hover:text-primary transition-all flex items-center gap-3 md:gap-4 group/link w-full">
                      +998 77 040 14 14
                      <ArrowRight className="w-4 h-4 md:w-6 md:h-6 opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-primary" />
                    </a>
                    <a href="tel:+998955011414" className="text-foreground text-lg md:text-3xl font-medium hover:text-primary transition-all flex items-center gap-3 md:gap-4 group/link w-full">
                      +998 95 501 14 14
                      <ArrowRight className="w-4 h-4 md:w-6 md:h-6 opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-primary" />
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-6">
                  <a
                    href="https://www.instagram.com/onestepmarketinguz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg shadow-black/[0.03] dark:shadow-none">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                  <a
                    href="https://t.me/onestep_manager1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl glass-card flex items-center justify-center hover:bg-[#229ED9] hover:text-white transition-all shadow-lg shadow-black/[0.03] dark:shadow-none">
                    <Send className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 lg:pl-8 xl:pl-16 w-full overflow-visible">
            <div className="glass-card rounded-[32px] md:rounded-[50px] p-8 md:p-20 relative group border-2 border-primary/20 bg-white/5 dark:bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full lg:w-[calc(100%+80px)] xl:w-[calc(100%+120px)] ml-auto isolate overflow-visible">
              <div className="absolute inset-0 overflow-hidden rounded-[32px] md:rounded-[50px] pointer-events-none z-[-1]">
                <div className="absolute top-0 right-0 w-[120%] h-80 bg-primary/20 blur-[100px] rounded-full" />
              </div>

              <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12" onSubmit={handleSubmit}>
                <div className="space-y-1 col-span-1 group/input">
                  <p className="text-sm md:text-base text-primary font-black uppercase tracking-[0.2em] mb-2 md:mb-4">{t('contact.form.name_label')}</p>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder={t('contact.form.name_placeholder')}
                    className="w-full bg-transparent border-b-2 border-border py-4 md:py-6 text-foreground text-xl md:text-3xl font-medium outline-none focus:border-primary transition-all placeholder:text-muted-foreground/30"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-1 col-span-1 group/input">
                  <p className="text-sm md:text-base text-primary font-black uppercase tracking-[0.2em] mb-2 md:mb-4">{t('contact.form.phone_label')}</p>
                  <div className="relative flex items-center border-b-2 border-border focus-within:border-primary transition-all" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 py-2 md:py-4 pr-3 hover:bg-primary/5 rounded-xl transition-all active:scale-95">
                      <span className="text-2xl md:text-4xl drop-shadow-sm">{selectedCountry.flag}</span>
                      <span className="text-foreground text-sm md:text-xl font-bold tracking-tight">{selectedCountry.dial}</span>
                      <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-primary transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-[calc(100vw-4rem)] md:w-80 bg-background/98 backdrop-blur-3xl border border-primary/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] overflow-hidden">
                          <div className="p-3 border-b border-border/50 bg-muted/10">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary" />
                              <input
                                ref={searchInputRef}
                                type="text"
                                placeholder={t('contact.form.search_country')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-background border border-border/50 rounded-xl py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 transition-all"
                              />
                            </div>
                          </div>
                          <div className="max-h-[50vh] md:max-h-64 overflow-y-auto">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsDropdownOpen(false);
                                  setSearchQuery('');
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-all text-left border-b border-border/10 last:border-0 ${selectedCountry.code === country.code ? 'bg-primary/5' : ''}`}>
                                <span className="text-2xl">{country.flag}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-foreground font-semibold text-xs truncate">{country.name}</p>
                                </div>
                                <span className="text-primary font-mono text-xs font-bold">{country.dial}</span>
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="text-center py-8 px-4">
                                <p className="text-muted-foreground text-sm">{t('contact.form.country_not_found')}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder={selectedCountry.placeholder}
                      className="flex-1 bg-transparent py-3 md:py-6 pl-3 text-foreground text-xl md:text-3xl font-bold outline-none placeholder:text-muted-foreground/30"
                      required
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2 group/input">
                  <p className="text-sm md:text-base text-primary font-black uppercase tracking-[0.2em] mb-2 md:mb-4">{t('contact.form.activity_label')}</p>
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    placeholder={t('contact.form.activity_placeholder')}
                    className="w-full bg-transparent border-b-2 border-border py-4 md:py-6 text-foreground text-xl md:text-3xl font-medium outline-none focus:border-primary transition-all placeholder:text-muted-foreground/30"
                    required
                  />
                </div>

                <div className="md:col-span-2 pt-4 md:pt-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full md:w-auto px-8 md:px-16 py-3 md:py-6 bg-foreground text-background font-black rounded-full flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300 text-xs md:text-base shadow-xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'YUBORILMOQDA...' : t('contact.form.submit')}
                    {!isSubmitting && <Send className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[210] w-[90%] max-w-lg"
            >
              <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950 rounded-[40px] p-10 md:p-14 shadow-2xl border border-white/20 dark:border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-[60px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 blur-[50px] rounded-full" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      damping: 12,
                      stiffness: 200,
                      delay: 0.2
                    }}
                    className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/30"
                  >
                    <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={2.5} />
                  </motion.div>

                  <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 text-black dark:text-white tracking-tight">
                    {t('contact.success.title')}
                  </h3>

                  <p className="text-muted-foreground mb-10 font-medium text-lg md:text-xl leading-relaxed max-w-sm">
                    {t('contact.success.message')}
                  </p>

                  <button
                    onClick={() => setShowSuccess(false)}
                    className="w-full py-4 md:py-5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 text-sm md:text-base"
                  >
                    {t('contact.success.close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;