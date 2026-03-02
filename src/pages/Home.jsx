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

const Hero = () => {
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section ref={heroRef} className="relative h-[100dvh] flex items-center bg-[#0A0A0A] overflow-hidden">
            {/* Grain Purple Gradient Background */}
            <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/[0.04] via-transparent to-primary/[0.02]" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-100" />

            <div className="relative z-20 w-full max-w-[1500px] mx-auto px-8 md:px-20 mt-24">
                <motion.div
                    initial="initial"
                    animate="whileInView"
                    variants={staggerContainer}
                    className="max-w-5xl space-y-10"
                >
                    <motion.p
                        variants={fadeUp}
                        className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.4em] text-primary font-bold italic"
                    >
                        Senior Digitaal Strateeg · 10+ jaar Designer
                    </motion.p>
                    <motion.h1
                        variants={fadeUp}
                        className="font-sans font-bold leading-[1.1] text-[#F2F0E9] tracking-tighter flex flex-wrap items-baseline gap-x-4 text-4xl md:text-5xl lg:text-[64px]"
                    >
                        <span>Krijg meer gedaan met</span>
                        <span className="text-primary font-drama font-normal leading-[1.1] text-4xl md:text-5xl lg:text-[67px]">je huidige team.</span>
                    </motion.h1>
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col md:flex-row items-start md:items-center gap-12"
                    >
                        <p className="font-sans text-[#F2F0E9]/80 text-lg md:text-xl font-light max-w-2xl border-l-[2px] border-primary/40 pl-8 leading-relaxed italic">
                            Ik bouw de systemen die het werk van je overnemen. Een website die zelf leads vangt, een dashboard voor direct overzicht, of slimme hulpjes voor je dagelijkse taken. Jij richt je op de groei, ik regel de techniek.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center gap-6 pt-2"
                    >
                        <a href="#contact" className="btn-magnetic group bg-primary text-white border-transparent shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                            <span className="relative z-10">Start je traject</span>
                            <div className="btn-bg bg-[#F2F0E9]" />
                        </a>
                        <a href="#contact" className="btn-magnetic group bg-transparent border border-white/10 text-[#F2F0E9]">
                            <span className="relative z-10">Gratis adviesgesprek</span>
                            <div className="btn-bg bg-[#F2F0E9]" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
};

const HomeAbout = () => {
    return (
        <section className="py-24 px-8 bg-[#0A0A0A] relative overflow-hidden border-y border-white/5">
            <div className="max-w-[1400px] mx-auto px-8 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-4 relative group lg:ml-auto"
                >
                    <div className="aspect-[4/5] max-w-[400px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden border border-white/10 relative shadow-sm">
                        <img
                            src="/merlijn-portrait.png"
                            alt="Merlijn"
                            className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-10 group-hover:opacity-0 transition-opacity duration-1000" />
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -z-10" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-8 space-y-10 md:space-y-16 px-8 md:px-20"
                >
                    <SectionLabel>Wie ben ik?</SectionLabel>
                    <motion.h1
                        variants={fadeUp}
                        className="font-sans font-bold leading-[1.1] text-[#F2F0E9] tracking-tighter flex flex-wrap items-baseline gap-x-4 text-3xl md:text-5xl lg:text-[58px]"
                    >
                        <span>Geen mooie praatjes.</span>
                        <span className="text-primary font-drama font-normal leading-[1.1] text-3xl md:text-5xl lg:text-[61px]">Gewoon resultaten.</span>
                    </motion.h1>
                    <div className="space-y-6">
                        <p className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed border-l-[3px] border-primary/40 pl-8 md:pl-12">
                            Ik ben al meer dan 10 jaar actief als designer. Dat is mijn edge. Ik begrijp hoe systemen eruit moeten zien voordat ik ze bouw: waardoor wat ik opleveer niet alleen werkt, maar er ook ziet alsof het zo hoort.
                        </p>
                        <p className="font-sans text-[#F2F0E9]/40 text-base md:text-lg font-light leading-relaxed max-w-2xl ml-8 md:ml-12 italic">
                            Ik heb een allergie voor traagheid en onnodige complexiteit. Geen eindeloze meetings, geen vaag advies. Ik bouw geen websites, ik bouw tools die je werk uit handen nemen omdat ik stop met handmatige gepruts. Dit is geen tijdprobleem, dit is een systeemprobleem.
                        </p>
                    </div>
                    <Link
                        to="/over-mij"
                        className="inline-flex items-center gap-6 group text-[#F2F0E9]/60 hover:text-[#F2F0E9] transition-all uppercase tracking-[0.4em] font-mono font-black text-xs md:text-sm"
                    >
                        Lees mijn verhaal
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500">
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform group-hover:text-black" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

const Services = () => {
    const services = [
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

    return (
        <section id="wat-ik-bouw" className="py-32 bg-[#141414] relative overflow-hidden border-t border-white/5">
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
            <div className="max-w-[1500px] mx-auto px-8 md:px-20 space-y-32 relative z-10">
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 md:gap-16"
                >
                    <div className="space-y-8 md:space-y-12">
                        <SectionLabel>Diensten</SectionLabel>
                        <motion.h2 variants={fadeUp} className="font-sans font-bold leading-[1.1] text-[#F2F0E9] tracking-tighter flex flex-wrap items-baseline gap-x-4 text-3xl md:text-5xl lg:text-[58px]">
                            <span>Kies waar we</span>
                            <span className="text-primary font-drama font-normal leading-[1.1] text-3xl md:text-5xl lg:text-[61px]">beginnen.</span>
                        </motion.h2>
                    </div>
                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 max-w-md text-lg md:text-2xl border-l-[3px] border-primary/20 pl-8 md:pl-12 pb-4 md:pb-6 italic leading-relaxed">
                        Drie manieren om je bedrijf weer op snelheid te krijgen. Zonder gedoe, direct resultaat.
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
                            className="group relative"
                        >
                            <div className="bg-[#1A1A1A]/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/5 group-hover:border-primary/40 group-hover:bg-[#1A1A1A]/60 transition-all duration-700 flex flex-col min-h-auto md:min-h-[500px] cursor-pointer shadow-sm hover:shadow-2xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="w-14 h-14 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-10 md:mb-16 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700">
                                    {React.cloneElement(s.icon, { size: 28 })}
                                </div>

                                <div className="space-y-6 md:space-y-8 flex-grow relative z-10">
                                    <p className="font-mono text-xs md:text-[14px] text-primary uppercase tracking-[0.3em] font-bold">
                                        {s.subtitle}
                                    </p>
                                    <h3 className="text-2xl md:text-4xl font-sans font-bold text-[#F2F0E9] leading-tight tracking-tight">
                                        {s.title}
                                    </h3>
                                    <p className="font-sans text-[#F2F0E9]/40 font-light leading-relaxed text-base md:text-xl pb-8 md:pb-12 italic">
                                        {s.desc}
                                    </p>
                                </div>

                                <div className="pt-8 md:pt-12 border-t border-white/5 mt-auto">
                                    <Link
                                        to={s.href}
                                        className="btn-magnetic group w-full bg-transparent border border-white/10 text-[#F2F0E9]/50"
                                    >
                                        <span className="relative z-10">{s.cta}</span>
                                        <ArrowRight size={14} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                                        <div className="btn-bg bg-primary shadow-[0_0_20px_rgba(201,168,76,0.3)]" />
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

const Process = () => {
    const steps = [
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
        <section ref={containerRef} id="samenwerking" className="py-24 md:py-48 bg-[#0A0A0A] relative border-b border-white/5">
            <div className="max-w-[1200px] mx-auto px-8 md:px-20">
                <div className="mb-24 md:mb-40 space-y-12 text-center">
                    <SectionLabel className="justify-center">Het Traject</SectionLabel>
                    <h2 className="font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter flex flex-wrap items-baseline gap-x-4 justify-center text-3xl md:text-5xl lg:text-[58px]">
                        <span>Drie fases.</span>
                        <span className="text-primary font-drama font-normal leading-[1.1] text-3xl md:text-5xl lg:text-[61px]">Geen verrassingen.</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Progress Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block" />
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
                                <div className="absolute left-[20px] md:left-1/2 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-20 -translate-x-1/2 -mt-1 shadow-lg shadow-primary/20">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                </div>

                                <div className="w-full md:w-1/2 space-y-6 md:px-0 pl-16">
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-primary text-[12px] font-black tracking-widest">{step.id}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] tracking-tighter leading-[1.1]">
                                        {step.title}
                                    </h3>
                                    <p className="text-[#F2F0E9]/50 text-base md:text-xl font-sans font-light leading-relaxed italic max-w-lg">
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
    const questions = [
        { q: "Heb ik zelf technische kennis nodig?", a: "Nee. Ik bouw het, ik leg het simpel uit en jij gebruikt het. Geen gedoe met code." },
        { q: "Ik heb al een website, wat nu?", a: "Geen probleem. We kunnen je huidige site optimaliseren of de dashboards en automatiseringen toevoegen." },
        { q: "Hoeveel tijd kost dit mij?", a: "Minimaal. We doen één intake van 20 minuten, daarna neem ik het werk uit handen." },
        { q: "Moet ik alles in één keer doen?", a: "Nee. De meeste ondernemers kiezen eerst één upgrade om een specifiek probleem op te lossen." }
    ];

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="vragen" className="py-20 px-8 bg-[#141414] border-b border-white/5">
            <div className="max-w-[1200px] mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-6">
                    <SectionLabel>Vragen</SectionLabel>
                    <h2 className="font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter flex flex-wrap items-baseline gap-x-4 text-3xl md:text-5xl lg:text-[58px]">
                        <span>Alles wat je moet weten</span>
                        <span className="text-primary font-drama font-normal leading-[1.1] text-3xl md:text-5xl lg:text-[61px]">voordat we starten.</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div
                            key={i}
                            className={`rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${openIndex === i ? 'bg-[#1A1A1A]/80 border-primary/20 shadow-sm' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full px-6 py-6 flex items-center justify-between text-left group"
                            >
                                <span className={`text-base md:text-lg font-sans font-bold transition-colors ${openIndex === i ? 'text-primary' : 'text-[#F2F0E9]/70'}`}>
                                    {item.q}
                                </span>
                                <ChevronDown size={14} className={`transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-primary' : 'text-[#F2F0E9]/20'}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "circOut" }}
                                    >
                                        <div className="px-6 pb-6 text-[#F2F0E9]/50 text-base font-sans font-light italic border-t border-white/5 pt-4">
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

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-8 bg-[#0A0A0A] text-[#F2F0E9] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-[1500px] mx-auto flex flex-col items-center">
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-left md:text-center space-y-10 md:space-y-16 mb-12 md:mb-20 w-full"
                >
                    <SectionLabel className="md:justify-center">Plan Je Scan</SectionLabel>
                    <motion.h2 variants={fadeUp} className="font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter flex flex-wrap items-baseline gap-x-4 md:justify-center text-3xl md:text-5xl lg:text-[58px]">
                        <span>Welke upgrade gaan we als</span>
                        <span className="text-primary font-drama font-normal leading-[1.1] text-3xl md:text-5xl lg:text-[61px]">eerste activeren?</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/40 text-base md:text-xl font-light leading-relaxed italic max-w-3xl mx-auto border-b-2 border-white/5 pb-8 md:pb-10 text-center">
                        Kies het onderdeel waar je nu de meeste winst laat liggen. <br className="hidden md:block" />
                        Ik kijk in 20 minuten met je mee waar de kansen zitten.
                    </motion.p>
                </motion.div>

                <div className="w-full max-w-4xl mx-auto px-8 md:px-20">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <div className="bg-[#0A0A0A]">
            <Hero />
            <HomeAbout />
            <Services />
            <Process />
            <FAQ />
            <ContactSection />
        </div>
    );
};

export default Home;
