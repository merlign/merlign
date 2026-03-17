import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        } else if (consent === 'granted') {
            injectClarity();
        }
    }, []);

    const injectClarity = () => {
        if (window.clarity) return; // Already loaded

        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "vx9xswmkx1");
    };

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'granted');
        setIsVisible(false);
        injectClarity();
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
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
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[420px] z-[200]"
                >
                    <div className="bg-[var(--background)]/80 backdrop-blur-2xl border border-[var(--border)] rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                        {/* Decorative Background Blob */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />

                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                                    <ShieldCheck className="text-primary" size={24} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-lg md:text-xl font-sans font-bold text-[var(--text)] tracking-tight">Koekjes?</h4>
                                    <p className="text-[var(--text)]/60 font-sans text-sm leading-relaxed italic">
                                        Ik gebruik alleen cookies om te begrijpen hoe de site wordt gebruikt (zoals heatmaps), zodat ik de ervaring kan blijven verbeteren. Geen vage advertentie-trackers.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 btn-magnetic group bg-primary text-white py-4 px-6 rounded-full flex items-center justify-center gap-2 overflow-hidden border border-white/10"
                                >
                                    <span className="relative z-10 font-bold text-sm">Accepteren</span>
                                    <Check size={16} className="relative z-10" />
                                    <div className="btn-bg bg-primary shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
                                </button>

                                <button
                                    onClick={handleDecline}
                                    className="flex-1 btn-magnetic group bg-[var(--text)]/5 text-[var(--text)]/40 hover:text-[var(--text)] py-4 px-6 rounded-full flex items-center justify-center gap-2 overflow-hidden border border-[var(--border)] transition-colors"
                                >
                                    <span className="relative z-10 font-bold text-sm">Weigeren</span>
                                    <X size={16} className="relative z-10" />
                                    <div className="btn-bg bg-[var(--text)]/10" />
                                </button>
                            </div>

                            <p className="text-[10px] text-[var(--text)]/30 font-sans text-center">
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
