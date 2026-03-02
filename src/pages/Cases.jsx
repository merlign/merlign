import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquare, Target, Clock, Zap, Layout as LayoutIcon, Database, Filter } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';
import { BrowserMockup, DashboardMockup, AutomationMockup } from '../components/CaseMockup';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const Cases = () => {
    const [selectedFilter, setSelectedFilter] = useState('alle');

    const cases = [
        {
            name: "Ferry Zorgt",
            tag: "Website",
            category: "websites",
            icon: <LayoutIcon size={24} />,
            situatie: "Ferry is zorgverlener en had een verouderde website die niet de professionaliteit uitstraalde die hij zijn klanten biedt. Potentiële klanten haakten af voor ze contact opnamen.",
            aanpak: "Ik bouwde een nieuwe website die het vertrouwen uitstraalt dat zijn klanten nodig hebben om de stap te zetten. Helder, warm, en strategisch opgebouwd om bezoekers te overtuigen.",
            results: ["Live in 72u", "SEO geoptimaliseerd", "Hogere conversie"],
            quote: "Ik schaamde me voor mijn oude website. Nu stuur ik hem trots door.",
            author: "Ferry, Ferry Zorgt",
            img: "https://merlign.com/wp-content/uploads/2026/03/Screenshot-2026-03-02-at-21.31.03-scaled.png"
        },
        {
            name: "Social Manners",
            tag: "Dashboard",
            category: "dashboards",
            icon: <Database size={24} />,
            situatie: "Social Manners is een social media bureau dat voor meerdere klanten tegelijk werkt. Ze hadden geen overzicht van de prestaties per klant en moesten alles handmatig uit verschillende tools halen.",
            aanpak: "Ik bouwde een dashboard dat alle klantdata op één plek toont. Bereik, engagement, groei per platform, alles zichtbaar in één overzicht. Het team bespaart nu uren per week aan rapportages.",
            results: ["Data gecentraliseerd", "Uren besparing", "Real-time inzicht"],
            quote: "We besteden nu geen tijd meer aan rapporten. We besteden die tijd aan onze klanten.",
            author: "Team Social Manners",
            img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
        },
        {
            name: "EcoLogistics",
            tag: "Automatisering",
            category: "automatiseringen",
            icon: <Zap size={24} />,
            situatie: "EcoLogistics verwerkte honderden facturen en pakbonnen handmatig per week. Dit leidde tot fouten en een enorme administratieve last voor het team.",
            aanpak: "Ik implementeerde een AI-gestuurde automatisering die documenten uitleest, controleert en direct in hun boekhoudsysteem zet. Geen menselijke tussenkomst meer nodig voor 90% van de document-flow.",
            results: ["90% Automatisering", "Nul fout marge", "40u p/week winst"],
            quote: "Het voelt alsof we een extra werknemer hebben die nooit slaapt.",
            author: "Directie EcoLogistics",
            img: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    const filteredCases = selectedFilter === 'alle'
        ? cases
        : cases.filter(c => c.category === selectedFilter);

    const filterOptions = [
        { id: 'alle', label: 'Alle Cases' },
        { id: 'websites', label: 'Websites' },
        { id: 'dashboards', label: 'Dashboards' },
        { id: 'automatiseringen', label: 'Automatiseringen' }
    ];

    return (
        <div className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-8 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Artifacts */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-8 md:px-20 space-y-20 md:space-y-40 relative z-10">
                {/* Hero */}
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="space-y-8 md:space-y-12"
                >
                    <SectionLabel>Cases</SectionLabel>
                    <motion.h1
                        variants={fadeUp}
                        className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold leading-[1.1] text-[#F2F0E9] tracking-tighter"
                    >
                        Geen mooie praatjes. <br />
                        <span className="text-primary font-drama font-normal inline-block align-baseline mt-6 leading-[1.1] text-3xl md:text-5xl lg:text-[58px]">Gewoon resultaten.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-4xl border-l-[3px] border-primary/20 pl-8 md:pl-12">
                        Wat ik heb gebouwd en welk meetbaar resultaat dat heeft opgeleverd.
                    </motion.p>

                    {/* Filter Bar */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center gap-4 md:gap-8 pt-4"
                    >
                        <div className="flex flex-wrap gap-2 md:gap-4 bg-[#F2F0E9]/5 p-2 rounded-[1.5rem] border border-white/5 backdrop-blur-xl">
                            {filterOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setSelectedFilter(option.id)}
                                    className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-500 relative overflow-hidden group ${selectedFilter === option.id ? 'text-black' : 'text-[#F2F0E9]/40 hover:text-[#F2F0E9]'}`}
                                >
                                    <span className="relative z-10">{option.label}</span>
                                    {selectedFilter === option.id && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-primary"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Case List */}
                <div className="space-y-32 md:space-y-64 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-32 md:space-y-64"
                        >
                            {filteredCases.map((c, i) => (
                                <motion.div
                                    key={c.name}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start group"
                                >
                                    <div className="lg:col-span-5 space-y-10 md:space-y-16">
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                    {c.icon}
                                                </div>
                                                <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary font-bold italic">{c.tag}</span>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] tracking-tighter leading-[1.1]">{c.name}</h2>
                                        </div>

                                        <div className="space-y-10">
                                            <div className="space-y-4">
                                                <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/20 font-black italic">Situatie</h4>
                                                <p className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed border-l-[3px] border-primary/20 pl-8 md:pl-12">{c.situatie}</p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/20 font-black italic">Aanpak</h4>
                                                <p className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed border-l-[3px] border-primary/20 pl-8 md:pl-12">{c.aanpak}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/20 font-black italic">Resultaten</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {c.results.map((r, ri) => (
                                                    <span
                                                        key={ri}
                                                        className="px-6 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-500 hover:bg-primary/20 hover:border-primary/40 shadow-sm"
                                                    >
                                                        <Zap size={14} className="animate-pulse" />
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-7 space-y-12 md:space-y-20">
                                        {c.category === 'websites' && <BrowserMockup image={c.img} title={c.name} />}
                                        {c.category === 'dashboards' && <DashboardMockup image={c.img} title={c.name} />}
                                        {c.category === 'automatiseringen' && <AutomationMockup title={c.name} />}

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="px-8 md:px-12 py-10 rounded-[2.5rem] bg-[#1A1A1A]/20 border border-white/5 text-[#F2F0E9] space-y-8 relative overflow-hidden group/quote transition-all duration-700 hover:bg-[#1A1A1A]/40 shadow-sm"
                                        >
                                            <MessageSquare className="absolute top-8 right-8 w-12 h-12 text-primary/10 -rotate-12 group-hover/quote:rotate-0 transition-all duration-700" />
                                            <p className="text-lg md:text-xl font-sans font-medium leading-relaxed tracking-tight relative z-10 italic text-[#F2F0E9]/60">
                                                "{c.quote}"
                                            </p>
                                            <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-white/5">
                                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-mono text-[10px] uppercase font-black italic text-primary/40">
                                                    {c.author.charAt(0)}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-mono text-[9px] uppercase tracking-[0.4em] font-black text-primary">{c.author}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom CTA */}
                <div className="py-20 md:py-32 border-t border-white/5 flex flex-col items-center text-center">
                    <SectionLabel className="md:justify-center">Volgende succes</SectionLabel>
                    <h2 className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter mt-8">
                        Jouw bedrijf <span className="text-primary font-drama font-normal italic inline-block align-baseline leading-[1.1] text-3xl md:text-5xl lg:text-[58px]">hier?</span>
                    </h2>
                    <p className="font-sans text-[#F2F0E9]/40 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl">
                        Plan een gratis check. In 20 minuten weet je wat ik voor jou kan doen.
                    </p>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default Cases;
