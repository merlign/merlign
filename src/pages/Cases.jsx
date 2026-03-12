import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquare, Target, Clock, Zap, Layout as LayoutIcon, Database, Filter } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';
import { BrowserMockup, DashboardMockup, AutomationMockup } from '../components/CaseMockup';
import SEO from '../components/SEO';
import { getCases, urlFor, getCasesPageData } from '../lib/sanity';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const Cases = () => {
    const [selectedFilter, setSelectedFilter] = useState('alle');
    const [cases, setCases] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [casesData, pageInfo] = await Promise.all([
                    getCases(),
                    getCasesPageData()
                ]);
                setCases(Array.isArray(casesData) ? casesData : []);
                setPageData(pageInfo);
            } catch (err) {
                console.error("Cases Fetch Error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const getIcon = (category) => {
        switch (category) {
            case 'websites': return <LayoutIcon size={24} />;
            case 'dashboards': return <Database size={24} />;
            case 'automatiseringen': return <Zap size={24} />;
            default: return <Zap size={24} />;
        }
    };

    const filteredCases = (Array.isArray(cases) ? cases : [])
        .filter(c => {
            if (selectedFilter === 'alle') return true;
            return c?.category === selectedFilter;
        });

    const filterOptions = [
        { id: 'alle', label: 'Alle Cases' },
        { id: 'websites', label: 'Websites' },
        { id: 'dashboards', label: 'Dashboards' },
        { id: 'automatiseringen', label: 'Automatiseringen' }
    ];

    return (
        <div className="bg-[#0A0A0A] min-h-screen">
            <SEO
                title={pageData?.seoTitle || "Portfolio & success stories | Resultaten van Merlign"}
                description={pageData?.seoDescription || "Zie hoe ik andere ondernemers en bedrijven hielp met webdesign, dashboards en AI. Bekijk de meetbare resultaten van mijn samenwerkingen."}
                path="/cases"
            />
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-[#0A0A0A] z-[200] flex items-center justify-center"
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
                        transition={{ duration: 0.8 }}
                        className="pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden"
                    >
                        {/* Background Artifacts */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                            <div className="absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" />
                            <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" />
                        </div>

                        <div className="content-max-width section-px space-y-20 md:space-y-40 relative z-10">
                            {/* Hero */}
                            <motion.div
                                initial="initial"
                                animate="whileInView"
                                className="max-w-5xl space-y-8 md:space-y-12"
                            >
                                <SectionLabel>Cases</SectionLabel>
                                <motion.h1
                                    variants={fadeUp}
                                    className="font-sans font-bold text-[#F2F0E9] text-h1"
                                >
                                    {pageData?.headlineSans || "Geen mooie praatjes."} <span className="text-primary font-drama font-normal text-h1-serif">{pageData?.headlineSerif || "Gewoon resultaten."}</span>
                                </motion.h1>
                                <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/85 text-lg md:text-xl font-light italic leading-[1.8] max-w-2xl">
                                    {pageData?.subtitle || "Wat ik heb gebouwd en welk meetbaar resultaat dat heeft opgeleverd."}
                                </motion.p>

                                {/* Filter Bar */}
                                <motion.div
                                    variants={fadeUp}
                                    className="flex flex-wrap items-center gap-4 md:gap-8 pt-4"
                                >
                                    <div className="flex flex-wrap gap-2 md:gap-4 bg-[#F2F0E9]/5 p-2 rounded-[1.5rem] border border-white/5 backdrop-blur-xl">
                                        {filterOptions.map((option) => {
                                            const count = option.id === 'alle'
                                                ? cases.length
                                                : cases.filter(c => c.category === option.id).length;

                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setSelectedFilter(option.id)}
                                                    className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-500 relative overflow-hidden group ${selectedFilter === option.id ? 'text-white' : 'text-[#F2F0E9]/40 hover:text-[#F2F0E9]'}`}
                                                >
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        {option.label}
                                                        <span className={`text-[8px] opacity-40 ${selectedFilter === option.id ? 'text-white/60' : 'text-primary'}`}>
                                                            ({count})
                                                        </span>
                                                    </span>
                                                    {selectedFilter === option.id && (
                                                        <motion.div
                                                            layoutId="activeFilter"
                                                            className="absolute inset-0 bg-primary"
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Case List */}
                            <motion.div
                                key={selectedFilter}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-32 md:space-y-64 min-h-[400px]"
                            >
                                {filteredCases.map((c, i) => (
                                    <motion.div
                                        key={c._id || i}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start relative"
                                    >
                                        {/* Vertical Index Number (Desktop) */}
                                        <div className="hidden lg:block absolute -left-32 top-0 mt-2">
                                            <span className="font-mono text-[100px] font-black text-white/[0.03] leading-none select-none">
                                                {(i + 1).toString().padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Info Column (Sticky on Desktop) */}
                                        <div className="lg:col-span-5 lg:sticky lg:top-48 space-y-10 md:space-y-16 lg:pb-20">
                                            <div className="space-y-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                        {getIcon(c.category)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary/40 font-bold italic leading-none mb-2">Case Study</span>
                                                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2F0E9]/60 font-bold">{c.tag}</span>
                                                    </div>
                                                </div>
                                                <h2 className="font-sans font-bold text-[#F2F0E9] text-h2 leading-tight">
                                                    {c.title}
                                                </h2>
                                            </div>

                                            <div className="space-y-12">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                                        <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/40 font-black italic">Situatie</h4>
                                                    </div>
                                                    <p className="font-sans text-[#F2F0E9]/85 text-lg md:text-xl font-light italic leading-[1.8] pl-4">
                                                        {c.situatie}
                                                    </p>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                                        <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/40 font-black italic">Aanpak</h4>
                                                    </div>
                                                    <p className="font-sans text-[#F2F0E9]/85 text-lg md:text-xl font-light italic leading-[1.8] pl-4">
                                                        {c.aanpak}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-6 pt-8 border-t border-white/5">
                                                <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-black italic">Kernresultaten</h4>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {c.results?.map((r, ri) => (
                                                        <motion.div
                                                            key={ri}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: ri * 0.1 }}
                                                            className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group/res shadow-sm hover:border-white/10 transition-colors"
                                                        >
                                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/res:bg-primary/20 transition-colors">
                                                                <Zap size={12} className="text-primary" />
                                                            </div>
                                                            <span className="font-sans text-[#F2F0E9]/80 text-sm md:text-base font-medium italic">{r}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visuals Column */}
                                        <div className="lg:col-span-7 space-y-12 md:space-y-20 pt-4 lg:pt-0">
                                            {c.caseUrl ? (
                                                <a
                                                    href={c.caseUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block relative group/visual"
                                                >
                                                    <div className="relative w-full aspect-[16/10] bg-[#1A1A1A] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden group/mockup">
                                                        <img
                                                            src={urlFor(c.image)?.url()}
                                                            alt={c.title}
                                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/visual:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                                                        {/* External link indicator */}
                                                        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                                            <ArrowRight className="-rotate-45" size={20} />
                                                        </div>
                                                    </div>
                                                    <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover/visual:opacity-100 transition-opacity duration-1000" />
                                                </a>
                                            ) : (
                                                <div className="relative group/visual">
                                                    <div className="relative w-full aspect-[16/10] bg-[#1A1A1A] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
                                                        <img
                                                            src={urlFor(c.image)?.url()}
                                                            alt={c.title}
                                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/visual:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                                                    </div>
                                                    <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover/visual:opacity-100 transition-opacity duration-1000" />
                                                </div>
                                            )}

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className="px-8 md:px-12 py-10 rounded-[2.5rem] bg-[#1A1A1A]/20 border border-white/5 text-[#F2F0E9] space-y-8 relative overflow-hidden group/quote transition-all duration-700 hover:bg-[#1A1A1A]/40 shadow-sm"
                                            >
                                                <p className="text-lg md:text-2xl font-sans font-medium leading-[1.6] tracking-tight relative z-10 italic text-[#F2F0E9]/90">
                                                    "{c.quote}"
                                                </p>
                                                <div className="flex items-center justify-between relative z-10 pt-6 border-t border-white/5">
                                                    <div className="flex items-center gap-4">
                                                        {c.authorImage ? (
                                                            <img
                                                                src={urlFor(c.authorImage).width(80).height(80).url()}
                                                                alt={`Review van ${c.author} over Merlign`}
                                                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-primary/20"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center font-mono text-sm uppercase font-black italic text-primary group-hover/quote:bg-primary/10 transition-colors">
                                                                {c.author?.charAt?.(0) || 'M'}
                                                            </div>
                                                        )}
                                                        <div className="space-y-0.5">
                                                            <p className="font-mono text-[10px] uppercase tracking-[0.4em] font-black text-primary leading-none">{c.author || 'Merlign client'}</p>
                                                        </div>
                                                    </div>

                                                    {c.clientLogo && (
                                                        c.logoUrl ? (
                                                            <a href={c.logoUrl} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-110">
                                                                <img
                                                                    src={urlFor(c.clientLogo).height(120).url()}
                                                                    alt={`Logo ${c.title}`}
                                                                    className="h-8 md:h-12 w-auto object-contain opacity-30 grayscale group-hover/quote:opacity-80 group-hover/quote:grayscale-0 transition-all duration-700"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <img
                                                                src={urlFor(c.clientLogo).height(120).url()}
                                                                alt={`Logo ${c.title}`}
                                                                className="h-8 md:h-12 w-auto object-contain opacity-30 grayscale group-hover/quote:opacity-80 group-hover/quote:grayscale-0 transition-all duration-700"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Bottom CTA */}
                            <div id="contact" className="py-20 md:py-32 border-t border-white/5 flex flex-col items-center text-center">
                                <SectionLabel className="md:justify-center">Volgende succes</SectionLabel>
                                <h2 className="font-sans font-bold text-[#F2F0E9] mt-8 text-h2">
                                    Jouw bedrijf <span className="text-primary font-drama font-normal text-h2-serif">hier?</span>
                                </h2>
                                <p className="font-sans text-[#F2F0E9]/85 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl">
                                    Plan een gratis check. In 20 minuten weet je wat ik voor jou kan doen.
                                </p>
                                <ContactForm />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cases;
