import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, MousePointerClick, Zap, Layout as LayoutIcon, Search, Settings, ChevronDown } from 'lucide-react';
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

const WebsiteService = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getServicePageData('Website');
                setData(res);
            } catch (err) {
                console.error("Website Service Fetch Error:", err);
            }
        };
        fetchData();
    }, []);

    const heroSans = data?.heroSans || "Een website die voor je werkt";
    const heroSerif = data?.heroSerif || "terwijl jij onderneemt.";
    const heroSubtitle = data?.heroSubtitle || "Niet alleen mooi. Gebouwd om bezoekers te overtuigen en te laten converteren. Klaar in 72 uur.";

    const staticFeatures = [
        { title: "Strategie voor design", desc: "Elke sectie heeft een doel. Elke zin doet werk. Ik bouw op basis van 10 jaar design-ervaring gecombineerd met funnel-denken." },
        { title: "Live in 72 uur", desc: "Geen weken wachten. Na de check ga ik aan de slag en lever ik op. Jij geeft feedback, ik pas aan, klaar." },
        { title: "SEO ingebakken", desc: "Snelle laadtijd, schone structuur, juiste titels en beschrijvingen. Je website wordt gevonden zonder dat je er extra voor hoeft te betalen." },
        { title: "Zorgeloos onderhoud", desc: "Je website blijft veilig, snel en up-to-date. Ik zorg voor de techniek op de achtergrond, zodat jij er geen omkijken naar hebt." },
        { title: "Makkelijk te beheren", desc: "Wil je toch zelf iets aanpassen? Dat kan. Ik lever met een korte uitleg zodat je zelfstandig kleine wijzigingen kunt doen." }
    ];

    const features = data?.features?.length > 0 ? data.features.map((f, i) => ({
        title: f.title || staticFeatures[i]?.title,
        desc: f.description || staticFeatures[i]?.desc
    })) : staticFeatures;

    const staticProcess = [
        { step: "01", title: "Gratis check", desc: "20 minuten. Ik kijk naar je huidige situatie, wat je wil bereiken en wat daarvoor nodig is. Geen verkooppraatje.", icon: <Search size={24} /> },
        { step: "02", title: "Bouwsprint", desc: "Ik bouw de website. Design, copy-structuur, SEO, snelheid, alles in één sprint. Jij geeft feedback als ik iets laat zien.", icon: <Zap size={24} /> },
        { step: "03", title: "Live en klaar", desc: "Je site staat live. Korte overdracht, je bent zelfstandig, en je weet dat ik op de achtergrond het onderhoud blijf doen als je dat wenst.", icon: <Check size={24} /> }
    ];

    const processItems = data?.processSteps?.length > 0 ? data.processSteps.map((p, i) => ({
        ...staticProcess[i],
        step: p.stepNumber || staticProcess[i]?.step,
        title: p.title || staticProcess[i]?.title,
        desc: p.description || staticProcess[i]?.desc
    })) : staticProcess;

    return (
        <div className="bg-[var(--background)] min-h-screen">
            <SEO
                title={data?.seoTitle || "High-end websites laten maken voor ondernemers | Merlign"}
                description={data?.seoDescription || "Ik bouw websites die niet alleen mooi zijn, maar echt voor je werken. Razendsnel, SEO-geoptimaliseerd en gericht op conversie voor mkb en zzpers."}
                path="/website"
            />
            <AnimatePresence mode="wait">
                {!data ? (
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
                                    className="max-w-5xl space-y-8 md:space-y-12 pt-12"
                                >
                                    <SectionLabel>Website</SectionLabel>
                                    <motion.h1
                                        variants={fadeUp}
                                        className="font-sans font-bold text-[var(--text)] text-h1"
                                    >
                                        {heroSans}{' '}
                                        <span className="text-primary font-drama font-normal text-h1-serif">{heroSerif}</span>
                                    </motion.h1>
                                    <motion.p variants={fadeUp} className="font-sans text-[var(--text)]/85 text-base md:text-xl font-light italic leading-[1.8] max-w-2xl">
                                        {heroSubtitle}
                                    </motion.p>
                                    <motion.div variants={fadeUp} className="pt-4 text-left">
                                        <a href="#contact" className="btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">Vraag een gratis check aan</span>
                                            <div className="btn-bg bg-primary" />
                                        </a>
                                    </motion.div>
                                </motion.div>

                                {/* Features Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                                    <div className="space-y-10 md:space-y-16 order-2 lg:order-1">
                                        <div className="space-y-6 md:space-y-10">
                                            <h2 className="font-sans font-bold text-[var(--text)] text-h2">
                                                {data?.whyHeadlineSans || "Je website is je"}{' '}
                                                <span className="text-primary font-drama font-normal text-h2-serif">{data?.whyHeadlineSerif || "digitale voordeur."}</span>
                                            </h2>
                                            <p className="font-sans text-[var(--text)]/85 text-base md:text-2xl font-light italic leading-[1.8]">
                                                {data?.whySubtitle || "Een goede website is meer dan een online visitekaartje. Het is een machine die vertrouwen bouwt en 24/7 nieuwe leads voor je binnenhaalt."}
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
                                                    <h4 className="text-lg md:text-xl font-sans font-bold text-[var(--text)] tracking-tighter">{item.title}</h4>
                                                    <p className="font-sans text-[var(--text)]/85 leading-[1.8] italic text-sm md:text-base whitespace-pre-wrap">{item.desc}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="aspect-square bg-[var(--paper)]/40 backdrop-blur-xl border border-[var(--border)] rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden flex items-center justify-center p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-1000 order-1 lg:order-2"
                                    >
                                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 opacity-30" />
                                        <div className="w-full h-full border border-[var(--border)] rounded-[2rem] md:rounded-[3rem] bg-[var(--paper)]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-8 md:p-12 space-y-8 md:space-y-12 relative group hover:border-primary/20 transition-all duration-1000">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full bg-red-400/30" />
                                                <div className="w-3 h-3 rounded-full bg-amber-400/30" />
                                                <div className="w-3 h-3 rounded-full bg-emerald-400/30" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-8 flex-grow">
                                                <div className="bg-primary/5 rounded-[1.5rem] flex items-center justify-center overflow-hidden border border-[var(--border)]">
                                                    <LayoutIcon size={48} className="text-primary/10 group-hover:text-primary transition-all duration-1000 md:scale-125" />
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="h-4 md:h-6 w-full bg-primary/5 rounded-full" />
                                                    <div className="h-4 md:h-6 w-2/3 bg-primary/5 rounded-full" />
                                                    <div className="h-3 md:h-4 w-full bg-primary/5 rounded-full mt-6" />
                                                    <div className="h-3 md:h-4 w-5/6 bg-primary/5 rounded-full" />
                                                    <div className="h-3 md:h-4 w-4/6 bg-primary/5 rounded-full" />
                                                </div>
                                            </div>
                                            <div className="h-12 md:h-16 w-full bg-primary/10 rounded-full border border-primary/10 flex items-center px-8">
                                                <div className="w-1/3 h-2 bg-primary/30 rounded-full" />
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                y: [-5, 5, -5]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute bottom-16 right-16 md:bottom-24 md:right-24 w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)] group hover:scale-110 transition-transform duration-700"
                                        >
                                            <MousePointerClick size={24} className="text-black md:scale-125" />
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Process Section */}
                                <div className="space-y-16 md:space-y-24">
                                    <div className="text-center space-y-8">
                                        <SectionLabel className="justify-center">Hoe het werkt</SectionLabel>
                                        <h2 className="font-sans font-bold text-[var(--text)] text-h2">
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
                                                className="p-10 rounded-[2.5rem] bg-[var(--paper)]/40 border border-[var(--border)] space-y-8 group hover:bg-[var(--paper)]/60 transition-all duration-700"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3">
                                                        {React.cloneElement(item.icon, { className: "group-hover:scale-110 transition-transform duration-500" })}
                                                    </div>
                                                    <span className="font-mono text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors uppercase italic">{item.step}</span>
                                                </div>
                                                <div className="space-y-4">
                                                    <h3 className="text-xl md:text-2xl font-sans font-bold text-[var(--text)] tracking-tighter">{item.title}</h3>
                                                    <p className="font-sans text-[var(--text)]/85 leading-[1.8] italic">{item.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <FAQ cmsFaqs={data?.faqs} />
                                {/* Bottom CTA */}
                                <div id="contact" className="py-20 md:py-32 border-t border-[var(--border)] flex flex-col items-center">
                                    <motion.div
                                        initial="initial"
                                        whileInView="whileInView"
                                        viewport={{ once: true }}
                                        variants={staggerContainer}
                                        className="text-left md:text-center space-y-10 md:space-y-16 mb-16 md:mb-24 w-full"
                                    >
                                        <a href="#contact" className="group flex flex-col items-center">
                                            <h2 className="font-sans font-bold text-[var(--text)] md:text-center text-h2">
                                                {data?.ctaHeadlineSans || "Klaar om te"}{' '}
                                                <span className="text-primary font-drama font-normal text-h2-serif">{data?.ctaHeadlineSerif || "beginnen?"}</span>
                                            </h2>
                                        </a>
                                        <motion.p variants={fadeUp} className="font-sans text-[var(--text)]/85 text-base md:text-xl font-light leading-[1.8] italic max-w-3xl mx-auto border-b-2 border-[var(--border)] pb-10 md:pb-12 text-center">
                                            {data?.ctaSubtitle || "Vraag een gratis check aan. In 20 minuten weet je wat het oplevert."}
                                        </motion.p>
                                    </motion.div>

                                    <ContactForm selectedUpgrade="website" />
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
            q: "Waarom kies je voor een framework als React/Vite in plaats van WordPress?",
            a: "Veel bureaus gebruiken WordPress omdat het makkelijk is voor henzelf, maar het is vaak zwaar en traag voor de bezoeker. Ik bouw je website met moderne technieken (React en Vite) die zorgen voor een 'app-achtige' ervaring. Pagina's laden direct, zonder die vervelende laadbalkjes. Voor Google is deze snelheid (Core Web Vitals) een van de belangrijkste factoren om je hoger in de zoekresultaten te plaatsen. Plus: je bent minder kwetsbaar voor hackers omdat er geen database-koppelingen op de voorgrond draaien."
        },
        {
            q: "Hoe zorg je ervoor dat mijn website meer leads en leads-aanvragen oplevert?",
            a: "Een mooi design is slechts de helft van het werk. Ik pas 'conversion centered design' toe. Dit betekent dat we bij elke knop, elke afbeelding en elke tekstregel kijken: helpt dit de bezoeker om de volgende stap te zetten? We kijken naar psychologische triggers, duidelijke Call-to-Actions en een logische flow. Een website van Merlign is geen digitaal visitekaartje, maar een verkoopmachine die 24/7 voor je aan het werk is."
        },
        {
            q: "Is mijn website schaalbaar als mijn bedrijf groeit?",
            a: "Absoluut. Omdat ik met componenten werk, kunnen we later heel eenvoudig nieuwe functionaliteiten toevoegen — van een boekingssysteem tot een klantenportaal — zonder dat de hele site verbouwd hoeft te worden. De basis die we leggen is toekomstbestendig."
        },
        {
            q: "Hoe zit het met de vindbaarheid (SEO) bij een op maat gemaakte site?",
            a: "Veel maatwerk sites vergeten SEO, maar bij Merlign zit dit in het DNA. Ik gebruik technieken zoals Static Site Generation (SSG) zodat de teksten direct leesbaar zijn voor Google-bots. Verder zorg ik voor schone meta-data, geoptimaliseerde afbeeldingen (WebP) en een logische kopstructuur (H1, H2, H3). Je krijgt een technische SEO-basis die sterker is dan de meeste standaard plugins kunnen bieden."
        },
        {
            q: "Wat zijn de kosten voor onderhoud na de lancering?",
            a: "Omdat mijn websites volledig custom codeerwerk zijn, ken ik elke regel code van binnenuit. Ik heb geen duur kantoor of personeel nodig, waardoor ik het onderhoud en de hosting voor een extreem lage prijs kan aanbieden. Je betaalt alleen voor pure technische stabiliteit."
        }
    ];

    const questions = cmsFaqs?.length > 0 ? cmsFaqs.map(f => ({
        q: f.question,
        a: f.answer
    })) : staticQuestions;

    const [openIndex, setOpenIndex] = React.useState(0);

    return (
        <section className="py-20 md:py-32 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-6">
                    <SectionLabel>FAQ</SectionLabel>
                    <h2 className="font-sans font-bold text-[var(--text)] leading-tight tracking-tighter text-h2">
                        Veelgestelde vragen over <span className="text-primary font-drama font-normal text-h2-serif">websites.</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
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
                                        <div className="px-6 pb-6 text-[var(--text)]/85 text-base font-sans font-light italic border-t border-[var(--border)] pt-4 whitespace-pre-wrap">
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

export default WebsiteService;
