"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import Image from 'next/image';

const AboutSection: React.FC = () => {
    const { t } = useI18n();

    const stats = [
        { value: "100+", label: t('about.stats.projects') },
        { value: "50+", label: t('about.stats.clients') }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "circOut"
            }
        }
    };

    return (
        <section id="about" className="bg-background py-20 px-6 relative overflow-hidden transition-colors duration-500">
            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    className="grid lg:grid-cols-2 gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >

                    {/* Left: Image with Stats Card */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                    >
                        <div className="relative aspect-square md:aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl group">
                            <Image
                                src="/office-team-hq.png"
                                alt="One Step Agency Team"
                                fill
                                className="object-cover grayscale transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                            {/* Stats Card (Glassmorphism) */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 md:p-8 flex justify-around items-center shadow-2xl"
                            >
                                {stats.map((stat, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="text-center px-4">
                                            <div className="text-4xl md:text-5xl font-black text-primary mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-[10px] md:text-xs text-white/50 tracking-[0.2em] font-bold uppercase">
                                                {stat.label}
                                            </div>
                                        </div>
                                        {idx === 0 && (
                                            <div className="w-[1px] h-12 bg-white/10" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right: Text Content */}
                    <div className="flex flex-col justify-center">
                        <motion.span
                            variants={itemVariants}
                            className="text-primary font-bold uppercase tracking-[0.4em] text-xs md:text-sm mb-6 block"
                        >
                            {t('about.label')}
                        </motion.span>

                        <motion.h2
                            variants={itemVariants}
                            className="text-foreground text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-12 uppercase"
                        >
                            {t('about.title_1')}<br />
                            <span className="text-black/20 dark:text-white/40">{t('about.title_2')}</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed mb-12 max-w-xl"
                        >
                            <span className="text-foreground font-bold">{t('about.title_1')}</span> — {t('about.description').replace('ONE STEP - ', '')}
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-foreground text-background px-12 py-5 rounded-full font-bold text-lg md:text-xl transition-all shadow-2xl shadow-foreground/5 hover:opacity-90"
                            >
                                {t('about.more')}
                            </motion.button>
                        </motion.div>
                    </div>

                </motion.div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default AboutSection;
