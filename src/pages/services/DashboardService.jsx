import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, MousePointerClick, Activity, Search, Database, Layout, ChevronDown } from 'lucide-react';
import SectionLabel from '../../components/SectionLabel';
import ContactForm from '../../components/ContactForm';
import { Link } from 'react-router-dom';

import { getServicePageData } from '../../lib/sanity';
import SEO from '../../components/SEO';

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

const DashboardService = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getServicePageData('Dashboard');
                setData(res);
            } catch (err) {
                console.error("Dashboard Service Fetch Error:", err);
            }
        };
        fetchData();
    }, []);

    const heroSans = data?.heroSans || "Stop met gokken.";
    const heroSerif = data?.heroSerif || "Begin met sturen op cijfers.";
    const heroSubtitle = data?.heroSubtitle || "Ik bouw een dashboard dat al je belangrijkste cijfers op één plek zet. Altijd inzichtelijk, op je telefoon of laptop.";

    const staticFeatures = [
        { title: "Alles op één plek", desc: "Omzet, leads, websitebezoek, advertentiekosten. Niet meer schakelen tussen tools. Eén scherm, alles erin." },
        { title: "Altijd bij de hand", desc: "Op je laptop, telefoon of tablet. Je ziet in één oogopslag hoe het ervoor staat zonder in te loggen op vijf verschillende systemen." },
        { title: "Gebouwd op jouw data", desc: "Ik koppel de tools die jij al gebruikt. Geen gedoe met migraties of nieuwe software." },
        { title: "Simpel te begrijpen", desc: "Geen ingewikkelde grafieken. Alleen wat jij nodig hebt om snel een beslissing te nemen." }
    ];

    const features = data?.features?.length > 0 ? data.features.map((f, i) => ({
        title: f.title || staticFeatures[i]?.title,
        desc: f.description || staticFeatures[i]?.desc
    })) : staticFeatures;

    const staticProcess = [
        { step: "01", title: "Gratis check", desc: "We kijken samen welke cijfers voor jou het meest relevant zijn en welke tools je al gebruikt. 20 minuten, geen verplichtingen.", icon: <Search size={24} /> },
        { step: "02", title: "Bouw en koppeling", desc: "Ik bouw het dashboard en koppel je databronnen. Jij hoeft niks te doen behalve feedback geven op het ontwerp.", icon: <Database size={24} /> },
        { step: "03", title: "Klaar voor gebruik", desc: "Je krijgt toegang, een korte uitleg en je bent klaar. Vanaf dat moment stuur je op feiten in plaats van gevoel.", icon: <Layout size={24} /> }
    ];

    const processItems = data?.processSteps?.length > 0 ? data.processSteps.map((p, i) => ({
        ...staticProcess[i],
        step: p.stepNumber || staticProcess[i]?.step,
        title: p.title || staticProcess[i]?.title,
        desc: p.description || staticProcess[i]?.desc
    })) : staticProcess;

    return (
        <div className="bg-[#0A0A0A] min-h-screen">
            <SEO
                title="Business dashboards & data inzicht"
                description="Stop met gissen naar je cijfers. Ik bouw dashboards die al je data van Ads, CRM en Sales samenbrengen in één duidelijk overzicht."
                path="/dashboard"
            />
            <AnimatePresence mode="wait">
                {!data ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-[#0A0A0A] z-[100] flex items-center justify-center"
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
                        transition={{ duration: 1 }}
                    >
                        <div className="pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden">
                            {/* Background Effects */}
                            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                                <div className="absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" />
                                <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" />
                            </div>

                            <div className="content-max-width section-px space-y-20 md:space-y-40 relative z-10">
                                {/* Hero Section */}
                                <motion.div
                                    initial="initial"
                                    whileInView="whileInView"
                                    viewport={{ once: true }}
                                    className="max-w-5xl space-y-8 md:space-y-12"
                                >
                                    <SectionLabel>Dashboard</SectionLabel>
                                    <motion.h1
                                        variants={fadeUp}
                                        className="font-sans font-bold text-[#F2F0E9] text-h1"
                                    >
                                        {heroSans}{' '}
                                        <span className="text-primary font-drama font-normal text-h1-serif">{heroSerif}</span>
                                    </motion.h1>
                                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/85 text-lg md:text-xl font-light italic leading-[1.8] max-w-2xl whitespace-pre-wrap">
                                        {heroSubtitle}
                                    </motion.p>
                                    <motion.div variants={fadeUp} className="pt-4 text-left">
                                        <a href="#contact" className="btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">Vraag een gratis check aan</span>
                                            <div className="btn-bg bg-[#F2F0E9]" />
                                        </a>
                                    </motion.div>
                                </motion.div>

                                {/* Why Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                                    <div className="space-y-10 md:space-y-16 order-2 lg:order-1">
                                        <div className="space-y-6 md:space-y-10">
                                            <h2 className="font-sans font-bold text-[#F2F0E9] text-h2">
                                                {data?.whyHeadlineSans || "Waarom ondernemers zonder"}{' '}
                                                <span className="text-primary font-drama font-normal text-h2-serif">{data?.whyHeadlineSerif || "dashboard geld laten liggen."}</span>
                                            </h2>
                                            <p className="font-sans text-[#F2F0E9]/85 text-lg md:text-2xl font-light italic leading-[1.8] whitespace-pre-wrap">
                                                {data?.whySubtitle || "Je kunt je bedrijf niet sturen als je niet weet wat er gebeurt. Een dashboard geeft je in één oogopslag wat je nodig hebt om de juiste beslissingen te nemen."}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                            {features.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="space-y-4"
                                                >
                                                    <h4 className="text-lg md:text-xl font-sans font-bold text-[#F2F0E9] tracking-tighter">{item.title}</h4>
                                                    <p className="font-sans text-[#F2F0E9]/85 leading-[1.8] italic text-sm md:text-base whitespace-pre-wrap">{item.desc}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="aspect-square bg-[#1A1A1A]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden flex items-center justify-center p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-1000 order-1 lg:order-2"
                                    >
                                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 opacity-30" />
                                        <div className="w-full h-auto border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-8 md:p-12 space-y-10 md:space-y-16 relative group hover:border-primary/20 transition-all duration-1000">
                                            <div className="flex justify-between items-center">
                                                <div className="h-6 w-32 md:w-48 bg-white/5 rounded-full" />
                                                <Activity size={24} className="text-primary animate-pulse" />
                                            </div>
                                            <div className="flex items-end gap-2 md:gap-3 h-32 md:h-64">
                                                {[30, 60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, height: 0 }}
                                                        whileInView={{ opacity: 1, height: `${h}%` }}
                                                        transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                                                        className="flex-grow bg-primary/10 hover:bg-primary transition-all duration-700 rounded-t-xl group/bar relative border-t border-primary/20"
                                                    >
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-mono font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                                            {h}%
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/5 pt-10">
                                                <div className="space-y-3">
                                                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                                    <div className="h-4 w-full bg-primary/20 rounded-full" />
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                                    <div className="h-4 w-full bg-white/5 rounded-full" />
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                                    <div className="h-4 w-full bg-white/5 rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Process Section */}
                                <div className="space-y-16 md:space-y-24">
                                    <div className="text-center space-y-8">
                                        <SectionLabel className="justify-center">Hoe het werkt</SectionLabel>
                                        <h2 className="font-sans font-bold text-[#F2F0E9] text-h2">
                                            Zo werkt <span className="text-primary font-drama font-normal text-h2-serif">het.</span>
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                                        {processItems.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                className="p-10 rounded-[2.5rem] bg-[#1A1A1A]/40 border border-white/5 space-y-8 group hover:bg-[#1A1A1A]/60 transition-all duration-700"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3">
                                                        {React.cloneElement(item.icon, { className: "group-hover:scale-110 transition-transform duration-500" })}
                                                    </div>
                                                    <span className="font-mono text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors uppercase italic">{item.step}</span>
                                                </div>
                                                <div className="space-y-4">
                                                    <h3 className="text-xl md:text-2xl font-sans font-bold text-[#F2F0E9] tracking-tighter">{item.title}</h3>
                                                    <p className="font-sans text-[#F2F0E9]/85 leading-[1.8] italic">{item.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <FAQ cmsFaqs={data?.faqs} />
                                {/* Bottom CTA */}
                                <div id="contact" className="py-20 md:py-32 border-t border-white/5 flex flex-col items-center">
                                    <motion.div
                                        initial="initial"
                                        whileInView="whileInView"
                                        viewport={{ once: true }}
                                        variants={staggerContainer}
                                        className="text-left md:text-center space-y-10 md:space-y-16 mb-16 md:mb-24 w-full"
                                    >
                                        <SectionLabel className="md:justify-center">Start Vandaag</SectionLabel>
                                        <a href="#contact" className="group flex flex-col items-center">
                                            <h2 className="font-sans font-bold text-[#F2F0E9] md:text-center text-h2">
                                                {data?.ctaHeadlineSans || "Klaar om te"}{' '}
                                                <span className="text-primary font-drama font-normal text-h2-serif">{data?.ctaHeadlineSerif || "sturen op cijfers?"}</span>
                                            </h2>
                                        </a>
                                        <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light leading-[1.8] italic max-w-3xl mx-auto border-b-2 border-white/5 pb-10 md:pb-12 text-center">
                                            {data?.ctaSubtitle || "Vraag een gratis check aan. In 20 minuten weet je wat een dashboard jou oplevert."}
                                        </motion.p>
                                    </motion.div>

                                    <ContactForm selectedUpgrade="dashboard" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = ({ cmsFaqs }) => {
    const staticQuestions = [
        {
            q: "Welke systemen kun je koppelen aan een dashboard?",
            a: "Vrijwel alles met een API. Denk aan Google Ads, Facebook Ads, CRM-systemen (HubSpot, Pipedrive), boekhoudsoftware (Exact, Moneybird) en natuurlijk je eigen website-data."
        },
        {
            q: "Is mijn data veilig in het dashboard?",
            a: "Absoluut. Ik bouw dashboards die direct verbinding maken met jouw bronnen via beveiligde versleutelde verbindingen. Je behoudt volledige controle over wie toegang heeft."
        },
        {
            q: "Kan ik het dashboard delen met mijn team?",
            a: "Ja. Je kunt specifieke toegangsrechten instellen zodat je teamleden alleen de data zien die voor hen relevant is, zonder dat ze toegang nodig hebben tot de bronbestanden."
        },
        {
            q: "Wordt de data automatisch ververst?",
            a: "Zeker. Afhankelijk van de bron wordt de data real-time of met een vaste interval (bijv. elk uur) ververst. Je kijkt dus nooit naar verouderde cijfers."
        },
        {
            q: "Hoe zit het met support en onderhoud voor mijn dashboard?",
            a: "Elk dashboard is custom codeerwerk van de bovenste plank. Omdat ik elke regel zelf schrijf, is support bliksemsnel en de onderhoudskosten extreem laag. Je betaalt niet voor overhead, maar voor een systeem dat simpelweg blijft draaien."
        }
    ];

    const questions = cmsFaqs?.length > 0 ? cmsFaqs.map(f => ({
        q: f.question,
        a: f.answer
    })) : staticQuestions;

    const [openIndex, setOpenIndex] = React.useState(0);

    return (
        <section className="py-20 md:py-32 border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-6">
                    <SectionLabel>FAQ</SectionLabel>
                    <h2 className="font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-h2">
                        Veelgestelde vragen over <span className="text-primary font-drama font-normal text-h2-serif">dashboards.</span>
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
                                        <div className="px-6 pb-6 text-[#F2F0E9]/85 text-base font-sans font-light italic border-t border-white/5 pt-4 whitespace-pre-wrap">
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

export default DashboardService;
