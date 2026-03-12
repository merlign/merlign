import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Check,
    Layout as LayoutIcon,
    Zap,
    Clock3,
    Activity,
    LineChart,
    ChevronDown,
    MousePointerClick
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { getHomePageData, getFaqs, getContactInfo } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15 } }
};

const Hero = ({ data }) => {
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    // Fallbacks
    const heroSans = data?.heroSans || "Krijg meer gedaan met";
    const heroSerif = data?.heroSerif || "je huidige team.";
    const heroSubtitle = data?.heroSubtitle || "Ik bouw de systemen die het werk van je overnemen. Een website die zelf leads vangt, een dashboard voor direct overzicht, of slimme hulpjes voor je dagelijkse taken. Jij richt je op de groei, ik regel de techniek.";
    const heroCta = data?.heroCta || "Gratis adviesgesprek";
    const heroLabel = data?.heroLabel || "Senior Digitaal Strateeg · 10+ jaar Designer";
    const heroCtaAlt = data?.heroCtaAlt || "Bekijk diensten";

    return (
        <section ref={heroRef} className="relative h-[100dvh] flex items-center bg-[var(--background)] overflow-hidden">
            {/* Grain Purple Gradient Background */}
            <div className="absolute inset-0 z-0 bg-[var(--background)]">
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/[0.05] via-transparent to-primary/[0.02]" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-100" />

            <div className="relative z-20 w-full content-max-width section-px pt-24 md:pt-40">
                <motion.div
                    initial="initial"
                    animate="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-5xl space-y-12"
                >
                    <motion.p
                        variants={fadeUp}
                        className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.4em] text-primary font-bold italic"
                    >
                        {heroLabel}
                    </motion.p>
                    <motion.h1
                        variants={fadeUp}
                        className="font-sans font-bold text-[var(--text)] text-h1"
                    >
                        {heroSans}{' '}
                        <span className="text-primary font-drama font-normal text-h1-serif">{heroSerif}</span>
                    </motion.h1>
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col md:flex-row items-start md:items-center gap-12"
                    >
                        <p className="font-sans text-[var(--text)]/85 text-base md:text-xl font-light max-w-2xl leading-[1.7] italic">
                            {heroSubtitle}
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center gap-4 md:gap-6 pt-2"
                    >
                        <a href="#contact" className="btn-magnetic group bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)] w-full sm:w-auto">
                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">{heroCta}</span>
                            <div className="btn-bg bg-primary" />
                        </a>
                        <a href="#wat-ik-bouw" className="btn-magnetic group bg-transparent border border-[var(--border)] text-[var(--text)] px-10 md:px-12 py-5 md:py-6 rounded-full w-full sm:w-auto">
                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">{heroCtaAlt}</span>
                            <div className="btn-bg bg-primary" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
};

const HomeAbout = ({ data }) => {
    const headlineSans = data?.aboutHeadlineSans || "Geen mooie praatjes.";
    const headlineSerif = data?.aboutHeadlineSerif || "Gewoon resultaten.";
    const para1 = data?.aboutPara1 || "Ik ben al meer dan 10 jaar actief als designer. Dat is mijn edge. Ik begrijp hoe systemen eruit moeten zien voordat ik ze bouw: waardoor wat ik opleveer niet alleen werkt, maar er ook ziet alsof het zo hoort.";
    const para2 = data?.aboutPara2 || "Ik heb een allergie voor traagheid en onnodige complexiteit. Geen eindeloze meetings, geen vaag advies. Ik bouw geen websites, ik bouw tools die je werk uit handen nemen omdat ik stop met handmatige gepruts. Dit is geen tijdprobleem, dit is een systeemprobleem.";

    return (
        <section id="over-mij" className="section-py relative overflow-hidden border-y border-[var(--border)] bg-[var(--background)]">
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/[0.04] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-primary/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <div className="content-max-width section-px grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group lg:ml-0 order-first lg:order-none"
                >
                    {/* The "Portal" Background */}
                    <div className="aspect-[4/5] w-full max-w-[280px] md:max-w-[480px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-visible bg-[var(--paper)]/40 border-[var(--border)] relative shadow-2xl transition-all duration-700 group-hover:bg-[var(--paper)]/60">
                        {/* Blueprint Grid Interior */}
                        <div className="absolute inset-8 rounded-[1.5rem] border border-primary/10 opacity-20 bg-[linear-gradient(to_right,#6366F1_1px,transparent_1px),linear-gradient(to_bottom,#6366F1_1px,transparent_1px)] bg-[size:20px_20px] z-0" />

                        {/* Glowing Aura Behind Him */}
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

                        {/* The Cutout Portrait - Refined Proportional Scale */}
                        <motion.img
                            src="/merlijn-new.png"
                            alt="Merlijn"
                            className="absolute bottom-0 left-[48%] -translate-x-1/2 w-auto h-[95%] max-w-none z-30 filter brightness-95 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000 ease-out pointer-events-none origin-bottom"
                        />

                        {/* Glassmorphic "Technical" Overlay */}
                        <div className="absolute inset-0 rounded-[2.5rem] border border-[var(--border)] pointer-events-none z-20" />
                    </div>
                </motion.div>

                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-10 md:space-y-16"
                >
                    <SectionLabel>Wie ben ik?</SectionLabel>
                    <motion.h2
                        variants={fadeUp}
                        className="font-sans font-bold text-[var(--text)] text-h2"
                    >
                        {headlineSans}{' '}
                        <span className="text-primary font-drama font-normal text-h2-serif">{headlineSerif}</span>
                    </motion.h2>
                    <div className="space-y-6">
                        <p className="font-sans text-[var(--text)]/85 text-base md:text-xl font-light italic leading-[1.8] max-w-2xl">
                            {para1}
                        </p>
                        <p className="font-sans text-[var(--text)]/85 text-base md:text-lg font-light leading-[1.8] max-w-2xl italic">
                            {para2}
                        </p>
                    </div>
                    <Link
                        to="/over-mij"
                        className="inline-flex items-center gap-6 group text-[var(--text)]/60 hover:text-[var(--text)] transition-all uppercase tracking-[0.4em] font-mono font-black text-xs md:text-sm"
                    >
                        Lees mijn verhaal
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[var(--text)]/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500">
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform group-hover:text-white" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

const Services = ({ cmsServices, data }) => {
    const headlineSans = data?.servicesHeadlineSans || "Kies waar we";
    const headlineSerif = data?.servicesHeadlineSerif || "beginnen.";
    const subtitle = data?.servicesSubtitle || "Drie manieren om je bedrijf weer op snelheid te krijgen. Zonder gedoe, direct resultaat.";
    const staticServices = [
        {
            icon: <LayoutIcon />,
            title: "Nieuwe website die écht verkoopt",
            subtitle: "Live in 72u",
            desc: "Je wacht al te lang op die nieuwe site. Ik bouw een strakke website die direct klanten voor je binnenhaalt. Geen maanden gedoe, volgende week ben je live.",
            cta: "Bekijk website aanpak",
            href: "/website"
        },
        {
            icon: <LineChart />,
            title: "Al je cijfers in één simpel overzicht",
            subtitle: "Stop met gokken",
            desc: "Van je bankrekening tot je advertenties: je ziet in één oogopslag waar je winst maakt en waar je geld verliest. Direct overzicht op je laptop of telefoon.",
            cta: "Hoe dit dashboard werkt",
            href: "/dashboard"
        },
        {
            icon: <Zap />,
            title: "Je randzaken op de autopilot",
            subtitle: "Krijg je tijd terug",
            desc: "Ik neem je saaie, herhalende werk over. Van het opvolgen van aanvragen tot je administratie. Ik bouw de slimme koppelingen, jij doet alleen nog wat je leuk vindt.",
            cta: "Ontdek de mogelijkheden",
            href: "/automatisering"
        }
    ];

    // Combine static services with icons and dynamic text from CMS
    const services = staticServices.map((s, i) => {
        if (cmsServices && cmsServices[i]) {
            // Map serviceType to the correct URL
            const typeMap = {
                'website': '/website',
                'dashboard': '/dashboard',
                'automation': '/automatisering',
                'contact': '#contact'
            };

            const mappedHref = cmsServices[i].serviceType ? typeMap[cmsServices[i].serviceType] : s.href;

            return {
                ...s,
                title: cmsServices[i].title || s.title,
                desc: cmsServices[i].description || s.desc,
                href: mappedHref
            };
        }
        return s;
    });

    return (
        <section id="wat-ik-bouw" className="py-32 bg-[var(--paper)] relative overflow-hidden border-t border-[var(--border)]">
            <div className="absolute top-1/2 left-0 w-[60vw] h-[60vw] bg-primary/[0.05] rounded-full blur-[140px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
            {/* 2D Background Artifacts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.1 }}
                        animate={{
                            y: [0, Math.random() * 100 - 50, 0],
                            rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                        className="absolute w-20 h-20 border border-primary/20 rounded-xl"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>
            <div className="content-max-width section-px space-y-20 md:space-y-32 relative z-10">
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 md:gap-16"
                >
                    <div className="space-y-8 md:space-y-12">
                        <SectionLabel>Diensten</SectionLabel>
                        <motion.h2 variants={fadeUp} className="font-sans font-bold leading-tight text-[var(--text)] tracking-tighter text-h2">
                            {headlineSans} <span className="text-primary font-drama font-normal text-h2-serif">{headlineSerif}</span>
                        </motion.h2>
                    </div>
                    <motion.p variants={fadeUp} className="font-sans text-[var(--text)]/85 max-w-md text-lg md:text-2xl pb-4 md:pb-6 italic leading-[1.8]">
                        {subtitle}
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            className="group relative h-full"
                        >
                            <div className="bg-[var(--paper)]/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-[var(--border)] group-hover:border-primary/40 group-hover:bg-[var(--paper)]/60 transition-all duration-700 flex flex-col h-full cursor-pointer shadow-sm hover:shadow-2xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="w-14 h-14 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-10 md:mb-16 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3">
                                    {React.cloneElement(s.icon, { size: 28, className: "group-hover:scale-110 transition-transform duration-500" })}
                                </div>

                                <div className="space-y-6 md:space-y-8 flex-grow relative z-10">
                                    <p className="font-mono text-xs md:text-[14px] text-primary uppercase tracking-[0.3em] font-bold">
                                        {s.subtitle}
                                    </p>
                                    <h3 className="text-2xl md:text-4xl font-sans font-bold text-[var(--text)] leading-tight tracking-tight">
                                        {s.title}
                                    </h3>
                                    <p className="font-sans text-[var(--text)]/85 font-light leading-[1.8] text-base md:text-xl pb-8 md:pb-12 italic">
                                        {s.desc}
                                    </p>
                                </div>

                                <div className="pt-8 md:pt-12 border-t border-[var(--border)] mt-auto">
                                    <Link
                                        to={s.href}
                                        className="btn-magnetic group w-full bg-transparent border border-[var(--border)] text-[var(--text)]/50"
                                    >
                                        <span className="relative z-10">{s.cta}</span>
                                        <ArrowRight size={14} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                                        <div className="btn-bg bg-primary shadow-[0_0_20px_rgba(99,102,241,0.3)]" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProcessAnimation = ({ id }) => {
    if (id === "01") {
        return (
            <div className="w-full h-full flex items-center justify-center relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-40 h-40 border border-primary/20 rounded-full flex items-center justify-center"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-20 h-20 border-2 border-primary/40 rounded-full"
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-t from-primary/60 to-transparent origin-bottom" />
                </motion.div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
            </div>
        );
    }
    if (id === "02") {
        return (
            <div className="w-full h-full flex items-center justify-center relative">
                <div className="grid grid-cols-3 gap-2 w-32 h-32">
                    {[...Array(9)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: [0.2, 1, 0.2],
                                scale: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                            className="bg-primary/30 rounded-sm"
                        />
                    ))}
                </div>
                <motion.div
                    animate={{ x: [-100, 100, -100] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute h-[1px] w-48 bg-primary/40 blur-[2px]"
                />
            </div>
        );
    }
    if (id === "03") {
        return (
            <div className="w-full h-full flex items-center justify-center relative">
                <AnimatePresence>
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={`wave-${i}`}
                            initial={{ scale: 0.5, opacity: 0.8 }}
                            animate={{
                                scale: 2,
                                opacity: 0
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 1,
                                ease: "easeOut"
                            }}
                            className="absolute w-20 h-20 border border-primary/40 rounded-full"
                        />
                    ))}
                </AnimatePresence>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center relative z-10"
                >
                    <Check size={24} className="text-primary" />
                </motion.div>
            </div>
        );
    }
    return null;
};

const Process = ({ data }) => {
    const headlineSans = data?.processHeadlineSans || "Drie fases.";
    const headlineSerif = data?.processHeadlineSerif || "Geen verrassingen.";

    const staticSteps = [
        {
            id: "01",
            title: "De Intake",
            desc: "Eén gesprek van 45 minuten om de koers te bepalen. Ik graaf diep in je business en we trekken een streep in het zand."
        },
        {
            id: "02",
            title: "De Bouw-Sprint",
            desc: "Ik bouw je website, dashboard of automatisering in recordtempo. Alles in-house, zonder vertraging."
        },
        {
            id: "03",
            title: "De Overdracht",
            desc: "Je krijgt een systeem dat werkt, inclusief een simpele uitleg zodat je direct door kunt met real-time overzicht over je business."
        }
    ];

    const steps = data?.processSteps?.length > 0 ? data.processSteps.map((s, i) => ({
        id: s.stepNumber || staticSteps[i]?.id,
        title: s.title || staticSteps[i]?.title,
        desc: s.description || staticSteps[i]?.desc
    })) : staticSteps;

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} id="samenwerking" className="section-py relative border-b border-[var(--border)] overflow-hidden">
            <div className="content-max-width section-px">
                <div className="mb-24 md:mb-40 space-y-12 text-center">
                    <SectionLabel className="justify-center">Het Traject</SectionLabel>
                    <h2 className="font-sans font-bold text-[var(--text)] leading-tight tracking-tighter text-h2">
                        {headlineSans} <span className="text-primary font-drama font-normal text-h2-serif">{headlineSerif}</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Progress Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[var(--text)]/5 -translate-x-1/2 hidden md:block" />
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary -translate-x-1/2 hidden md:block"
                    />

                    <div className="space-y-24 md:space-y-48">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Step Indicator */}
                                <div className="absolute left-[8px] md:left-1/2 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center z-20 -translate-x-1/2 -mt-1 shadow-lg shadow-primary/20 sm:left-[20px] md:left-1/2">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[var(--background)] rounded-full animate-pulse" />
                                </div>
                                <div className="absolute left-[8px] md:hidden top-0 bottom-0 w-[1px] bg-[var(--text)]/10 -translate-x-1/2 z-10" />

                                <div className="w-full md:w-1/2 space-y-6 md:px-0 pl-10 md:pl-0">
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-primary text-[12px] font-black tracking-widest">{step.id}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[var(--text)] tracking-tighter leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-[var(--text)]/85 text-base md:text-xl font-sans font-light leading-[1.8] italic max-w-lg">
                                        {step.desc}
                                    </p>
                                </div>
                                <div className="hidden md:block w-1/2 h-[300px] relative pointer-events-none">
                                    <ProcessAnimation id={step.id} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    // 1. DIT ZIJN JE STANDAARD VRAGEN (FALLBACK)
    const staticQuestions = [
        {
            q: "Heb ik zelf technische kennis nodig?",
            a: "Totaal niet. Ik neem het volledige proces uit handen: van design en code tot de laatste API-koppeling. Jij krijgt een systeem dat simpel werkt, zodat jij je kunt focussen op je business terwijl de techniek op de achtergrond voor je draait."
        },
        {
            q: "Ik heb al een website, wat nu?",
            a: "Geen probleem. We kunnen je huidige site optimaliseren voor meer conversie, of we voegen specifiek de dashboards en automatiseringen toe aan je bestaande systeem. Ik bouw modulaire oplossingen die overal op aansluiten."
        },
        {
            q: "Hoeveel tijd kost een samenwerking mij?",
            a: "Minimaal. We starten met een check van 20 minuten. Daarna neem ik het zware werk over. Ik werk in korte sprints en jij geeft alleen feedback op de mijlpalen. Zo bouwen we high-end resultaat zonder dat het jouw agenda overneemt."
        },
        {
            q: "Moet ik alles (website, dashboard, automatisering) in één keer doen?",
            a: "Zeker niet. De meeste ondernemers beginnen met de grootste tijdvreter of het herstellen van hun 'digitale voordeur'. We pakken eerst het proces aan dat je nu de meeste winst of tijd oplevert. Opschalen kan altijd."
        }
    ];

    // 2. DIT IS HOE JE HET CMS KOPPELT
    const [cmsQuestions, setCmsQuestions] = useState([]);
    const [loading, setLoading] = useState(false); // Optioneel: toon een loader

    useEffect(() => {
        const fetchCmsData = async () => {
            setLoading(true);
            try {
                const data = await getFaqs();
                if (data && data.length > 0) {
                    // Map Sanity schema to local schema
                    const mappedFaqs = data.map(item => ({
                        q: item.question,
                        a: item.answer
                    }));
                    setCmsQuestions(mappedFaqs);
                }
            } catch (err) {
                console.error("CMS Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCmsData();
    }, []);

    // Only use CMS data if available to avoid duplicates; otherwise fall back to static
    const allQuestions = cmsQuestions.length > 0 ? cmsQuestions : staticQuestions;

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="vragen" className="section-py relative border-b border-[var(--border)]">
            <div className="content-max-width section-px grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-6">
                    <SectionLabel>Vragen</SectionLabel>
                    <h2 className="font-sans font-bold text-[var(--text)] leading-tight tracking-tighter text-h2">
                        Alles wat je moet weten <span className="text-primary font-drama font-normal text-h2-serif">voordat we starten.</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {allQuestions.map((item, i) => (
                        <div
                            key={i}
                            className={`rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${openIndex === i ? 'bg-[var(--paper)]/80 border-primary/20 shadow-sm' : 'bg-[var(--text)]/[0.01] border-[var(--border)] hover:border-[var(--text)]/10'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full px-6 py-6 flex items-center justify-between text-left group"
                            >
                                <span className={`text-base md:text-lg font-sans font-bold transition-colors ${openIndex === i ? 'text-primary' : 'text-[var(--text)]/70'}`}>
                                    {item.q}
                                </span>
                                <ChevronDown size={14} className={`transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-primary' : 'text-[var(--text)]/20'}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "circOut" }}
                                    >
                                        <div className="px-6 pb-6 text-[var(--text)]/50 text-base font-sans font-light italic border-t border-[var(--border)] pt-4 whitespace-pre-wrap">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContactSection = ({ data }) => {
    const headlineSans = data?.headlineSans || "Welke upgrade gaan we als";
    const headlineSerif = data?.headlineSerif || "eerste activeren?";
    const subtitle = data?.subtitle || "Kies het onderdeel waar je nu de meeste winst laat liggen. Ik kijk in 20 minuten met je mee waar de kansen zitten.";

    return (
        <section id="contact" className="py-24 px-8 bg-[var(--background)] text-[var(--text)] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-[1500px] mx-auto flex flex-col items-center">
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-center space-y-10 md:space-y-16 mb-12 md:mb-20 w-full"
                >
                    <SectionLabel className="justify-center">Plan Je Scan</SectionLabel>
                    <motion.h2 variants={fadeUp} className="font-sans font-bold text-[var(--text)] leading-tight tracking-tighter text-h2">
                        {headlineSans}{' '}
                        <span className="text-primary font-drama font-normal text-h2-serif">{headlineSerif}</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="font-sans text-[var(--text)]/85 text-base md:text-xl font-light leading-[1.8] italic max-w-3xl mx-auto border-b-2 border-[var(--border)] pb-8 md:pb-10">
                        {subtitle}
                    </motion.p>
                </motion.div>

                <div className="w-full content-max-width section-px">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    const [pageData, setPageData] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const [home, contact] = await Promise.all([
                    getHomePageData(),
                    getContactInfo()
                ]);
                setPageData(home);
                setContactInfo(contact);
            } catch (err) {
                console.error("Sanity Fetch Error:", err);
            }
        };
        fetchPageData();
    }, []);

    return (
        <div className="bg-[var(--background)] min-h-screen">
            <SEO
                title={pageData?.seoTitle || "Design & AI-automatisering voor mkb en zzpers"}
                description={pageData?.seoDescription || "Ik bouw websites die converteren, dashboards die inzicht geven en automatiseringen die tijd besparen. Geen gedoe, gewoon resultaat voor mkb en zzpers."}
                path="/"
            />
            <AnimatePresence mode="wait">
                {!pageData ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-[var(--background)] z-[100] flex items-center justify-center page-loader"
                    >
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-12 h-12 border border-primary/20 rounded-full"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Hero data={pageData} />
                        <Services cmsServices={pageData?.features} data={pageData} />
                        <HomeAbout data={pageData} />
                        <Process data={pageData} />
                        <FAQ />
                        <ContactSection data={contactInfo} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
