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
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div className="content-max-width section-px relative z-10 flex justify-center">
                <div className="w-full max-w-5xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
                    {/* Interior glow effects */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="max-w-3xl mx-auto text-center space-y-8 mb-16 relative z-10">
                        <h2 className="text-h2 font-sans font-bold text-[var(--text)] text-3xl md:text-5xl lg:text-7xl">
                            Doe de gratis <span className="text-primary font-drama font-normal text-h2-serif text-h1-serif">website scan.</span>
                        </h2>
                        <p className="text-base md:text-lg font-sans text-[var(--text)]/60 font-light italic max-w-xl mx-auto text-center">
                            Ontdek binnen 30 seconden waar je leads verliest. Onze AI analyseert je content en geeft je direct 3 concrete verbeterpunten voor meer conversie.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto relative z-20">
                        <form onSubmit={handleScan} className="relative group mb-12">
                            <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all rounded-full" />
                            <div className="relative flex items-center bg-[var(--paper)]/40 border border-[var(--border)] p-2 rounded-full focus-within:border-primary/50 transition-all shadow-xl">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="jouwsite.nl"
                                    className="flex-grow bg-transparent border-none px-6 py-4 font-sans text-base md:text-lg focus:outline-none text-[var(--text)] placeholder:text-[var(--text)]/20"
                                    disabled={isScanning}
                                />
                                <button
                                    type="submit"
                                    disabled={isScanning || !url}
                                    className="bg-primary text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-black uppercase tracking-widest italic flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all shadow-lg text-xs md:text-sm"
                                >
                                    {isScanning ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Scannen...
                                        </>
                                    ) : (
                                        <>
                                            Scan
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 p-6 rounded-[2rem] flex items-center gap-4 text-red-400 mb-8"
                                >
                                    <AlertCircle className="shrink-0" />
                                    <p className="font-sans font-medium italic text-sm">{error}</p>
                                </motion.div>
                            )}

                            {scanStep === 'analyzing' && !report && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 text-primary animate-pulse">
                                        <Zap size={18} />
                                        <span className="font-mono text-xs uppercase tracking-widest font-black italic">AI analyseert...</span>
                                    </div>
                                    <div className="bg-[var(--paper)]/40 border border-[var(--border)] p-6 rounded-[2rem] font-mono text-[11px] md:text-xs text-[var(--text)]/60 whitespace-pre-wrap italic leading-relaxed h-[250px] overflow-y-auto custom-scrollbar">
                                        {streamedText || "Wachten op AI respons..."}
                                    </div>
                                </motion.div>
                            )}

                            {scanStep === 'result' && report && (
                                <motion.div
                                    ref={reportRef}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-12 relative z-10"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                                        {/* Score Circle */}
                                        <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32">
                                            <svg className="w-full h-full rotate-[-90deg]">
                                                <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-[var(--border)]" />
                                                <motion.circle
                                                    cx="50%" cy="50%" r="45%"
                                                    stroke="currentColor"
                                                    strokeWidth="6"
                                                    fill="transparent"
                                                    strokeDasharray="100 100"
                                                    strokeDashoffset={100 - (report.score * 10)}
                                                    className={report.score <= 4 ? "text-red-500" : report.score <= 6 ? "text-orange-500" : "text-emerald-500"}
                                                    initial={{ strokeDashoffset: 100 }}
                                                    animate={{ strokeDashoffset: 100 - (report.score * 10) }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl md:text-4xl font-mono font-black italic">{report.score}</span>
                                                <span className="text-[8px] uppercase font-black opacity-40 tracking-widest">/ 10</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[8px] uppercase tracking-widest font-black italic">
                                                {report.scoreLabel}
                                            </div>
                                            <h3 className="text-2xl font-sans font-bold text-[var(--text)] leading-tight">Eerste indruk</h3>
                                            <p className="text-base font-sans font-light italic text-[var(--text)]/80 leading-relaxed">
                                                {report.firstImpression}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[var(--border)]">
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-lg font-sans font-bold text-[var(--text)]">
                                                <AlertCircle size={18} className="text-primary" />
                                                Bottlenecks
                                            </h4>
                                            <ul className="space-y-3">
                                                {report.bottlenecks.map((item, i) => (
                                                    <li key={i} className="flex gap-3 group">
                                                        <span className="font-mono text-primary/40 font-black italic text-xs">0{i + 1}</span>
                                                        <span className="font-sans text-[var(--text)]/70 italic leading-relaxed text-sm group-hover:text-[var(--text)] transition-colors">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-lg font-sans font-bold text-[var(--text)]">
                                                <BarChart3 size={18} className="text-primary" />
                                                Gemiste kans
                                            </h4>
                                            <p className="font-sans text-[var(--text)]/70 italic leading-relaxed text-sm p-5 bg-primary/5 rounded-2xl border border-primary/10">
                                                {report.missedOpp}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-10 flex flex-col items-center space-y-6 border-t border-[var(--border)]">
                                        <p className="text-lg font-sans font-bold italic text-primary text-center">
                                            {report.ctaText}
                                        </p>
                                        <a href="/contact" className="btn-magnetic group bg-primary text-black px-10 py-5 rounded-full font-black uppercase tracking-widest italic flex items-center gap-4 shadow-2xl text-xs">
                                            Gratis check inplannen
                                            <ArrowRight size={18} />
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
