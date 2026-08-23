import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Layout as LayoutIcon, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { getCases, urlFor, getCasesPageData } from '../lib/sanity';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const getIcon = (category) => {
    switch (category) {
        case 'websites': return <LayoutIcon size={16} />;
        case 'dashboards': return <Database size={16} />;
        default: return <Zap size={16} />;
    }
};

const filterOptions = [
    { id: 'alle', label: 'Alle Cases' },
    { id: 'websites', label: 'Websites' },
    { id: 'dashboards', label: 'Dashboards' },
    { id: 'automatiseringen', label: 'Automatiseringen' }
];

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

    const filteredCases = cases.filter(c =>
        selectedFilter === 'alle' || c?.category === selectedFilter
    );

    return (
        <div className="bg-[var(--background)] min-h-screen">
            <SEO
                title="Cases & resultaten | webdesign en automatisering | Merlign"
                description="Bekijk echte resultaten van ZZP'ers en MKB-ondernemers die ik hielp met een nieuwe website of automatisering. Van meer leads tot minder handwerk — concrete resultaten, geen mooie verhalen."
                path="/cases"
            />
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-[var(--background)] z-[200] flex items-center justify-center"
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
                        {/* Background */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                            <div className="absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" />
                            <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" />
                        </div>

                        <div className="content-max-width section-px space-y-16 md:space-y-24 relative z-10">
                            {/* Hero */}
                            <motion.div
                                initial="initial"
                                animate="whileInView"
                                className="max-w-5xl space-y-8 md:space-y-12"
                            >
                                <Breadcrumb items={[{ label: 'Cases' }]} />
                                <SectionLabel>Cases</SectionLabel>
                                <motion.h1
                                    variants={fadeUp}
                                    className="font-sans font-bold text-[var(--text)] text-h1"
                                >
                                    {pageData?.headlineSans || "Geen mooie praatjes,"}{' '}
                                    <span className="text-primary font-drama font-normal text-h1-serif">
                                        {pageData?.headlineSerif || "gewoon resultaten."}
                                    </span>
                                </motion.h1>
                                <motion.p variants={fadeUp} className="font-sans text-[var(--text)]/85 text-lg md:text-xl font-light italic leading-[1.8] max-w-2xl">
                                    {pageData?.subtitle || "Wat ik heb gebouwd en welk meetbaar resultaat dat heeft opgeleverd."}
                                </motion.p>

                                {/* Filter Bar */}
                                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 md:gap-8 pt-4">
                                    <div className="flex flex-wrap gap-2 md:gap-4 bg-[var(--text)]/[0.04] p-2 rounded-[1.5rem] border border-[var(--border)] backdrop-blur-xl">
                                        {filterOptions.map((option) => {
                                            const count = option.id === 'alle'
                                                ? cases.length
                                                : cases.filter(c => c.category === option.id).length;
                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => setSelectedFilter(option.id)}
                                                    className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-sans text-sm md:text-base font-bold transition-all duration-500 relative overflow-hidden group hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] ${selectedFilter === option.id ? 'text-white' : 'text-[var(--text)]/40 hover:text-[var(--text)]'}`}
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
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Card Grid */}
                            <motion.div
                                key={selectedFilter}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            >
                                {filteredCases.map((c, i) => (
                                    <motion.div
                                        key={c._id || i}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ delay: i * 0.06 }}
                                    >
                                        <Link
                                            to={`/cases/${c._id}`}
                                            className="group flex flex-col rounded-[2rem] overflow-hidden border border-[var(--border)] bg-[var(--paper)]/20 hover:bg-[var(--paper)]/40 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                                        >
                                            {/* Image */}
                                            <div className="aspect-[16/10] overflow-hidden bg-[var(--paper)]/40 shrink-0">
                                                {c.image ? (
                                                    <img
                                                        src={urlFor(c.image).width(800).url()}
                                                        alt={c.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                                                        <div className="text-primary/20">{getIcon(c.category)}</div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-7 md:p-8 space-y-4 flex flex-col flex-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                                        {getIcon(c.category)}
                                                        <span className="text-xs font-bold">{c.tag || c.category}</span>
                                                    </div>
                                                </div>

                                                <h2 className="font-sans font-bold text-[var(--text)] text-xl md:text-2xl tracking-tighter leading-tight">
                                                    {c.title}
                                                </h2>

                                                <div className="flex-1" />

                                                <div className="flex items-center gap-2 text-primary/50 group-hover:text-primary transition-colors duration-300 pt-2">
                                                    <span className="font-sans text-sm font-bold">Bekijk case</span>
                                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Bottom CTA */}
                            <div id="contact" className="py-20 md:py-32 border-t border-[var(--border)] flex flex-col items-center text-center">
                                <h2 className="font-sans font-bold text-[var(--text)] mt-8 text-h2">
                                    Jouw bedrijf <span className="text-primary font-drama font-normal text-h2-serif">hier?</span>
                                </h2>
                                <p className="font-sans text-[var(--text)]/85 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl">
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
