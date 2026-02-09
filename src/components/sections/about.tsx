"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Users, Rocket, Trophy } from 'lucide-react';

const AboutSection: React.FC = () => {
    const { t } = useI18n();

    const stats = [
        { icon: Rocket, value: "150+", label: t('about.stats.projects') },
        { icon: Users, value: "25+", label: t('about.stats.team') },
        { icon: Trophy, value: "100+", label: t('about.stats.clients') }
    ];

    return (
        <section id="about" className="bg-background py-20 md:py-40 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6"
                    >
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-sm mb-6 block">
                            {t('about.label')}
                        </span>
                        <h2 className="text-foreground text-4xl sm:text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-8">
                            {t('about.title_1')} <br />
                            <span className="text-primary">{t('about.title_2')}</span>
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-2xl font-light leading-relaxed mb-12">
                            {t('about.description')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                        <stat.icon size={24} />
                                    </div>
                                    <h4 className="text-3xl font-black text-foreground">{stat.value}</h4>
                                    <p className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6 relative"
                    >
                        <div className="relative aspect-square glass-card rounded-[50px] overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="w-[80%] aspect-square border-2 border-primary/20 rounded-full border-dashed"
                                />
                                <motion.div
                                    animate={{
                                        rotate: [360, 0],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute w-[60%] aspect-square border-2 border-emerald-500/20 rounded-full border-dashed"
                                />
                                <div className="absolute w-32 h-32 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 blur-[80px] rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
