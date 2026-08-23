import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Layout as LayoutIcon, Database } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ContactForm from '../components/ContactForm';
import { getCaseById, urlFor } from '../lib/sanity';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const getIcon = (category) => {
    switch (category) {
        case 'websites': return <LayoutIcon size={20} />;
        case 'dashboards': return <Database size={20} />;
        default: return <Zap size={20} />;
    }
};

const CaseDetail = () => {
    const { id } = useParams();
    const [c, setC] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getCaseById(id).then(data => {
            setC(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-[var(--background)] z-[200] flex items-center justify-center">
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 border border-primary/20 rounded-full"
                />
            </div>
        );
    }

    if (!c) {
        return (
            <div className="pt-40 pb-32 content-max-width section-px text-center">
                <p className="text-[var(--text)]/60">Case niet gevonden.</p>
                <Link to="/cases" className="mt-8 inline-flex items-center gap-2 text-primary font-bold">
                    <ArrowLeft size={16} /> Terug naar cases
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[var(--background)] min-h-screen">
            <SEO
                title={`${c.title} | Case | Merlign`}
                description={c.situatie || ''}
                path={`/cases/${id}`}
            />

            <div className="pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <div className="absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" />
                </div>

                <div className="content-max-width section-px relative z-10 space-y-20 md:space-y-32">
                    {/* Header */}
                    <motion.div initial="initial" animate="whileInView" className="space-y-8 max-w-4xl">
                        <Breadcrumb items={[{ label: 'Cases', href: '/cases' }, { label: c.title }]} />

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                {getIcon(c.category)}
                            </div>
                            <span className="font-sans text-sm font-bold text-primary/70">{c.tag}</span>
                        </div>

                        <motion.h1 variants={fadeUp} className="font-sans font-bold text-[var(--text)] text-h1 tracking-tighter leading-tight">
                            {c.title}
                        </motion.h1>
                    </motion.div>

                    {/* Hero image */}
                    {c.image && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full rounded-[2rem] overflow-hidden border border-[var(--border)] shadow-2xl"
                        >
                            {c.caseUrl ? (
                                <a href={c.caseUrl} target="_blank" rel="noopener noreferrer" className="block w-full group">
                                    <img
                                        src={urlFor(c.image).width(1600).url()}
                                        alt={c.title}
                                        className="w-full h-auto group-hover:scale-105 transition-transform duration-1000 origin-center"
                                    />
                                </a>
                            ) : (
                                <img
                                    src={urlFor(c.image).width(1600).url()}
                                    alt={c.title}
                                    className="w-full h-auto"
                                />
                            )}
                        </motion.div>
                    )}

                    {/* Situatie + Aanpak */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                        <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-primary" />
                                <h2 className="font-sans text-base font-bold text-primary/60">Situatie</h2>
                            </div>
                            <p className="font-sans text-[var(--text)]/85 text-lg md:text-xl font-light italic leading-[1.8]">
                                {c.situatie}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-primary" />
                                <h2 className="font-sans text-base font-bold text-primary/60">Aanpak</h2>
                            </div>
                            <p className="font-sans text-[var(--text)]/85 text-lg md:text-xl font-light italic leading-[1.8]">
                                {c.aanpak}
                            </p>
                        </motion.div>
                    </div>

                    {/* Results */}
                    {c.results?.length > 0 && (
                        <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-primary" />
                                <h2 className="font-sans text-base font-bold text-primary/60">Resultaten</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {c.results.map((r, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--text)]/[0.02] border border-[var(--border)]"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Zap size={12} className="text-primary" />
                                        </div>
                                        <span className="font-sans text-[var(--text)]/80 text-sm md:text-base font-medium italic">{r}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Quote — only if review exists */}
                    {c.quote && (
                        <motion.div
                            variants={fadeUp}
                            initial="initial"
                            whileInView="whileInView"
                            className="px-8 md:px-16 py-12 md:py-16 rounded-[2.5rem] bg-[var(--paper)]/40 border border-[var(--border)] space-y-8"
                        >
                            <p className="text-xl md:text-3xl font-sans font-medium leading-[1.6] tracking-tight italic text-[var(--text)]/90">
                                "{c.quote}"
                            </p>
                            <div className="flex items-center gap-4 pt-6 border-t border-[var(--border)]">
                                {c.authorImage ? (
                                    <img
                                        src={urlFor(c.authorImage).width(80).height(80).url()}
                                        alt={c.author}
                                        className="w-12 h-12 rounded-full object-cover border border-primary/20"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center font-sans text-sm font-bold text-primary">
                                        {c.author?.charAt(0) || 'M'}
                                    </div>
                                )}
                                <p className="font-sans text-base font-bold text-primary">{c.author}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* CTA */}
                    <div id="contact" className="border-t border-[var(--border)] pt-20 flex flex-col items-center text-center">
                        <h2 className="font-sans font-bold text-[var(--text)] text-h2">
                            Jouw bedrijf <span className="text-primary font-drama font-normal text-h2-serif">hier?</span>
                        </h2>
                        <p className="font-sans text-[var(--text)]/40 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl">
                            Plan een gratis check. In 20 minuten weet je wat ik voor jou kan doen.
                        </p>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseDetail;
