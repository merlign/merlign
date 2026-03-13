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
    const reportRef = useRef(null);

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

        try {
            // 1. Fetch via allorigins
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();

            if (!data.contents) {
                throw new Error("Kon de website content niet ophalen. Controleer de URL.");
            }

            // 2. Extract innerText (first 3000 chars)
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            const textContent = doc.body.innerText.replace(/\s+/g, ' ').trim().substring(0, 3000);

            if (textContent.length < 50) {
                throw new Error("Te weinig content gevonden op de pagina om te analyseren.");
            }

            setScanStep('analyzing');

            // 3. Call serverless function with streaming
            const analyzeRes = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: textContent })
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
            } catch (e) {
                console.error("JSON Parse Error:", e, fullText);
                throw new Error("Kon het analyserapport niet verwerken.");
            }

        } catch (err) {
            console.error("Scan Error:", err);
            setError(err.message);
            setScanStep('idle');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <section className="py-12 md:py-20 relative overflow-hidden">
            <div className="content-max-width section-px relative z-10 flex justify-center">
                <div className="w-full max-w-3xl bg-white/[0.01] border border-white/5 backdrop-blur-sm rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden">
                    <div className="max-w-xl mx-auto text-center space-y-4 mb-10 relative z-10">
                        <h2 className="text-2xl md:text-3xl font-sans font-bold text-[var(--text)]">
                            Gratis <span className="text-primary font-drama font-normal italic">website scan.</span>
                        </h2>
                        <p className="text-xs md:text-sm font-sans text-[var(--text)]/40 font-light italic max-w-sm mx-auto">
                            Ontdek binnen 30 seconden waar je leads verliest.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto relative z-20">
                        <form onSubmit={handleScan} className="relative mb-8">
                            <div className="relative flex items-center bg-white/[0.02] border border-white/5 p-1.5 rounded-full focus-within:border-primary/30 transition-all">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="jouwsite.nl"
                                    className="flex-grow bg-transparent border-none px-5 py-2.5 font-sans text-sm focus:outline-none text-[var(--text)] placeholder:text-[var(--text)]/20"
                                    disabled={isScanning}
                                />
                                <button
                                    type="submit"
                                    disabled={isScanning || !url}
                                    className="bg-primary text-black px-5 py-2.5 rounded-full font-black uppercase tracking-widest italic flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all text-[10px]"
                                >
                                    {isScanning ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} />}
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
                                    className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center gap-3 text-red-400/80 mb-6"
                                >
                                    <AlertCircle size={14} className="shrink-0" />
                                    <p className="font-sans text-[11px] italic">{error}</p>
                                </motion.div>
                            )}

                            {scanStep === 'analyzing' && !report && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl font-mono text-[10px] text-[var(--text)]/30 whitespace-pre-wrap italic leading-relaxed h-[180px] overflow-y-auto custom-scrollbar">
                                        {streamedText || "AI analyseert..."}
                                    </div>
                                </motion.div>
                            )}

                            {scanStep === 'result' && report && (
                                <motion.div
                                    ref={reportRef}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8 relative z-10"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="relative shrink-0 w-16 h-16">
                                            <svg className="w-full h-full rotate-[-90deg]">
                                                <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                                                <motion.circle
                                                    cx="50%" cy="50%" r="45%"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="transparent"
                                                    strokeDasharray="100 100"
                                                    strokeDashoffset={100 - (report.score * 10)}
                                                    className={report.score <= 4 ? "text-red-500/80" : report.score <= 6 ? "text-orange-500/80" : "text-emerald-500/80"}
                                                    initial={{ strokeDashoffset: 100 }}
                                                    animate={{ strokeDashoffset: 100 - (report.score * 10) }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-xl font-mono font-black italic">{report.score}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-sm font-sans font-bold text-[var(--text)]">Eerste indruk</h3>
                                            <p className="text-xs font-sans font-light italic text-[var(--text)]/50 leading-relaxed">
                                                {report.firstImpression}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] font-black text-primary/60">Bottlenecks</h4>
                                            <ul className="space-y-2">
                                                {report.bottlenecks.map((item, i) => (
                                                    <li key={i} className="flex gap-2 text-[11px] font-sans text-[var(--text)]/60 italic leading-snug">
                                                        <span className="text-primary/40">•</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] font-black text-primary/60">Grootste Kans</h4>
                                            <p className="text-[11px] font-sans text-[var(--text)]/60 italic leading-snug">
                                                {report.missedOpp}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-8 flex flex-col items-center space-y-4 border-t border-white/5">
                                        <p className="text-xs font-sans font-bold italic text-primary/80">
                                            {report.ctaText}
                                        </p>
                                        <a href="/contact" className="bg-primary/10 hover:bg-primary text-primary hover:text-black border border-primary/20 px-6 py-3 rounded-full font-black uppercase tracking-widest italic flex items-center gap-3 transition-all text-[10px]">
                                            Check inplannen
                                            <ArrowRight size={14} />
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
