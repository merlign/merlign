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
                // Claude SSE format handling
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.type === 'content_block_delta' && data.delta.text) {
                                fullText += data.delta.text;
                                setStreamedText(fullText);
                            }
                        } catch (e) {
                            // Skip invalid JSON chunks
                        }
                    }
                }
            }

            // 4. Parse final JSON
            try {
                // Find potential JSON block if Claude included any text around it
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
        <section className="py-20 md:py-32 border-t border-[var(--border)] overflow-hidden">
            <div className="content-max-width section-px">
                <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
                    <h2 className="text-h2 font-sans font-bold text-[var(--text)]">
                        Doe de gratis <span className="text-primary font-drama font-normal text-h2-serif text-h1-serif">website scan.</span>
                    </h2>
                    <p className="text-lg md:text-xl font-sans text-[var(--text)]/60 font-light italic max-w-2xl mx-auto text-center">
                        Ontdek binnen 30 seconden waar je leads verliest. Claude analyseert je content en geeft je direct 3 concrete verbeterpunten voor meer conversie.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <form onSubmit={handleScan} className="relative group mb-12">
                        <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all rounded-full" />
                        <div className="relative flex items-center bg-[var(--paper)]/40 border border-[var(--border)] p-2 rounded-full focus-within:border-primary/50 transition-all shadow-xl">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="jouwsite.nl"
                                className="flex-grow bg-transparent border-none px-6 py-4 font-sans text-lg focus:outline-none text-[var(--text)] placeholder:text-[var(--text)]/20"
                                disabled={isScanning}
                            />
                            <button
                                type="submit"
                                disabled={isScanning || !url}
                                className="bg-primary text-black px-8 py-4 rounded-full font-black uppercase tracking-widest italic flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                            >
                                {isScanning ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Scannen...
                                    </>
                                ) : (
                                    <>
                                        Scan
                                        <ArrowRight size={20} />
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
                                <p className="font-sans font-medium italic">{error}</p>
                            </motion.div>
                        )}

                        {scanStep === 'analyzing' && !report && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 text-primary animate-pulse">
                                    <Zap size={20} />
                                    <span className="font-mono text-sm uppercase tracking-widest font-black italic">Claude analyseert...</span>
                                </div>
                                <div className="bg-[var(--paper)]/40 border border-[var(--border)] p-8 rounded-[2rem] font-mono text-sm text-[var(--text)]/60 whitespace-pre-wrap italic leading-relaxed h-[300px] overflow-y-auto custom-scrollbar">
                                    {streamedText || "Wachten op AI respons..."}
                                </div>
                            </motion.div>
                        )}

                        {scanStep === 'result' && report && (
                            <motion.div
                                ref={reportRef}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[var(--paper)]/60 border border-[var(--border)] p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-12 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                                    {/* Score Circle */}
                                    <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40">
                                        <svg className="w-full h-full rotate-[-90deg]">
                                            <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[var(--border)]" />
                                            <motion.circle
                                                cx="50%" cy="50%" r="45%"
                                                stroke="currentColor"
                                                strokeWidth="8"
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
                                            <span className="text-4xl md:text-5xl font-mono font-black italic">{report.score}</span>
                                            <span className="text-[10px] uppercase font-black opacity-40 tracking-widest">/ 10</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] uppercase tracking-widest font-black italic">
                                            {report.scoreLabel}
                                        </div>
                                        <h3 className="text-3xl font-sans font-bold text-[var(--text)] leading-tight">Eerste indruk</h3>
                                        <p className="text-lg font-sans font-light italic text-[var(--text)]/80 leading-relaxed max-w-xl">
                                            {report.firstImpression}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-[var(--border)]">
                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-3 text-xl font-sans font-bold text-[var(--text)]">
                                            <AlertCircle size={20} className="text-primary" />
                                            Conversie Bottlenecks
                                        </h4>
                                        <ul className="space-y-4">
                                            {report.bottlenecks.map((item, i) => (
                                                <li key={i} className="flex gap-4 group">
                                                    <span className="font-mono text-primary/40 font-black italic">0{i + 1}</span>
                                                    <span className="font-sans text-[var(--text)]/70 italic leading-relaxed group-hover:text-[var(--text)] transition-colors">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-3 text-xl font-sans font-bold text-[var(--text)]">
                                            <BarChart3 size={20} className="text-primary" />
                                            Grootste gemiste kans
                                        </h4>
                                        <p className="font-sans text-[var(--text)]/70 italic leading-relaxed p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                            {report.missedOpp}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-12 flex flex-col items-center space-y-6 border-t border-[var(--border)]">
                                    <p className="text-xl font-sans font-bold italic text-primary text-center">
                                        {report.ctaText}
                                    </p>
                                    <a href="/contact" className="btn-magnetic group bg-primary text-black px-12 py-6 rounded-full font-black uppercase tracking-widest italic flex items-center gap-4 shadow-2xl">
                                        Gratis check inplannen
                                        <ArrowRight size={20} />
                                    </a>
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
