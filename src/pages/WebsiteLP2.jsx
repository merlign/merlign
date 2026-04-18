import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Check,
    Calendar,
    Sparkles,
    ShieldCheck,
    Search,
    TrendingUp,
    MousePointer2,
    Zap,
    Clock,
    X,
    MessageCircle,
    ChevronDown,
    Layout,
    Settings,
    Monitor
} from 'lucide-react';
import SEO from '../components/SEO';
import { getContactInfo, getHomePageData, urlFor } from '../lib/sanity';
import emailjs from 'emailjs-com';

gsap.registerPlugin(ScrollTrigger);

// --- Design Tokens ---
const PALETTE = {
    primary: "#0D0D12",
    accent: "#6366F1",
    secondary: "#12121A",
    text: "#FAFAFA",
    textMuted: "rgba(250, 250, 250, 0.6)",
    border: "rgba(255, 255, 255, 0.08)"
};

const TYPOGRAPHY = {
    sans: "'Plus Jakarta Sans', sans-serif",
    drama: "'Lora', serif",
    mono: "'Space Mono', monospace"
};

export default function WebsiteLP2() {
    const mainRef = useRef(null);
    const [brandData, setBrandData] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        websiteUrl: '',
        workType: '',
        budget: '',
        liveDate: '',
        email: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const contact = await getContactInfo();
                setBrandData(contact);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }
        fetchData();
    }, []);

    const handleOpenModal = (e) => {
        if (e) e.preventDefault();
        setIsModalOpen(true);
        setIsSuccess(false); // Reset success state when opening
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSending) return;
        setIsSending(true);

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            from_name: formData.email,
            reply_to: formData.email,
            email: formData.email,
            message: `
                GRATIS HERO REDESIGN AANVRAAG
                -----------------------------
                Website URL: ${formData.websiteUrl}
                Wat voor werk: ${formData.workType}
                Budget: ${formData.budget}
                Wanneer live: ${formData.liveDate}
                E-mail: ${formData.email}
            `,
            upgrade_choice: "Gratis Hero Redesign"
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            setIsSuccess(true);
        } catch (error) {
            console.error('EmailJS error:', error);
            alert('Er ging iets mis bij het verzenden. Probeer het later opnieuw.');
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-fade-up", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out"
            });

            gsap.utils.toArray(".reveal-section").forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={mainRef}
            className="min-h-screen bg-[#0D0D12] text-white selection:bg-[#6366F1] selection:text-white overflow-x-hidden"
            style={{ fontFamily: TYPOGRAPHY.sans }}
        >
            <SEO
                title="Gratis Website Hero Redesign | Merlign"
                description="Benieuwd hoe jouw website eruit kan zien? Laat je gegevens achter voor een gratis hero redesign door Merlijn."
                noindex={true}
            />

            {/* Global Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.035] mix-blend-overlay">
                <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg' className="w-full h-full">
                    <filter id='noise'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch' />
                    </filter>
                    <rect width='100%' height='100%' filter='url(#noise)' />
                </svg>
            </div>

            {/* Navbar */}
            <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg">
                <div className="bg-[#101828]/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-2">
                        <img src="/logo_merlign.png" alt="Merlign" className="h-4 brightness-0 invert" />
                    </div>
                    <button
                        onClick={handleOpenModal}
                        className="bg-[#6366F1] text-white text-[13px] font-bold px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
                    >
                        Hero Redesign aanvragen
                    </button>
                </div>
            </nav>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[100dvh] flex flex-col pt-24 pb-8 md:pb-12 px-6 overflow-hidden text-center justify-center">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                     style={{ 
                        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px' 
                      }} 
                />

                <div className="relative z-10 max-w-4xl mx-auto space-y-8 md:space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                    >
                        <div className="group flex items-center bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-xl p-1 md:p-1.5 pr-3 md:pr-5 shadow-2xl">
                            <div className="flex items-center gap-2 md:gap-3 px-1.5 md:px-2.5">
                                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                                <span className="text-white font-sans text-xs md:text-sm font-bold tracking-tight uppercase">Limited Spots for April</span>
                            </div>
                        </div>
                    </motion.div>

                    <h1 className="hero-fade-up text-[clamp(2.1rem,7vw,3.8rem)] leading-[1.15] md:leading-[1.05] font-bold tracking-tighter max-w-5xl mx-auto">
                        Een professionele website in twee weken, <span className="italic font-drama text-[#6366F1] font-normal text-[1.1em] inline-block">voor een fractie van wat een bureau vraagt.</span>
                    </h1>

                    <p className="hero-fade-up text-[17px] md:text-[21px] text-white/50 max-w-3xl mx-auto font-medium leading-[1.6]">
                        Geen loze beloftes. Ik bekijk je huidige site en ontwerp een nieuwe Hero sectie die wél klanten vangt. Gratis en vrijblijvend.
                    </p>

                    <div className="hero-fade-up flex flex-col items-center gap-6 pt-4">
                        <button 
                            onClick={handleOpenModal}
                            className="inline-flex items-center justify-center gap-3 bg-[#6366F1] text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-base md:text-xl transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#6366F1]/20"
                        >
                            Claim mijn Gratis Hero Redesign
                            <ArrowRight size={20} className="md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-4 opacity-40 pointer-events-none transition-opacity duration-1000 mt-20">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Mijn Werk</span>
                    <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white to-transparent" />
                </div>
            </section>

            {/* 2. PIJN-SECTIE */}
            <section className="reveal-section section-py px-6 md:px-16 lg:px-24 bg-[#0D0D12] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#6366F1]/[0.05] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Waarom je site nu klanten kost.</h2>
                            <div className="space-y-6 text-lg md:text-xl text-white/60 leading-relaxed font-light">
                                <p>
                                    De meeste bezoekers beslissen binnen 3 seconden of ze blijven. Als je Hero sectie (het eerste wat ze zien) niet direct raak is, ben je ze kwijt.
                                </p>
                                <div className="bg-[#6366F1]/5 border border-[#6366F1]/20 p-6 rounded-3xl">
                                    <p className="text-white leading-relaxed italic">
                                        "Niet iedereen krijgt dit — alleen als ik zie dat het echt zin heeft voor jouw business."
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Geen 'wow'-effect", desc: "Het ziet eruit als een template van 10 jaar geleden." },
                                { title: "Onduidelijke boodschap", desc: "Mensen snappen niet direct wat je voor ze doet." },
                                { title: "Zonde van de advertenties", desc: "Je stuurt betaald verkeer naar een lekke emmer." },
                                { title: "Grip verliezen", desc: "Andere partijen ogen professioneler door hun design." }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#0D0D12] p-8 rounded-[2rem] border border-white/5 space-y-4 hover:border-[#6366F1]/30 transition-colors">
                                    <div className="w-10 h-10 bg-[#6366F1]/10 rounded-xl flex items-center justify-center text-[#6366F1]">
                                        <X size={20} />
                                    </div>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 pt-12">
                        <button
                            onClick={handleOpenModal}
                            className="bg-[#6366F1] text-white font-bold px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#6366F1]/20"
                        >
                            Bekijk wat er mogelijk is
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. OPLOSSING SECTION */}
            <section className="reveal-section section-py px-6 md:px-16 lg:px-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto space-y-20">
                    <div className="space-y-8 text-center">
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
                            Geen gepraat, maar <br /> <span className="italic font-drama text-[#6366F1] font-normal text-[1.1em] inline-block">direct resultaat.</span>
                        </h2>

                        <div className="space-y-8 text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
                            <p>
                                Ik wil laten zien wat het verschil is tussen een standaard website en een site die is ontworpen om te converteren. Daarom bied ik dit redesign gratis aan.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Echt maatwerk",
                                desc: "Ik ontwerp specifiek voor jouw doelgroep en dienst. Geen standaard plaatjes.",
                                icon: <Sparkles size={24} />
                            },
                            {
                                title: "Strategisch design",
                                desc: "Elke pixel heeft een doel: de bezoeker overtuigen om contact op te nemen.",
                                icon: <Zap size={24} />
                            },
                            {
                                title: "Live in 2 weken",
                                desc: "Bevalt het redesign? Dan bouwen we je hele site binnen 14 dagen om.",
                                icon: <Clock size={24} />
                            }
                        ].map((usp, i) => (
                            <div key={i} className="bg-[#0D0D12] rounded-[2rem] border border-white/5 p-8 hover:border-[#6366F1]/30 transition-colors text-center space-y-4">
                                <div className="w-12 h-12 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#6366F1]">
                                    {usp.icon}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{usp.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed font-light">{usp.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section (Keeping design consistent) */}
            <section className="reveal-section py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 md:p-16 space-y-8 relative overflow-hidden text-center">
                        <blockquote className="text-2xl md:text-4xl font-bold tracking-tight leading-tight max-w-2xl mx-auto">
                            "Echt een zeer professionele site geworden, precies zoals het moest. Die feedback krijg ik nu ook direct terug als ik mijn site laat zien."
                        </blockquote>
                        <div className="flex flex-col items-center gap-3">
                            <img
                                src="/ferry.jpg"
                                alt="Ferry Struik"
                                className="w-14 h-14 rounded-full object-cover border-2 border-[#6366F1]/40"
                            />
                            <cite className="not-italic font-bold text-xl block">Ferry Struik</cite>
                            <span className="text-[#6366F1] font-mono text-[10px] uppercase tracking-[0.2em] bg-[#6366F1]/10 px-4 py-1 rounded-full">Ferry Zorgt</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PROCES SECTION */}
            <section className="reveal-section py-32 px-6 border-t border-white/5 bg-[#0A0A0F]">
                <div className="max-w-4xl mx-auto space-y-20 text-center">
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
                        In drie stappen live, <br /> <span className="italic font-drama text-[#6366F1] font-normal text-[1.1em] inline-block">zonder gezeik.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            {
                                number: "01",
                                title: "Gratis gesprek",
                                desc: "20 minuten, geen verkooppraatje. Ik kijk eerlijk mee naar wat jouw site nu écht nodig heeft."
                            },
                            {
                                number: "02",
                                title: "Ontwerp & bouw",
                                desc: "Ik bouw niet alleen een mooi plaatje, maar iets dat bezoekers ook echt klant maakt."
                            },
                            {
                                number: "03",
                                title: "Live en klaar",
                                desc: "Binnen twee weken staat je nieuwe site online. Je deelt je link zonder je er voor te schamen."
                            }
                        ].map((step, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-4 hover:border-[#6366F1]/30 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-[#6366F1] text-white flex items-center justify-center text-xl font-black">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed font-light">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={handleOpenModal}
                            className="inline-flex items-center justify-center gap-3 bg-[#6366F1] text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-base md:text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#6366F1]/20"
                        >
                            Bekijk mijn mogelijkheden
                            <ArrowRight size={20} />
                        </button>
                        <p className="text-white/30 text-sm">100% vrijblijvend</p>
                    </div>
                </div>
            </section>

            {/* 5. FAQ SECTION */}
            <section className="reveal-section py-32 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto space-y-16">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-center leading-tight">
                        Je vraagt je <br /> <span className="italic font-drama text-[#6366F1] font-normal text-[1.1em] inline-block">misschien af...</span>
                    </h2>

                    <div className="space-y-4">
                        {[
                            { q: "Wat gaat me dat kosten?", a: "Een website maak ik vanaf €995. Wat het uiteindelijk wordt, hangt af van wat jij nodig hebt. We kijken dat samen door zodat je geen euro te veel betaalt. Geen verborgen kosten, gewoon een eerlijk voorstel." },
                            { q: "Ben ik echt binnen 2 weken klaar?", a: "Ja. Als jij de teksten en beelden aanlevert, regel ik de rest. Ik hou niet van treuzelen, jij waarschijnlijk ook niet." },
                            { q: "Ziet mijn site er niet uit als een AI-site?", a: "Nee. Ik gebruik AI om sneller te bouwen, niet om minder na te denken. Mijn achtergrond in ontwerp zorgt dat alles aansluit bij wie jij bent. Generiek is precies wat ik probeer te vermijden." },
                            { q: "Word ik wel gevonden in Google?", a: "Ja. Je site is technisch 100% geoptimaliseerd. Snelheid, veiligheid en structuur zijn de standaard, zodat je direct goed op de kaart staat bij Google \u00e9n de nieuwe AI-zoekmachines zoals ChatGPT en Perplexity." },
                            { q: "Moet ik zelf alles schrijven?", a: "Hoeft niet. Ik kan je helpen om je verhaal zo op te schrijven dat het ook echt aankomt bij je klanten." }
                        ].map((faq, i) => (
                            <div key={i} className="border border-white/5 rounded-3xl overflow-hidden transition-all">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-8 text-left hover:bg-white/[0.04] transition-colors"
                                >
                                    <h4 className="text-xl font-bold pr-4">{faq.q}</h4>
                                    <ChevronDown
                                        size={20}
                                        className={`shrink-0 text-[#6366F1] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence initial={false}>
                                    {openFaq === i && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-8 pb-8 text-white/50 leading-relaxed text-sm">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FINALE CTA */}
            <section className="reveal-section pb-40 pt-20 px-6 container mx-auto">
                <div className="bg-[#0D0D12] border border-white/5 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[120px]" />
                    <div className="relative z-10 space-y-8 md:space-y-12">
                        <h2 className="text-[32px] md:text-6xl font-bold tracking-tighter max-w-5xl mx-auto leading-tight md:leading-[1.1]">
                            Zien hoe jouw nieuwe <br /> <span className="italic font-drama font-normal text-[#6366F1] text-[1.1em] inline-block">hero sectie eruit ziet?</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                            Ik maak tijd voor maximaal 2 gratis redesigns per week. Wacht niet te lang.
                        </p>
                        <div className="flex flex-col items-center gap-8 pt-4">
                            <button
                                onClick={handleOpenModal}
                                className="inline-flex items-center justify-center gap-3 bg-[#6366F1] text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-base md:text-xl transition-all hover:scale-[1.05] active:scale-[0.98] shadow-2xl shadow-[#6366F1]/20"
                            >
                                Gratis Hero Redesign aanvragen
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#0D0D12]/90 backdrop-blur-xl"
                        />
                        
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#12121A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 md:p-12">
                                {isSuccess ? (
                                    <div className="text-center space-y-8 py-12">
                                        <div className="w-20 h-20 bg-[#6366F1]/20 rounded-full flex items-center justify-center mx-auto border border-[#6366F1]/50">
                                            <Check size={40} className="text-[#6366F1]" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-bold tracking-tight">Thanks!</h3>
                                            <p className="text-white/60 text-lg leading-relaxed max-w-md mx-auto">
                                                Ik bekijk je site en als ik denk dat ik je echt verder kan helpen, ontvang je binnen 48 uur een gratis hero redesign in je inbox. Niet iedereen krijgt dit — alleen als ik zie dat het echt zin heeft.
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => setIsModalOpen(false)}
                                            className="bg-white/5 border border-white/10 px-8 py-3 rounded-full font-bold text-sm"
                                        >
                                            Sluiten
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-10">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#6366F1]">Gratis Hero Redesign</h3>
                                            <p className="text-white/50">Laat je gegevens achter en ik ga voor je aan de slag.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Je huidige website URL</label>
                                                <input 
                                                    required
                                                    type="url"
                                                    placeholder="https://jouwsite.nl"
                                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#6366F1]/50 transition-colors"
                                                    value={formData.websiteUrl}
                                                    onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Wat voor werk doe je?</label>
                                                <input 
                                                    required
                                                    type="text"
                                                    placeholder="Bijv: Tandarts, Coach, Architect..."
                                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#6366F1]/50 transition-colors"
                                                    value={formData.workType}
                                                    onChange={(e) => setFormData({...formData, workType: e.target.value})}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Wat heb je over voor een goede site?</label>
                                                <select 
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#6366F1]/50 transition-colors appearance-none text-white"
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                                >
                                                    <option value="" className="bg-[#12121A]">Kies een optie</option>
                                                    <option value="onder-995" className="bg-[#12121A]">Onder €995</option>
                                                    <option value="995-1500" className="bg-[#12121A]">€995 - €1500</option>
                                                    <option value="1500plus" className="bg-[#12121A]">€1500+</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Wanneer wil je live?</label>
                                                <input 
                                                    required
                                                    type="text"
                                                    placeholder="Bijv: Volgende maand, Zo snel mogelijk..."
                                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#6366F1]/50 transition-colors"
                                                    value={formData.liveDate}
                                                    onChange={(e) => setFormData({...formData, liveDate: e.target.value})}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Je e-mailadres</label>
                                                <input 
                                                    required
                                                    type="email"
                                                    placeholder="naam@bedrijf.nl"
                                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#6366F1]/50 transition-colors"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>

                                            <button 
                                                type="submit"
                                                disabled={isSending}
                                                className="w-full bg-[#6366F1] text-white py-5 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#6366F1]/20 disabled:opacity-50"
                                            >
                                                {isSending ? 'Momentje...' : 'Ja, ik wil dat gratis design'}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5 bg-[#0D0D12] text-center md:text-left relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#6366F1]/[0.02] rounded-full blur-[80px] translate-y-1/4 translate-x-1/4 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
                    <div className="space-y-6">
                        <img src="/logo_merlign.png" alt="Merlign" className="h-6 brightness-0 invert mx-auto md:mx-0" />
                        <div className="space-y-1 text-sm text-white/40 font-medium">
                            <p>Merlijn van der Vleuten</p>
                            <p>{brandData?.email || "merlijn@merlign.com"}</p>
                            <p>KVK: 75629887</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-6 text-sm font-bold text-white/60">
                        <div className="flex gap-8">
                            {brandData?.linkedin && <a href={brandData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>}
                            <a href="/privacy" className="hover:text-white transition-colors">PRIVACYBELEID</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
