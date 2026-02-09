"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { WordPullUp } from "@/components/ui/word-pull-up";
import { WaveText } from "@/components/ui/wave-text";
import { TrendingUp, Users, Target, Zap } from 'lucide-react';
import { useI18n } from '@/i18n';

// Animated Line Graph Component
const AnimatedGraph = () => {
  const pathD = "M 0 80 Q 30 60 60 70 T 120 50 T 180 55 T 240 30 T 300 20";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 300 100" className="w-full h-full opacity-60">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={`${pathD} L 300 100 L 0 100 Z`}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        />

        <motion.circle
          cx="300"
          cy="20"
          r="6"
          fill="#10b981"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        />
      </svg>
    </div>
  );
};

// Floating KPI Card Component
const KPICard = ({ icon: Icon, label, value, delay, position }: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  delay: number;
  position: string;
}) => (
  <motion.div
    className={`absolute ${position} bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-3 border border-white/20 dark:border-white/10 shadow-xl`}
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    <motion.div
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <p className="text-[10px] text-white/60 uppercase tracking-wider">{label}</p>
          <p className="text-sm font-bold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Floating Particles
const Particles = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-400/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

// Main Hero Visualization Component
const HeroVisualization = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-full h-full min-h-[280px] md:min-h-[350px]"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-primary/10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <Particles />
        <AnimatedGraph />
      </motion.div>

      <KPICard
        icon={Users}
        label={t('kpi.leads')}
        value="+247%"
        delay={1}
        position="top-4 left-4"
      />
      <KPICard
        icon={Target}
        label={t('kpi.conversion')}
        value="12.8%"
        delay={1.3}
        position="top-4 right-4"
      />
      <KPICard
        icon={Zap}
        label={t('kpi.roi')}
        value="340%"
        delay={1.6}
        position="bottom-4 left-1/2 -translate-x-1/2"
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30"
        >
          <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[85svh] md:min-h-[100svh] w-full overflow-hidden bg-background flex items-center justify-center pt-32 md:pt-40 transition-colors duration-500">
      <div className="absolute top-[-10%] right-[-5%] w-[60%] aspect-square bg-primary/10 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] aspect-square bg-primary/5 blur-[100px] rounded-full z-0" />

      <div className="container relative z-20 mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 w-full">
            <div className="mb-4 md:mb-6 flex flex-col items-start w-full">
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <WaveText
                  text="ONE"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-left w-fit text-black dark:text-white" />
                <WaveText
                  text="STEP"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-left w-fit text-primary" />
              </div>

              <WaveText
                text="DIGITAL"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-left text-black dark:text-white w-fit" />

              <WordPullUp
                words="MARKETING"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-left text-black dark:text-white" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-sm md:text-xl max-w-2xl mb-8 md:mb-12 font-light leading-relaxed">
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <a
                href="#contact"
                className="group relative px-10 md:px-12 py-4 md:py-6 bg-primary text-primary-foreground font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-sm md:text-lg shadow-lg shadow-primary/20">
                <span className="relative z-10">{t('hero.cta_primary')}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <a
                href="#services"
                className="px-8 md:px-12 py-4 md:py-6 border border-foreground/20 text-foreground font-bold rounded-full hover:bg-foreground/5 transition-all text-sm md:text-lg backdrop-blur-sm">
                {t('hero.cta_secondary')}
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 block mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative glass-card rounded-[30px] md:rounded-[40px] p-4 md:p-6 overflow-hidden group max-w-[400px] lg:max-w-none mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-primary/10 opacity-50" />
              <HeroVisualization />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center p-2 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;