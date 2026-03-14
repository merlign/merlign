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
                throw new Error(errorText || "Er is een onbekende fout opgetreden bij de analyse.");
            }

            const reader = analyzeRes.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Use stream: true to handle partial multi-byte characters
                buffer += decoder.decode(value, { stream: true });

                // Process only full lines from the buffer
                const lines = buffer.split('\n');
                // Keep the last partial line in the buffer
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue;

                    try {
                        const data = JSON.parse(trimmedLine.slice(6));
                        let text = '';

                        if (data.type === 'content_block_delta' && data.delta?.type === 'text_delta') {
                            text = data.delta.text;
                        } else if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                            text = data.candidates[0].content.parts[0].text;
                        }

                        if (text) {
                            fullText += text;
                            const currentFullText = fullText;
                            setStreamedText(currentFullText);
                        }
                    } catch (e) {
                        // Skip invalid JSON chunks
                    }
                }
            }

            // 4. Parse final JSON
            try {
                // Find potential JSON block and clean it aggressively
                let cleanText = fullText.trim();
                // Remove markdown code blocks if present
                cleanText = cleanText.replace(/```json/g, '').replace(/```/g, '').trim();

                const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
                const jsonStr = jsonMatch ? jsonMatch[0] : cleanText;
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
        <section className="relative z-0">
            <div className="content-max-width section-px relative z-10 flex justify-center">
                <div className="w-full max-w-4xl bg-gradient-to-b from-[#6a6df4] to-[#4c4edf] shadow-[0_30px_60px_-15px_rgba(99,102,241,0.4)] border border-white/15 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
                    <div className="max-w-2xl mx-auto text-center space-y-6 mb-12 relative z-10">
                        <h2 className="font-sans font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
                            Doe de gratis <span className="text-white font-drama font-normal text-4xl sm:text-5xl md:text-6xl italic">website scan.</span>
                        </h2>
                        <p className="text-sm md:text-base font-sans text-white/80 font-light italic max-w-sm mx-auto">
                            Ontdek binnen 30 seconden waar je leads verliest.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto relative z-20">
                        <form onSubmit={handleScan} className={`relative ${scanStep !== 'idle' || error ? 'mb-12' : ''}`}>
                            <div className="relative flex flex-row items-center bg-black/40 border border-white/10 p-1.5 sm:p-2 rounded-full focus-within:border-white/30 focus-within:bg-black/60 transition-all shadow-xl gap-2 sm:gap-0">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="jouwsite.nl"
                                    className="flex-grow bg-transparent border-none px-4 sm:px-6 py-3 font-sans text-sm sm:text-base focus:outline-none text-white placeholder:text-white/50 text-left min-w-0"
                                    disabled={isScanning}
                                />
                                <button
                                    type="submit"
                                    disabled={isScanning || !url}
                                    className="bg-white text-primary shrink-0 px-6 sm:px-8 py-3 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all text-[10px] sm:text-xs shadow-md"
                                >
                                    {isScanning ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
                                    <span className="hidden sm:inline">{isScanning ? 'Scannen' : 'Scan'}</span>
                                    <span className="sm:hidden">{isScanning ? 'Bezig' : 'Scan'}</span>
                                </button>
                            </div>
                        </form>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="p-5 rounded-[2rem] bg-black/20 border border-white/20 flex items-center gap-4 text-white mb-8"
                                >
                                    <AlertCircle size={16} className="shrink-0 text-red-300" />
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
                                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-black text-white animate-pulse">
                                            {scanStep === 'fetching' ? 'Website inladen...' : 'AI analyseert content...'}
                                        </span>
                                        <span className="text-[10px] font-mono font-black italic text-white/80">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
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
                                    <div className="bg-black/10 border border-white/10 p-6 rounded-[2rem] font-mono text-xs text-white/70 whitespace-pre-wrap italic leading-relaxed h-[200px] overflow-y-auto custom-scrollbar">
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
                                                <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-black/10" />
                                                <motion.circle
                                                    cx="50%" cy="50%" r="45%"
                                                    stroke="currentColor"
                                                    strokeWidth="5"
                                                    fill="transparent"
                                                    strokeDasharray="100 100"
                                                    strokeDashoffset={100 - (report.score * 10)}
                                                    className={report.score <= 4 ? "text-red-300" : report.score <= 6 ? "text-yellow-300" : "text-emerald-300"}
                                                    initial={{ strokeDashoffset: 100 }}
                                                    animate={{ strokeDashoffset: 100 - (report.score * 10) }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-2xl font-mono font-black italic text-white">{report.score}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-xl font-sans font-bold text-white tracking-tight">Analyse resultaat</h3>
                                            <p className="text-sm md:text-base font-sans font-medium text-white/95 leading-relaxed max-w-lg">
                                                {report.firstImpression}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/10">
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-white/60">Conversie Bottlenecks</h4>
                                            <ul className="space-y-4">
                                                {report.bottlenecks.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-white/10 text-[15px] font-sans text-white leading-relaxed shadow-lg">
                                                        <span className="text-primary/70 font-mono text-xs font-black mt-1">0{i + 1}</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-white/60">Grootste Kans</h4>
                                            <div className="text-[15px] font-sans font-medium text-white leading-relaxed p-6 bg-black/60 rounded-[2rem] border border-white/10 shadow-lg min-h-[140px] flex items-center">
                                                {report.missedOpp}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 flex flex-col items-center space-y-10">
                                        <div className="flex flex-col items-center">
                                            <p className="text-xs font-mono uppercase tracking-[0.3em] font-black text-white/40 mb-4">Urgentie</p>
                                            <div className="px-8 py-5 rounded-3xl md:rounded-full bg-white/10 border border-white/10 text-white font-drama italic text-xl md:text-2xl text-center shadow-2xl backdrop-blur-sm leading-tight">
                                                "{report.ctaText}"
                                            </div>
                                        </div>

                                        <a href="/contact" className="btn-magnetic group bg-white text-primary px-8 py-4 rounded-full font-black uppercase tracking-widest italic flex items-center gap-4 shadow-[0_0_30px_rgba(255,255,255,0.3)] text-xs">
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
