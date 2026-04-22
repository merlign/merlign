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

const WHATSAPP_URL = "https://wa.me/31683368411?text=Hey%20Merlijn!%20Ik%20wil%20graag%20sparren%20over%20mijn%20website.";

export default function Advies() {
    const mainRef = useRef(null);
    const [brandData, setBrandData] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
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

    const handleCTAClick = () => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'Lead');
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
                title="Professionele website in twee weken | Merlign"
                description="Volledig op maat, met rake copy en kraakhelder design. Ziet je nieuwe site er niet direct beter uit dan wat je nu hebt staan? Dan betaal je niets."
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
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCTAClick}
                        className="bg-[#6366F1] text-white text-[13px] font-bold px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
                    >
                        Claim je gratis advies
                    </a>
                </div>
            </nav>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[100dvh] flex flex-col pt-24 pb-8 md:pb-12 px-6 overflow-hidden text-center">
                {/* Background Noise & Assets */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Floating Background Designs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                        animate={{
                            opacity: 0.12,
                            scale: 1,
                            rotate: -12,
                            y: [0, -20, 0]
                        }}
                        transition={{
                            opacity: { duration: 2 },
                            scale: { duration: 2 },
                            y: { duration: 10, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute top-[12%] -left-[15%] md:-left-[5%] w-[70%] md:w-[45%] aspect-video bg-white/5 border border-white/10 rounded-2xl"
                    >
                        <img
                            src="/hero-previews/hero1.png"
                            alt=""
                            className="w-full h-full object-cover rounded-2xl opacity-70"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                        animate={{
                            opacity: 0.1,
                            scale: 1,
                            rotate: 8,
                            y: [0, 25, 0]
                        }}
                        transition={{
                            opacity: { duration: 2, delay: 0.5 },
                            scale: { duration: 2, delay: 0.5 },
                            y: { duration: 12, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute top-[35%] -right-[20%] md:-right-[10%] w-[75%] md:w-[50%] aspect-video bg-white/5 border border-white/10 rounded-3xl"
                    >
                        <img
                            src="/hero-previews/hero2.png"
                            alt=""
                            className="w-full h-full object-cover rounded-3xl opacity-65"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{
                            opacity: 0.08,
                            scale: 1,
                            rotate: 4,
                            y: [0, -15, 0]
                        }}
                        transition={{
                            opacity: { duration: 2, delay: 1 },
                            scale: { duration: 2, delay: 1 },
                            y: { duration: 15, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute bottom-[10%] left-[5%] md:left-[15%] w-[65%] md:w-[40%] aspect-video bg-white/5 border border-white/10 rounded-2xl"
                    >
                        <img
                            src="/hero-previews/hero3.png"
                            alt=""
                            className="w-full h-full object-cover rounded-2xl opacity-60"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </motion.div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-4xl mx-auto space-y-8 md:space-y-12 py-12 md:py-20">
                    <div className="h-2" />

                    {/* Google Review Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center mb-4 md:mb-8"
                    >
                        <div className="group flex items-center bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-xl p-1 md:p-1.5 pr-3 md:pr-5 shadow-2xl">
                            <div className="flex items-center gap-2 md:gap-3 px-1.5 md:px-2.5">
                                <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-full h-full">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>
                                <span className="text-white font-sans text-base md:text-xl font-black italic tracking-tighter">5.0</span>
                            </div>

                            <div className="w-px h-5 md:h-6 bg-white/10 mx-1.5 md:mx-2" />

                            <div className="flex items-center gap-0.5 md:gap-1 ml-1" title="Gebaseerd op 25+ klantbeoordelingen">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FBB03B] fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <h1 className="hero-fade-up text-[clamp(2.1rem,7vw,3.8rem)] leading-[1.15] md:leading-[1.05] font-bold tracking-tighter max-w-5xl mx-auto">
                        Een professionele website in twee weken, <span className="italic font-drama text-[#6366F1] font-normal text-[1.1em]">voor een fractie van wat een bureau vraagt.</span>
                    </h1>

                    <p className="hero-fade-up text-[17px] md:text-[21px] text-white/50 max-w-3xl mx-auto font-medium leading-[1.6]">
                        Volledig op maat, met rake copy en kraakhelder design. Ziet je nieuwe site er niet direct beter uit dan wat je nu hebt staan? Dan betaal je niets.
                    </p>

                    <div className="hero-fade-up flex flex-col items-center gap-6 pt-4">
                        <div className="flex flex-col items-center gap-3">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleCTAClick}
                                className="inline-flex items-center justify-center gap-3 bg-[#6366F1] text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-base md:text-xl transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#6366F1]/20"
                            >
                                Claim je gratis advies
                            </a>
                            <p className="text-white/40 text-sm font-medium">Via WhatsApp, ik reageer dezelfde dag</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-4 opacity-40 pointer-events-none transition-opacity duration-1000 mt-auto mb-16 md:mb-24 pb-8">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white to-transparent" />
                </div>
            </section>

            {/* 2. PIJN-SECTIE */}
            <section className="reveal-section section-py px-6 md:px-16 lg:px-24 bg-[#0D0D12] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#6366F1]/[0.05] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#6366F1]/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Herken je dit?</h2>
                            <div className="space-y-6 text-lg md:text-xl text-white/60 leading-relaxed font-light">
                                <p>
                                    Je hebt ooit een site laten maken door iemand die "er wel verstand van had", maar eerlijk gezegd deel je de link liever niet met serieuze klanten.
                                </p>
                                <p>
                                    Of je hebt gekeken naar Wix of een goedkope oplossing, maar je weet dat het er dan uitziet als duizend andere sites.
                                </p>
                                <div className="bg-[#6366F1]/5 border border-[#6366F1]/20 p-6 rounded-3xl">
                                    <p className="text-white leading-relaxed">
                                        Intussen verlies je klanten aan concurrenten die er gewoon serieuzer uitzien. Niet omdat ze beter zijn, maar omdat hun website dat suggereert.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Je durft de link niet te sturen", desc: "Je stuurt hem liever niet mee in een offerte naar een serieuze klant." },
                                { title: "Je concurrent scoort jouw zoekopdrachten", desc: "Zelfs wie op jouw naam zoekt, belandt soms ergens anders." },
                                { title: "Bezoekers haken af", desc: "Te traag, werkt slecht op telefoon, of gewoon: het ziet er niet uit." },
                                { title: "Geen leads uit je site", desc: "Je hebt een website, maar hij brengt niks binnen." }
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

                    {/* CTA onder Herken je dit */}
                    <div className="flex flex-col items-center gap-6 pt-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleCTAClick}
                                className="inline-flex items-center justify-center gap-3 bg-[#6366F1] text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-base md:text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#6366F1]/20"
                            >
                                Claim je gratis advies
                            </a>
                            <p className="text-white/40 text-sm font-medium">Via WhatsApp, ik reageer dezelfde dag</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. OPLOSSING SECTION */}
            <section className="reveal-section section-py px-6 md:px-16 lg:px-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto space-y-20">
                    <div className="space-y-8 text-center">
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
                            Snel, betaalbaar én <br /> <span className="italic font-drama text-[#6366F1] font-normal text-[1.1em] inline-block">echt goed ontworpen.</span>
                        </h2>

                        <div className="space-y-8 text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
                            <p>
                                Mijn achtergrond in ontwerp zorgt dat jouw site er niet uitziet als die van iedereen. Ik ga diep in op wie jij bent en wat je doet, en dat zie je terug in het eindresultaat.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Jouw verhaal, jouw uitstraling",
                                desc: "Ik gebruik geen templates die duizend andere bedrijven ook gebruiken. En als je wil help ik ook met de teksten, zodat wat er staat ook echt aankomt.",
                                icon: <Sparkles size={24} />
                            },
                            {
                                title: "Gevonden worden",
                                desc: "Gebouwd zodat Google je vindt, en zoekmachines zoals ChatGPT je oppikken. Snel en goed op elke telefoon.",
                                icon: <Search size={24} />
                            },
                            {
                                title: "Jij beheert je eigen site",
                                desc: "Teksten en foto's pas je zelf aan via een simpel beheerpaneel. Geen mailtje naar mij voor elke kleine update.",
                                icon: <Layout size={24} />
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

                    {/* Testimonial */}
                    <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 md:p-16 space-y-8 relative overflow-hidden text-center">
                        <blockquote className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                            "Echt een zeer professionele site geworden, precies zoals het moest. Die feedback krijg ik nu ook direct terug als ik mijn site laat zien aan klanten."
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


            {/* 5. FAQ SECTION */}
            <section className="reveal-section py-32 px-6">
                <div className="max-w-3xl mx-auto space-y-16">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-center leading-tight">
                        Je vraagt je <br /> <span className="italic font-drama text-[#6366F1] font-normal text-[1.1em] inline-block">misschien af...</span>
                    </h2>

                    <div className="space-y-4">
                        {[
                            { q: "Wat gaat me dat kosten?", a: "Een website maak ik vanaf €995. Wat het uiteindelijk wordt, hangt af van wat jij nodig hebt. We stellen vooraf samen vast hoe succes eruitziet, zodat je geen euro te veel betaalt. Geen verborgen kosten, gewoon een eerlijk voorstel." },
                            { q: "Ben ik echt binnen 2 weken klaar?", a: "Ja. Als jij de teksten en beelden aanlevert, regel ik de rest. Ik hou niet van treuzelen, jij waarschijnlijk ook niet." },
                            { q: "Zit ik vast aan een duur onderhoudscontract?", a: "Nee. Je site is van jou. Ik bouw hem zo op dat je zelf kleine teksten en foto's kunt aanpassen via een simpel systeem. Je betaalt alleen voor je hosting en domeinnaam, verder heb je geen vaste maandelijkse kosten bij mij." },
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
                            Zullen we kijken <br className="md:hidden" /> waar voor jou <br className="md:hidden" /> <span className="italic font-drama font-normal text-[#6366F1] text-[1.1em] inline-block">de kansen liggen?</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                            Ik neem bewust maar een handjevol klanten aan per maand. Stuur me een berichtje en ik kijk gratis met je mee.
                        </p>
                        <div className="flex flex-col items-center gap-8 pt-4">
                            <div className="flex flex-col items-center gap-3">
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleCTAClick}
                                    className="inline-flex items-center justify-center gap-3 bg-[#6366F1] text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-base md:text-xl transition-all hover:scale-[1.05] active:scale-[0.98] shadow-2xl shadow-[#6366F1]/20"
                                >
                                    Claim je gratis advies
                                </a>
                                <p className="text-white/40 text-sm font-medium">Via WhatsApp, ik reageer dezelfde dag</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FOOTER */}
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
