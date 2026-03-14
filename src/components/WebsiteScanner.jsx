import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Shield, BarChart3, ArrowRight, RefreshCw, Smartphone, Globe, AlertCircle, Loader2, Lock, Mail, User, CheckCircle2, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
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
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leadForm, setLeadForm] = useState({ name: '', email: '' });
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const reportRef = useRef(null);
    const progressInterval = useRef(null);

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingLead(true);

        try {
            // Send email via EmailJS
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
                {
                    to_name: leadForm.name,
                    to_email: leadForm.email,
                    from_name: "Merlijn",
                    reply_to: "contact@merlign.com",
                    subject: `Jouw Website Verbeterplan voor ${url}`,
                    message: `
                        Hoi ${leadForm.name},
                        
                        Je hebt zojuist een scan gedaan voor ${url}. Hier zijn de belangrijkste punten uit je verbeterplan:
                        
                        RESULTAAT: ${report.score}/10 (${report.scoreLabel})
                        
                        HOE JE SITE NU OVERKOMT:
                        ${report.firstImpression}
                        
                        BELANGRIJKSTE VERBETERPUNTEN:
                        1. ${report.bottlenecks[0]}
                        2. ${report.bottlenecks[1]}
                        3. ${report.bottlenecks[2]}
                        
                        GROOTSTE GROEIKANS:
                        ${report.missedOpp}
                        
                        ACTIE VEREIST:
                        ${report.ctaText}
                        
                        Wil je hier eens rustig over doorpraten? Plan dan een gratis adviesgesprek in via de website.
                        
                        Met vriendelijke groet,
                        Merlijn
                    `
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // Also notify Merlijn (the owner) about the new lead
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: leadForm.name,
                    from_email: leadForm.email,
                    subject: `NIEUWE SCAN LEAD: ${leadForm.name}`,
                    message: `Er is een nieuwe scan gedaan voor: ${url}\nNaam: ${leadForm.name}\nEmail: ${leadForm.email}`
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setIsSent(true);

        } catch (err) {
            console.error("Lead submission error:", err);
            // Show error in modal? For now just log
        } finally {
            setIsSubmittingLead(false);
        }
    };

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

        // 1. Check for Test Mode
        if (cleanUrl.toLowerCase().includes('test') || cleanUrl.toLowerCase().includes('demo')) {
            setTimeout(() => {
                setScanStep('analyzing');
                setStreamedText('Deel van demo analyse wordt geladen...');

                setTimeout(() => {
                    const mockReport = {
                        score: 4,
                        scoreLabel: "Kan beter",
                        firstImpression: "Dit is een TEST SCAN. Je website ziet er netjes uit, maar het is niet direct duidelijk wat een bezoeker nu precies moet doen om klant te worden.",
                        bottlenecks: [
                            "Het is niet meteen duidelijk wat je verkoopt of aanbiedt.",
                            "Bezoekers moeten te veel scrollen om bij je contactgegevens te komen.",
                            "Er zijn te weinig bewijzen (zoals ervaringen van klanten) die vertrouwen wekken."
                        ],
                        missedOpp: "Als je een duidelijke 'nu beginnen' knop toevoegt bovenaan de pagina, zul je waarschijnlijk direct meer aanvragen krijgen.",
                        ctaText: "TEST: Je loopt op dit moment echt klanten mis."
                    };
                    setReport(mockReport);
                    setScanStep('result');
                    setProgress(100);
                    setIsScanning(false);
                    if (progressInterval.current) clearInterval(progressInterval.current);
                }, 2000);
            }, 1000);
            return;
        }

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
                <div className="w-full max-w-4xl bg-gradient-to-b from-[#6a6df4] to-[#4c4edf] shadow-[0_30px_60px_-15px_rgba(99,102,241,0.4)] border border-white/15 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 pb-20 sm:pb-24 relative overflow-hidden">
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
                                            <h3 className="text-xl font-sans font-bold text-white tracking-tight">Analyseoverzicht</h3>
                                            <p className="text-sm md:text-base font-sans font-medium text-white/95 leading-relaxed max-w-lg">
                                                {report.firstImpression}
                                            </p>
                                        </div>
                                    </div>

                                    {!leadCaptured ? (
                                        <div className="relative pt-10 border-t border-white/10 overflow-hidden min-h-[450px]">
                                            {/* Blurred/Locked Content Preview */}
                                            <div
                                                className="grid grid-cols-1 md:grid-cols-2 gap-10 opacity-50 blur-[4px] pointer-events-none select-none"
                                                style={{
                                                    maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                                                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 60%, transparent 100%)'
                                                }}
                                            >
                                                <div className="space-y-6">
                                                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-white/60">Belangrijke verbeterpunten</h4>
                                                    <div className="space-y-3">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="h-16 bg-white/10 rounded-2xl border border-white/5 flex items-center px-4 gap-4">
                                                                <div className="w-6 h-6 rounded-full bg-white/10 shrink-0" />
                                                                <div className="h-2 w-full bg-white/10 rounded-full" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-white/60">Grootste groeikans</h4>
                                                    <div className="p-6 bg-white/10 rounded-[2rem] border border-white/5 space-y-4">
                                                        <div className="h-2 w-full bg-white/20 rounded-full" />
                                                        <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                                                        <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Lead Form Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center p-6 z-20">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-center space-y-6"
                                                >
                                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-xl border border-white/20">
                                                        <Lock className="text-white" size={24} />
                                                    </div>
                                                    <div className="space-y-3 drop-shadow-2xl">
                                                        <h3 className="text-2xl md:text-3xl font-sans font-bold text-white uppercase tracking-tight">Rapport staat klaar</h3>
                                                        <p className="text-white font-medium text-sm md:text-base max-w-sm mx-auto leading-relaxed px-4">
                                                            We hebben precies gevonden waar mensen nu op je website afhaken. Bekijk je persoonlijke analyse om te zien hoe je direct meer aanvragen krijgt.
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => setIsModalOpen(true)}
                                                        className="bg-white text-primary px-10 py-4 rounded-full font-black uppercase tracking-widest flex items-center gap-4 mx-auto hover:scale-[1.05] active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                                    >
                                                        Mijn analyse bekijken
                                                        <ArrowRight size={18} />
                                                    </button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/10">
                                                <div className="space-y-4">
                                                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-white/60">Belangrijke verbeterpunten</h4>
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
                                                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-white/60">Grootste groeikans</h4>
                                                    <div className="text-[15px] font-sans font-medium text-white leading-relaxed p-6 bg-black/60 rounded-[2rem] border border-white/10 shadow-lg min-h-[140px] flex items-center">
                                                        {report.missedOpp}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-10 flex flex-col items-center space-y-10">
                                                <div className="flex flex-col items-center">
                                                    <p className="text-xs font-mono uppercase tracking-[0.3em] font-black text-white/40 mb-4">Actie vereist</p>
                                                    <div className="px-8 py-5 rounded-3xl md:rounded-full bg-white/10 border border-white/10 text-white font-drama italic text-xl md:text-2xl text-center shadow-2xl backdrop-blur-sm leading-tight text-emerald-300">
                                                        "{report.ctaText}"
                                                    </div>
                                                </div>

                                                <a href="/contact" className="btn-magnetic group bg-white text-primary px-8 py-4 rounded-full font-black uppercase tracking-widest italic flex items-center gap-4 shadow-[0_0_30px_rgba(255,255,255,0.3)] text-xs">
                                                    Gratis adviesgesprek
                                                    <ArrowRight size={16} />
                                                </a>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Lead Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-6 right-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 group"
                                >
                                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>

                            <div className="text-center space-y-6">
                                <AnimatePresence mode="wait">
                                    {!isSent ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-6"
                                        >
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <Mail className="text-primary" size={28} />
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-sans font-bold text-gray-900 tracking-tight">Waar mogen we de analyse naartoe sturen?</h3>
                                            <p className="text-gray-500 text-sm md:text-base leading-relaxed px-4">
                                                We hebben het volledige verbeterplan voor je klaarstaan. Vul je gegevens in en we sturen het direct naar je toe.
                                            </p>

                                            <form onSubmit={handleLeadSubmit} className="space-y-4 pt-4 text-left">
                                                <div className="relative">
                                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Je voornaam"
                                                        value={leadForm.name}
                                                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                                                        className="w-full bg-gray-50 border border-gray-100 rounded-full py-5 pl-14 pr-8 text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-sans text-lg"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        required
                                                        type="email"
                                                        placeholder="Je emailadres"
                                                        value={leadForm.email}
                                                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                                        className="w-full bg-gray-50 border border-gray-100 rounded-full py-5 pl-14 pr-8 text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-sans text-lg"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmittingLead}
                                                    className="w-full bg-primary text-white font-black uppercase tracking-widest py-5 rounded-full flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-98 transition-all shadow-2xl shadow-primary/30"
                                                >
                                                    {isSubmittingLead ? <Loader2 className="animate-spin" size={24} /> : <Zap size={20} />}
                                                    {isSubmittingLead ? 'Bezig met versturen...' : 'Ontvang mijn rapport'}
                                                </button>
                                            </form>
                                            <p className="text-[10px] text-gray-400 italic">Nooit spam. Alleen vlijmscherp advies.</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-8 space-y-6"
                                        >
                                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle2 className="text-emerald-500" size={40} />
                                            </div>
                                            <h3 className="text-3xl font-sans font-bold text-gray-900 tracking-tight">Verzonden!</h3>
                                            <div className="space-y-4">
                                                <p className="text-gray-600 text-lg leading-relaxed">
                                                    Hoi {leadForm.name}, je verbeterplan is onderweg naar <strong>{leadForm.email}</strong>.
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    Check ook even je spam-folder als je over 2 minuten nog niks hebt ontvangen.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setIsModalOpen(false)}
                                                className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-black"
                                            >
                                                Sluiten
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default WebsiteScanner;
