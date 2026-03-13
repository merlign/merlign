import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Shield, BarChart3, ArrowRight, MousePointerClick, RefreshCw, Smartphone, Globe } from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const WebsiteScanner = () => {
    const [step, setStep] = useState('input'); // input, scanning, result
    const [url, setUrl] = useState('');
    const [brandName, setBrandName] = useState('');
    const [scanProgress, setScanProgress] = useState(0);
    const [currentAction, setCurrentAction] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('midnight'); // midnight, organic, brutalist

    const scanActions = [
        "Connecting to DOM...",
        "Measuring Time to First Byte...",
        "Analyzing Conversion Hierarchy...",
        "Identifying UI Bottlenecks...",
        "Extracting Brand DNA...",
        "Synthesizing 72h Design Protocol...",
        "Generating High-Fidelity Prototype..."
    ];

    useEffect(() => {
        if (step === 'scanning') {
            let progress = 0;
            let actionIndex = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    setStep('result');
                    clearInterval(interval);
                }
                setScanProgress(progress);

                // Change action text based on progress
                const nextActionIndex = Math.floor((progress / 100) * scanActions.length);
                if (nextActionIndex !== actionIndex && nextActionIndex < scanActions.length) {
                    actionIndex = nextActionIndex;
                    setCurrentAction(scanActions[actionIndex]);
                }
            }, 400);
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleStartScan = (e) => {
        e.preventDefault();
        if (!url || !brandName) return;
        setStep('scanning');
        setCurrentAction(scanActions[0]);
    };

    const presets = {
        midnight: {
            name: "Midnight Luxe",
            bg: "bg-[#0D0D12]",
            accent: "text-[#C9A84C]",
            btn: "bg-[#C9A84C]",
            fontSerif: "font-serif italic",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000"
        },
        organic: {
            name: "Organic Tech",
            bg: "bg-[#2E4036]",
            accent: "text-[#CC5833]",
            btn: "bg-[#CC5833]",
            fontSerif: "font-serif italic",
            image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000"
        },
        brutalist: {
            name: "Brutalist Signal",
            bg: "bg-[#E8E4DD]",
            accent: "text-[#E63B2E]",
            btn: "bg-[#E63B2E]",
            fontSerif: "font-serif italic text-black",
            image: "https://images.unsplash.com/photo-1541888941295-1e8762df4a8d?auto=format&fit=crop&q=80&w=1000"
        }
    };

    return (
        <section className="py-20 md:py-32 border-t border-[var(--border)] overflow-hidden">
            <div className="content-max-width section-px">
                <div className="max-w-4xl mx-auto text-center space-y-8 mb-16 md:mb-24">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                        <Zap size={14} className="text-primary animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest font-black text-primary italic">Live Prototype Engine</span>
                    </motion.div>
                    <h2 className="text-h2 font-sans font-bold text-[var(--text)]">
                        Scan je site. Zie de <span className="text-primary font-drama font-normal text-h2-serif text-h1-serif">toekomst.</span>
                    </h2>
                    <p className="text-lg md:text-xl font-sans text-[var(--text)]/60 font-light italic max-w-2xl mx-auto text-center">
                        Geef je huidige URL op. Onze AI analyseert je conversie-lekkages en genereert direct een 72-uurs redesign prototype.
                    </p>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {step === 'input' && (
                            <motion.div
                                key="input-step"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-2xl mx-auto bg-[var(--paper)]/40 p-8 md:p-12 rounded-[2.5rem] border border-[var(--border)] backdrop-blur-xl shadow-2xl"
                            >
                                <form onSubmit={handleStartScan} className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/40 font-bold italic">Je huidige website</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="https://jouwsite.nl"
                                                className="w-full bg-transparent border-b border-[var(--border)] py-4 font-sans text-xl focus:outline-none focus:border-primary transition-all text-[var(--text)] placeholder:text-[var(--text)]/10"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                required
                                            />
                                            <Globe size={18} className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text)]/20" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/40 font-bold italic">Brand Naam</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Bijv. Nova Health"
                                                className="w-full bg-transparent border-b border-[var(--border)] py-4 font-sans text-xl focus:outline-none focus:border-primary transition-all text-[var(--text)] placeholder:text-[var(--text)]/10"
                                                value={brandName}
                                                onChange={(e) => setBrandName(e.target.value)}
                                                required
                                            />
                                            <Zap size={18} className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text)]/20" />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-6 bg-primary text-black font-black uppercase tracking-[0.3em] italic rounded-full shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-4"
                                    >
                                        Start Analyse & Redesign
                                        <ArrowRight size={20} />
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === 'scanning' && (
                            <motion.div
                                key="scanning-step"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="max-w-xl mx-auto text-center space-y-12 py-20"
                            >
                                <div className="relative w-48 h-48 mx-auto">
                                    <svg className="w-full h-full rotate-[-90deg]">
                                        <circle
                                            cx="96" cy="96" r="80"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="transparent"
                                            className="text-primary/10"
                                        />
                                        <motion.circle
                                            cx="96" cy="96" r="80"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="transparent"
                                            className="text-primary"
                                            strokeDasharray="502"
                                            animate={{ strokeDashoffset: 502 - (502 * scanProgress / 100) }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl font-mono font-black italic text-primary">{Math.floor(scanProgress)}%</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="font-mono text-sm tracking-widest text-primary uppercase animate-pulse">{currentAction}</p>
                                    <div className="flex gap-1 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ opacity: [0.2, 1, 0.2] }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                                className="w-1.5 h-1.5 rounded-full bg-primary"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'result' && (
                            <motion.div
                                key="result-step"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-12"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                    {/* Analysis Panel */}
                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="bg-[var(--paper)]/40 p-8 rounded-[2rem] border border-[var(--border)] space-y-8">
                                            <h3 className="text-2xl font-sans font-bold text-[var(--text)]">Analyse Rapport</h3>
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                                                    <span className="text-sm font-mono text-[var(--text)]/40 italic">CONVERSIE SCORE</span>
                                                    <span className="text-xl font-mono font-black text-red-500 italic">38/100</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                                                    <span className="text-sm font-mono text-[var(--text)]/40 italic">LAADTIJD (LCP)</span>
                                                    <span className="text-xl font-mono font-black text-orange-500 italic">4.2s</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                                                    <span className="text-sm font-mono text-[var(--text)]/40 italic">LEAD LEAKAGE</span>
                                                    <span className="text-xl font-mono font-black text-primary italic">HIGH</span>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                                                <p className="text-xs font-sans text-red-400/80 leading-relaxed italic">
                                                    * Kritieke fout: Geen duidelijke hiërarchie in CTA's gedetecteerd. Bezoekers haken af binnen 3 seconden.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text)]/40 font-bold italic">Selecteer Design Richting</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {Object.keys(presets).map((p) => (
                                                    <button
                                                        key={p}
                                                        onClick={() => setSelectedPreset(p)}
                                                        className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${selectedPreset === p ? 'bg-primary text-black border-primary' : 'bg-transparent border-[var(--border)] text-[var(--text)]/40'}`}
                                                    >
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStep('input')}
                                            className="w-full py-5 border border-[var(--border)] rounded-full text-[12px] font-black uppercase tracking-widest text-[var(--text)]/40 hover:border-primary/20 transition-all flex items-center justify-center gap-3"
                                        >
                                            <RefreshCw size={14} /> Opnieuw scannen
                                        </button>
                                    </div>

                                    {/* Prototype Preview */}
                                    <div className="lg:col-span-8 space-y-6">
                                        <div className="relative bg-black rounded-[2.5rem] border border-[var(--border)] overflow-hidden shadow-2xl aspect-[16/10] md:aspect-auto md:h-[600px] group">
                                            {/* Browser Top Bar */}
                                            <div className="bg-[#1A1A1A] px-6 py-4 flex items-center justify-between border-b border-white/5">
                                                <div className="flex gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                                </div>
                                                <div className="bg-white/5 rounded-md px-12 py-1 flex items-center gap-2">
                                                    <Shield size={10} className="text-green-500/50" />
                                                    <span className="text-[10px] font-mono text-white/20 italic">{url}</span>
                                                </div>
                                                <div className="w-12 h-2 bg-white/5 rounded-full" />
                                            </div>

                                            {/* Prototype Content */}
                                            <div className={`relative w-full h-full transition-colors duration-1000 overflow-y-auto custom-scrollbar ${presets[selectedPreset].bg}`}>
                                                {/* Hero Prototype */}
                                                <div className="relative pt-20 px-12 md:px-20 pb-20 overflow-hidden min-h-full">
                                                    <motion.div
                                                        key={selectedPreset}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 1 }}
                                                        className="relative z-10 max-w-2xl space-y-10"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-black ${presets[selectedPreset].btn.replace('bg-', 'bg-opacity-100 bg-')}`}>
                                                                {brandName.charAt(0)}
                                                            </div>
                                                            <span className="text-white font-sans font-bold tracking-tighter">{brandName}</span>
                                                        </div>

                                                        <h1 className="text-white text-5xl md:text-7xl font-sans font-black leading-tight">
                                                            Transform your <span className={`${presets[selectedPreset].accent} ${presets[selectedPreset].fontSerif}`}>Digital Identity.</span>
                                                        </h1>

                                                        <p className="text-white/60 text-lg font-sans font-light italic leading-relaxed max-w-lg">
                                                            Stop losing leads to outdated systems. We build high-performance instruments that scale your revenue in 72 hours.
                                                        </p>

                                                        <div className="flex items-center gap-6">
                                                            <div className={`${presets[selectedPreset].btn} text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs italic shadow-2xl`}>
                                                                GET STARTED
                                                            </div>
                                                            <div className="flex items-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                                                                <Smartphone size={14} /> SCALABLE
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Decorative Elements */}
                                                    <motion.div
                                                        animate={{
                                                            rotate: [0, 360],
                                                            scale: [1, 1.2, 1]
                                                        }}
                                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                        className="absolute top-20 right-[-10%] w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none"
                                                    />

                                                    {/* Image Preview Overlay */}
                                                    <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden opacity-20 md:opacity-100 pointer-events-none">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D12] to-transparent z-10" />
                                                        <img src={presets[selectedPreset].image} className="h-full w-full object-cover" alt="Mockup" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hover CTA Overlay */}
                                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-12 z-50">
                                                <div className="space-y-6 max-w-sm">
                                                    <h4 className="text-3xl font-sans font-bold text-white italic">Dit is pas het begin.</h4>
                                                    <p className="text-white/60 font-sans font-light italic text-lg leading-relaxed">
                                                        Dit is een statische preview van de <span className="text-primary font-bold">{presets[selectedPreset].name}</span> richting. Wil je het volledige interactieve prototype en een lead-leak audit?
                                                    </p>
                                                    <a href="#contact" className="inline-block py-6 px-12 bg-primary text-black font-black uppercase tracking-[0.3em] italic rounded-full shadow-2xl hover:scale-105 transition-transform">
                                                        Ontvang volledig plan
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                                            <div className="flex items-center gap-2 text-[var(--text)]/40 font-mono text-[10px] uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> VITE POWERED
                                            </div>
                                            <div className="flex items-center gap-2 text-[var(--text)]/40 font-mono text-[10px] uppercase tracking-widest">
                                                <Smartphone size={12} /> MOBILE FIRST
                                            </div>
                                            <div className="flex items-center gap-2 text-[var(--text)]/40 font-mono text-[10px] uppercase tracking-widest">
                                                <Zap size={12} /> GSAP ANIMATED
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default WebsiteScanner;
