"use client";

import React from 'react';
import { Smartphone, Zap, UserCheck, Target } from 'lucide-react';
import { useI18n } from '@/i18n';

const ServiceCard = ({ icon: Icon, titleKey, descKey }: {
  icon: typeof Smartphone;
  titleKey: string;
  descKey: string;
}) => {
  const { t } = useI18n();

  return (
    <div className="group relative p-10 md:p-16 rounded-[3rem] md:rounded-[5rem] bg-white dark:bg-zinc-900/50 border-2 border-black/5 dark:border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] cursor-pointer">
      <div className="relative z-10">
        <div className="mb-10 md:mb-16 w-20 h-20 md:w-28 md:h-28 rounded-[2rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl group-hover:shadow-primary/40">
          <Icon className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-500 group-hover:scale-110" />
        </div>

        <h3 className="text-foreground text-3xl md:text-4xl font-black mb-6 md:mb-8 tracking-tighter transition-colors duration-300 group-hover:text-primary leading-tight">
          {t(titleKey)}
        </h3>

        <p className="text-muted-foreground leading-relaxed text-lg md:text-2xl font-medium mb-12 md:mb-20 group-hover:text-foreground transition-colors duration-300">
          {t(descKey)}
        </p>

        <div className="flex items-center gap-4 text-primary font-black text-xs md:text-lg tracking-widest overflow-hidden h-8">
          <div className="flex items-center gap-4 transition-all duration-500">
            <span className="uppercase">{t('services.cta')}</span>
            <div className="w-12 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <Target className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
        </div>
      </div>

      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all duration-1000 group-hover:scale-150" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-1000 group-hover:scale-150" />
    </div>
  );
};

export default function ServicesSection() {
  const { t } = useI18n();

  const services = [
    { icon: Smartphone, titleKey: 'services.smm.title', descKey: 'services.smm.description' },
    { icon: Zap, titleKey: 'services.branding.title', descKey: 'services.branding.description' },
    { icon: UserCheck, titleKey: 'services.personal_brand.title', descKey: 'services.personal_brand.description' },
    { icon: Target, titleKey: 'services.targeting.title', descKey: 'services.targeting.description' },
  ];

  return (
    <section id="services" className="bg-background py-12 md:py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-32 gap-10">
          <div className="max-w-4xl">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-sm mb-6 block">
              {t('services.label')}
            </span>
            <h2 className="text-foreground text-4xl sm:text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter">
              {t('services.title_1')} <br /> <span className="text-primary">{t('services.title_2')}</span>
            </h2>
          </div>

          <div className="lg:max-w-xl">
            <p className="text-muted-foreground text-xl md:text-3xl font-medium leading-relaxed">
              {t('services.description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {services.map((service, index) => (
            <ServiceCard key={index} icon={service.icon} titleKey={service.titleKey} descKey={service.descKey} />
          ))}
        </div>
      </div>
    </section>
  );
}
