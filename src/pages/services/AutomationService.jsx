import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Settings, Cpu, Zap, Check, ChevronDown } from 'lucide-react';
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

const AutomationService = () => {
    const [data, setData] = React.useState(null);
    const [openFaq, setOpenFaq] = React.useState(0);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getServicePageData('Automatisering');
                setData(res);
            } catch (err) {
                console.error("Automation Service Fetch Error:", err);
            }
        };
        fetchData();
    }, []);

    const heroSans = data?.heroSans || "Automatiseer alsof er";
    const heroSerif = data?.heroSerif || "10 extra mensen werken.";
    const heroSubtitle = data?.heroSubtitle || "Ik automatiseer de repetitieve taken in jouw bedrijf. Van leadopvolging tot administratie. Jij besteedt je tijd aan wat telt.";

    const staticFeatures = [
        { title: "Leadopvolging op autopilot", desc: "Iemand vult je contactformulier in. Automatisch krijgt hij een bevestiging, een herinnering en een follow-up. Zonder dat jij er aan denkt." },
        { title: "Tools die samenwerken", desc: "Ik koppel je bestaande tools aan elkaar zodat data automatisch doorstroomt. Geen handmatig overzetten meer." },
        { title: "Administratie die zelf doet", desc: "Van factuurverwerking tot rapportages. Ik bouw de workflows die jou uren per week teruggeven." },
        { title: "Schaalbaar zonder extra mensen", desc: "Je bedrijf kan groeien zonder dat je er meteen iemand voor hoeft aan te nemen. De automatisering schaalt mee." }
    ];

    const features = data?.features?.length > 0 ? data.features.map((f, i) => ({
        title: f.title || staticFeatures[i]?.title,
        desc: f.description || staticFeatures[i]?.desc
    })) : staticFeatures;

    const staticProcess = [
        { step: "01", title: "Gratis check", desc: "We kijken samen welke taken je nu handmatig doet en hoeveel tijd dat kost. Ik geef je direct een eerlijk beeld van wat er mogelijk is.", icon: <Search size={24} /> },
        { step: "02", title: "Bouw en test", desc: "Ik bouw de automatisering, test hem grondig en koppel hem aan je bestaande tools. Jij hoeft niks te doen.", icon: <Settings size={24} /> },
        { step: "03", title: "Live en op de achtergrond", desc: "Zodra het live staat, loopt het. Je hoeft er niet meer naar om te kijken. Het werk wordt gedaan terwijl jij onderneemt.", icon: <Cpu size={24} /> }
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
                title={data?.seoTitle || "AI & workflow automatisering"}
                description={data?.seoDescription || "Bespaar uren per week door saaie taken te automatiseren. Ik bouw slimme koppelingen met AI zodat jij en je team weer echt werk kunnen doen."}
                path="/automatisering"
            />
            <AnimatePresence mode="wait">
                {!data ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-[#0A0A0A] z-[100] flex items-center justify-center page-loader"
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
                            {/* Background Artifacts */}
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
                                    <SectionLabel>Automatisering</SectionLabel>
                                    <motion.h1
                                        variants={fadeUp}
                                        className="font-sans font-bold text-[#F2F0E9] text-h1"
                                    >
                                        {heroSans}{' '}
                                        <span className="text-primary font-drama font-normal text-h1-serif">{heroSerif}</span>
                                    </motion.h1>
                                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light italic leading-[1.8] max-w-2xl">
                                        {heroSubtitle}
                                    </motion.p>
                                    <motion.div variants={fadeUp} className="pt-4">
                                        <a href="#contact" className="btn-magnetic group flex md:inline-flex bg-primary text-white border-transparent px-8 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                            <span className="relative z-10 text-[11px] md:text-[14px] font-black italic tracking-[0.15em] md:tracking-[0.3em] uppercase">Vraag een gratis check aan</span>
                                            <div className="btn-bg bg-primary" />
                                        </a>
                                    </motion.div>
                                </motion.div>

                                {/* Benefits Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                                    <div className="space-y-10 md:space-y-16 order-2 lg:order-1">
                                        <div className="space-y-6 md:space-y-10">
                                            <h2 className="font-sans font-bold text-[#F2F0E9] text-h2">
                                                {data?.whyHeadlineSans || "Winst in tijd"}{' '}
                                                <span className="text-primary font-drama font-normal text-h2-serif">{data?.whyHeadlineSerif || "is winst in vrijheid."}</span>
                                            </h2>
                                            <p className="font-sans text-[#F2F0E9]/85 text-base md:text-2xl font-light italic leading-[1.8]">
                                                {data?.whySubtitle || "Elke taak die je herhaalt kost tijd. Opgeteld zijn dat uren per week die je aan groei had kunnen besteden. Ik bouw de systemen die dat overnemen."}
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
                                        <div className="w-full max-w-sm border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-10 md:p-16 space-y-10 md:space-y-16 relative group hover:border-primary/20 transition-all duration-1000">
                                            {[1, 2, 3].map((_, i) => (
                                                <div key={i} className="flex items-center justify-between group/line">
                                                    <div className="flex items-center gap-6 md:gap-8">
                                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-1000 ${i === 1 ? 'text-primary bg-primary/10 shadow-lg shadow-primary/10' : 'text-[#F2F0E9]/10'}`}>
                                                            <Zap size={24} className="md:scale-125" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="h-4 w-24 md:w-32 bg-white/5 rounded-full" />
                                                            <div className="h-2 w-12 md:w-16 bg-white/5 rounded-full opacity-50" />
                                                        </div>
                                                    </div>
                                                    <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full border border-white/5 flex items-center justify-center transition-all duration-1000 ${i === 1 ? 'bg-primary border-primary scale-110 shadow-xl shadow-primary/30' : 'opacity-20 translate-x-4'}`}>
                                                        {i === 1 && <Check size={18} className="text-black md:scale-125" />}
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="pt-10 md:pt-16 border-t border-white/5 flex flex-col items-center gap-4">
                                                <div className="flex gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping delay-75" />
                                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping delay-150" />
                                                </div>
                                                <p className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-primary font-black">Running Autopilot...</p>
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
                                <div id="contact" className="py-20 md:py-32 border-t border-white/5 flex flex-col items-center text-center">
                                    <motion.div
                                        initial="initial"
                                        whileInView="whileInView"
                                        viewport={{ once: true }}
                                        variants={staggerContainer}
                                        className="text-center space-y-10 md:space-y-16 mb-16 md:mb-24 w-full"
                                    >
                                        <SectionLabel className="md:justify-center">Start Vandaag</SectionLabel>
                                        <a href="#contact" className="group flex flex-col items-center">
                                            <h2 className="font-sans font-bold text-[#F2F0E9] md:text-center text-h2">
                                                {data?.ctaHeadlineSans || "Klaar om je tijd"}{' '}
                                                <span className="text-primary font-drama font-normal text-h2-serif">{data?.ctaHeadlineSerif || "terug te krijgen?"}</span>
                                            </h2>
                                        </a>
                                        <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/85 text-base md:text-xl font-light leading-[1.8] italic max-w-3xl mx-auto border-b-2 border-white/5 pb-10 md:pb-12 text-center">
                                            {data?.ctaSubtitle || "Vraag een gratis check aan. In 20 minuten weet je wat er geautomatiseerd kan worden."}
                                        </motion.p>
                                    </motion.div>

                                    <ContactForm selectedUpgrade="automation" />
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
            q: "Waarom gebruik je n8n of Make in plaats van Zapier?",
            a: "Zapier is prima voor simpele taken, maar wordt extreem duur naarmate je meer automatiseert. Ik kies vaak voor n8n of Make.com omdat deze tools veel complexere logica aankunnen en vaak 70-80% goedkoper zijn op de lange termijn. Dit betekent meer automatisering voor minder maandelijkse kosten. n8n geeft ons bovendien de vrijheid om data volledig in eigen beheer te houden op eigen servers, wat essentieel is voor AVG-gevoelige informatie."
        },
        {
            q: "Voor welke bedrijfsprocessen is AI-automatisering het meest geschikt?",
            a: "Denk aan alles waar data van plek A naar plek B moet, of waar een menselijke 'filter' tussen zit. Bijvoorbeeld: automatisch offertes genereren op basis van een formulier-inzending, het automatisch sorteren van inkomende e-mails, of het laten genereren van eerste concept-blogs door AI op basis van jouw kernwaardes. Als je een taak meer dan drie keer per week op dezelfde manier doet, kunnen we het waarschijnlijk automatiseren."
        },
        {
            q: "Hoe veilig is mijn bedrijfsdata als ik AI gebruik?",
            a: "Veiligheid is mijn hoogste prioriteit. We koppelen AI-modellen via beveiligde API-sessies (zoals OpenAI's Enterprise-tier) waarbij jouw data niet wordt gebruikt om hun modellen te trainen. Je bedrijfsgeheimen blijven dus van jou. Bovendien bouwen we 'human-in-the-loop' controles in waar nodig: de AI doet het zware werk, jij geeft de definitieve klap op het resultaat."
        },
        {
            q: "Wat is de terugverdientijd (ROI) van een automatiseringstraject?",
            a: "De meeste automatiseringen die ik bouw verdienen zichzelf binnen 3 tot 6 maanden terug. Niet alleen in directe loonkosten die je bespaart, maar vooral in de foutmarge die naar 0 gaat en de snelheid waarmee je klanten kunt bedienen. Terwijl jij slaapt, blijft het systeem offertes sturen en klanten onboarden."
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
                        Veelgestelde vragen over <span className="text-primary font-drama font-normal text-h2-serif">automatisering.</span>
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
        </section >
    );
};

export default AutomationService;
