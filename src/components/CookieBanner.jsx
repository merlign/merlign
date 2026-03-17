import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [preferences, setPreferences] = useState({
        functional: true, // Always true as they are necessary
        analytical: true
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        } else {
            const savedPrefs = JSON.parse(localStorage.getItem('cookie-prefs') || '{"analytical":true}');
            if (savedPrefs.analytical) injectClarity();
        }
    }, []);

    const injectClarity = () => {
        if (window.clarity) return;
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "vx9xswmkx1");
    };

    const handleAcceptAll = () => {
        const prefs = { functional: true, analytical: true };
        localStorage.setItem('cookie-consent', 'granted');
        localStorage.setItem('cookie-prefs', JSON.stringify(prefs));
        setIsVisible(false);
        injectClarity();
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookie-consent', 'granted');
        localStorage.setItem('cookie-prefs', JSON.stringify(preferences));
        setIsVisible(false);
        if (preferences.analytical) injectClarity();
    };

    const handleDeclineAll = () => {
        const prefs = { functional: true, analytical: false };
        localStorage.setItem('cookie-consent', 'declined');
        localStorage.setItem('cookie-prefs', JSON.stringify(prefs));
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-[480px] z-[200]"
                >
                    <div className="bg-[var(--background)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        {/* High-fidelity background detail */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />

                        <div className="relative z-10 flex flex-col gap-8">
                            {!showOptions ? (
                                <>
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                                            <ShieldCheck className="text-primary" size={28} />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl md:text-2xl font-sans font-bold text-[var(--text)] tracking-tight">Koekjes?</h4>
                                            <p className="text-[var(--text)]/80 font-sans text-base leading-relaxed">
                                                Ik gebruik cookies om te zien hoe de site presteert en om jouw ervaring te verbeteren. Geen advertenties, alleen pure kwaliteitsverbetering.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={handleAcceptAll}
                                            className="w-full btn-magnetic group bg-primary text-white py-5 rounded-full flex items-center justify-center gap-2 overflow-hidden border border-white/10"
                                        >
                                            <span className="relative z-10 font-bold text-base">Alles accepteren</span>
                                            <Check size={18} className="relative z-10" />
                                            <div className="btn-bg bg-primary shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
                                        </button>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setShowOptions(true)}
                                                className="flex-1 font-sans text-sm font-bold text-[var(--text)]/40 hover:text-primary transition-colors py-2"
                                            >
                                                Instellingen aanpassen
                                            </button>
                                            <button
                                                onClick={handleDeclineAll}
                                                className="flex-1 font-sans text-sm font-bold text-[var(--text)]/40 hover:text-[var(--text)] transition-colors py-2"
                                            >
                                                Alleen noodzakelijk
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-6">
                                        <h4 className="text-xl font-sans font-bold text-[var(--text)]">Voorkeuren</h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--text)]/[0.03] border border-[var(--border)]">
                                                <div>
                                                    <p className="font-bold text-[var(--text)]">Functioneel</p>
                                                    <p className="text-xs text-[var(--text)]/50 italic">Noodzakelijk voor de site</p>
                                                </div>
                                                <div className="w-10 h-6 bg-primary/20 rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full" />
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setPreferences(prev => ({ ...prev, analytical: !prev.analytical }))}
                                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${preferences.analytical ? 'bg-primary/5 border-primary/30' : 'bg-[var(--text)]/[0.03] border-[var(--border)]'}`}
                                            >
                                                <div className="text-left">
                                                    <p className={`font-bold ${preferences.analytical ? 'text-primary' : 'text-[var(--text)]'}`}>Analytisch</p>
                                                    <p className="text-xs text-[var(--text)]/50 italic">Helpt mij de site te verbeteren</p>
                                                </div>
                                                <div className={`w-10 h-6 rounded-full relative transition-colors ${preferences.analytical ? 'bg-primary' : 'bg-[var(--text)]/20'}`}>
                                                    <motion.div
                                                        animate={{ x: preferences.analytical ? 16 : 4 }}
                                                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSavePreferences}
                                        className="w-full btn-magnetic group bg-primary text-white py-4 rounded-full flex items-center justify-center gap-2 overflow-hidden"
                                    >
                                        <span className="relative z-10 font-bold">Voorkeuren opslaan</span>
                                        <div className="btn-bg bg-primary" />
                                    </button>
                                </>
                            )}

                            <p className="text-[11px] text-[var(--text)]/30 font-sans text-center">
                                Door te accepteren help je mij de site beter te maken. <br />
                                Bekijk de <a href="/privacy" className="underline hover:text-primary transition-colors">Privacy Policy</a> voor meer info.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
