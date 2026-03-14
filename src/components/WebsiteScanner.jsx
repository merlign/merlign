import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Shield, BarChart3, ArrowRight, RefreshCw, Smartphone, Globe, AlertCircle, Loader2 } from 'lucide-react';
import SectionLabel from './SectionLabel';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const WebsiteScanner = () => {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanStep, setScanStep] = useState('idle'); // idle, fetching, analyzing, result
    const [streamedText, setStreamedText] = useState('');
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const reportRef = useRef(null);
    const progressInterval = useRef(null);

    const handleScan = async (e) => {
        e.preventDefault();
        if (!url) return;

        let cleanUrl = url.trim();
        if (!cleanUrl.startsWith('http')) {
            cleanUrl = `https://${cleanUrl}`;
        }

        setIsScanning(true);
        setScanStep('fetching');
        setError(null);
        setStreamedText('');
        setReport(null);
        setProgress(10);

        // Start artificial progress animation
        if (progressInterval.current) clearInterval(progressInterval.current);
        progressInterval.current = setInterval(() => {
            setProgress(prev => {
                if (prev < 90) return prev + Math.random() * 2;
                return prev;
            });
        }, 300);

        try {
            setScanStep('analyzing');

            // 1. Call serverless function with the URL
            const analyzeRes = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: cleanUrl })
            });

            if (!analyzeRes.ok) {
                const errorText = await analyzeRes.text();
                throw new Error(`Analyse mislukt: ${errorText || analyzeRes.statusText}`);
            }

            const reader = analyzeRes.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            // Gemini SSE format extraction
                            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                            if (text) {
                                fullText += text;
                                setStreamedText(fullText);
                            }
                        } catch (e) {
                            // Skip invalid chunks
                        }
                    }
                }
            }

            // 4. Parse final JSON
            try {
                // Find potential JSON block if AI included any text around it
                const jsonMatch = fullText.match(/\{[\s\S]*\}/);
                const jsonStr = jsonMatch ? jsonMatch[0] : fullText;
                const parsedReport = JSON.parse(jsonStr);
                setReport(parsedReport);
                setScanStep('result');
                setProgress(100);
                if (progressInterval.current) clearInterval(progressInterval.current);
            } catch (e) {
                console.error("JSON Parse Error:", e, fullText);
                throw new Error("Kon het analyserapport niet verwerken.");
            }

        } catch (err) {
            console.error("Scan Error:", err);
            setError(err.message);
            setScanStep('idle');
            setProgress(0);
            if (progressInterval.current) clearInterval(progressInterval.current);
        } finally {
            setIsScanning(false);
        }
    };

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, []);

    return (
        <section className="py-6 md:py-12 relative overflow-hidden">
            <div className="content-max-width section-px relative z-10 flex justify-center">
                <div className="w-full max-w-4xl bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center space-y-6 mb-12 relative z-10">
                        <h2 className="font-sans font-bold text-[var(--text)] text-h2">
                            Gratis <span className="text-primary font-drama font-normal text-h2-serif">website scan.</span>
                        </h2>
                        <p className="text-sm md:text-base font-sans text-[var(--text)]/40 font-light italic max-w-sm mx-auto">
                            Ontdek binnen 30 seconden waar je leads verliest.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto relative z-20">
                        <form onSubmit={handleScan} className="relative mb-12">
                            <div className="relative flex items-center bg-white/[0.03] border border-white/10 p-2 rounded-full focus-within:border-primary/40 transition-all shadow-lg">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="jouwsite.nl"
                                    className="flex-grow bg-transparent border-none px-6 py-3 font-sans text-base focus:outline-none text-[var(--text)] placeholder:text-[var(--text)]/20"
                                    disabled={isScanning}
                                />
                                <button
                                    type="submit"
                                    disabled={isScanning || !url}
                                    className="bg-primary text-black px-6 py-3 rounded-full font-black uppercase tracking-widest italic flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all text-xs"
                                >
                                    {isScanning ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
                                    {isScanning ? 'Scannen' : 'Scan'}
                                </button>
                            </div>
                        </form>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="p-5 rounded-[2rem] bg-red-500/5 border border-red-500/10 flex items-center gap-4 text-red-400/80 mb-8"
                                >
                                    <AlertCircle size={16} className="shrink-0" />
                                    <p className="font-sans text-sm italic">{error}</p>
                                </motion.div>
                            )}

                            {isScanning && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mb-8 space-y-3"
                                >
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-black text-primary animate-pulse">
                                            {scanStep === 'fetching' ? 'Website inladen...' : 'AI analyseert content...'}
                                        </span>
                                        <span className="text-[10px] font-mono font-black italic text-primary/60">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {scanStep === 'analyzing' && !report && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-[2rem] font-mono text-xs text-[var(--text)]/30 whitespace-pre-wrap italic leading-relaxed h-[200px] overflow-y-auto custom-scrollbar">
                                        {streamedText || "AI analyseert de content..."}
                                    </div>
                                </motion.div>
                            )}

                            {scanStep === 'result' && report && (
                                <motion.div
                                    ref={reportRef}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-10 relative z-10"
                                >
                                    <div className="flex items-center gap-8">
                                        <div className="relative shrink-0 w-20 h-20">
                                            <svg className="w-full h-full rotate-[-90deg]">
                                                <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-white/5" />
                                                <motion.circle
                                                    cx="50%" cy="50%" r="45%"
                                                    stroke="currentColor"
                                                    strokeWidth="5"
                                                    fill="transparent"
                                                    strokeDasharray="100 100"
                                                    strokeDashoffset={100 - (report.score * 10)}
                                                    className={report.score <= 4 ? "text-red-500/80" : report.score <= 6 ? "text-orange-500/80" : "text-emerald-500/80"}
                                                    initial={{ strokeDashoffset: 100 }}
                                                    animate={{ strokeDashoffset: 100 - (report.score * 10) }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-2xl font-mono font-black italic">{report.score}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-lg font-sans font-bold text-[var(--text)]">Eerste indruk</h3>
                                            <p className="text-sm md:text-base font-sans font-light italic text-[var(--text)]/50 leading-relaxed max-w-lg">
                                                {report.firstImpression}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-primary/60">Conversie Bottlenecks</h4>
                                            <ul className="space-y-3">
                                                {report.bottlenecks.map((item, i) => (
                                                    <li key={i} className="flex gap-3 text-sm font-sans text-[var(--text)]/60 italic leading-relaxed">
                                                        <span className="text-primary/40">•</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-primary/60">Grootste Kans</h4>
                                            <p className="text-sm font-sans text-[var(--text)]/60 italic leading-relaxed p-6 bg-primary/5 rounded-[1.5rem] border border-primary/10">
                                                {report.missedOpp}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-12 flex flex-col items-center space-y-6 border-t border-white/5">
                                        <p className="text-sm md:text-base font-sans font-bold italic text-primary/80 text-center max-w-md">
                                            {report.ctaText}
                                        </p>
                                        <a href="/contact" className="btn-magnetic group bg-primary text-black px-8 py-4 rounded-full font-black uppercase tracking-widest italic flex items-center gap-4 shadow-xl text-xs">
                                            Gratis check inplannen
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebsiteScanner;
