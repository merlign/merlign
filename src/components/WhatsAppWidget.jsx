import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

const WhatsAppWidget = ({ phoneNumber = "31647693209" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', text: "Hoi! Ik ben de AI-assistent van Merlijn. 👋" },
        { role: 'assistant', text: "Hoe kan ik je vandaag helpen bij het versnellen van je business?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setIsTooltipDismissed(true); // Dismiss tooltip once chat is opened
        }
    }, [chatHistory, isOpen, isTyping]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMsg = message.trim();
        setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
        setMessage('');
        setIsTyping(true);

        // Simulated AI logic with your specific answers
        setTimeout(() => {
            let response = "";
            const lowerMsg = userMsg.toLowerCase();

            if (lowerMsg.includes('website')) {
                response = "Ik bouw high-end maatwerk websites die binnen 72 uur live kunnen staan. Focus ligt op conversie en design voor MKB en solo ondernemers.";
            } else if (lowerMsg.includes('dashboard')) {
                response = "Voor een dashboard heb ik ongeveer 7 dagen nodig. Dit komt omdat ik API-koppelingen leg en alles grondig moet testen voor een foutloos inzicht.";
            } else if (lowerMsg.includes('automatisering') || lowerMsg.includes('ai')) {
                response = "Ik help je repetitief werk te automatiseren. Om te starten heb ik vaak toegang nodig tot je data of accounts, maar dat bespreken we in de gratis check.";
            } else if (lowerMsg.includes('prijs') || lowerMsg.includes('kosten') || lowerMsg.includes('duur')) {
                response = "Prijzen zijn bij mij altijd op basis van maatwerk, omdat elk bedrijf anders is. Onderhoud bied ik overigens al aan vanaf €35,- per maand.";
            } else if (lowerMsg.includes('nodig') || lowerMsg.includes('starten') || lowerMsg.includes('hoe werkt')) {
                response = "Voor de start heb ik toegang tot data en design assets nodig. We beginnen met een gratis check van 20 minuten, daarna gaan we een uurtje de diepte in.";
            } else if (lowerMsg.includes('wie') || lowerMsg.includes('voor wie') || lowerMsg.includes('doelgroep')) {
                response = "Ik werk het liefst voor ambitieuze MKB-ondernemers en solo ondernemers die hun business willen professionaliseren en automatiseren.";
            } else {
                response = "Interessante vraag! Ik kan hier dieper op ingaan tijdens een korte call of via WhatsApp. Zal ik je doorverbinden naar m'n persoonlijke app?";
            }

            setChatHistory(prev => [...prev, { role: 'assistant', text: response }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleWhatsAppRedirect = () => {
        // More robust logic: strip anything that isn't a digit
        let clean = phoneNumber.replace(/\D/g, '');

        // If it starts with 06 (and not 31), replace 0 with 31
        if (clean.startsWith('0')) {
            clean = '31' + clean.substring(1);
        }

        // Ensure it has 31 prefix if it's a Dutch number missing it
        if (!clean.startsWith('31') && clean.length >= 9) {
            clean = '31' + clean;
        }

        window.open(`https://wa.me/${clean}`, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[1000] flex flex-col items-end gap-4">
            <AnimatePresence>
                {!isOpen && !isTooltipDismissed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: 20, scale: 0, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, x: 10, y: 10, transition: { duration: 0.2, delay: 0 } }}
                        transition={{
                            delay: 5,
                            duration: 0.6,
                            type: "spring",
                            damping: 20,
                            stiffness: 120
                        }}
                        className="bg-white px-5 py-3 rounded-2xl rounded-br-none shadow-2xl mb-2 relative hidden md:flex items-center gap-3 border border-black/5"
                    >
                        <p className="font-sans text-black text-[14px] font-bold whitespace-nowrap">
                            Vragen? Stel ze hier.
                        </p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsTooltipDismissed(true);
                            }}
                            className="text-black/30 hover:text-black transition-colors"
                        >
                            <X size={14} />
                        </button>
                        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white rotate-45 border-r border-b border-black/5" />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-[340px] md:w-[420px] h-[550px] bg-[var(--background)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl mb-4"
                    >
                        {/* Header with Photo */}
                        <div className="bg-primary p-6 md:p-8 flex items-center justify-between shadow-lg relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-inner bg-black/20">
                                        <img src="/merlijn-portrait.png" alt="Merlijn" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-primary shadow-sm" />
                                </div>
                                <div className="text-white">
                                    <h4 className="font-sans font-bold text-base leading-none">Merlijn AI</h4>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/20 transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide">
                            {chatHistory.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10, y: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] md:text-[14px] leading-relaxed font-sans shadow-sm ${msg.role === 'user'
                                        ? 'bg-primary text-white font-bold rounded-tr-none'
                                        : 'bg-[var(--text)]/5 border border-[var(--border)] text-[var(--text)]/80 italic rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-[var(--text)]/5 border border-[var(--border)] p-4 rounded-2xl rounded-tl-none flex gap-1.5">
                                        {[0, 1, 2].map((d) => (
                                            <motion.div
                                                key={d}
                                                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                                                className="w-1.5 h-1.5 bg-primary rounded-full"
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Action Container */}
                        <div className="p-6 md:p-8 bg-[var(--text)]/[0.02] border-t border-[var(--border)] space-y-4">
                            <div className="relative">
                                <textarea
                                    value={message}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Vraag iets aan de AI..."
                                    className="w-full bg-[var(--text)]/5 border border-[var(--border)] rounded-2xl p-4 pr-14 text-[var(--text)] font-sans text-sm focus:outline-none focus:border-primary transition-all min-h-[60px] max-h-[120px] resize-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!message.trim() || isTyping}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all ${message.trim() ? 'bg-primary text-white scale-100 shadow-lg' : 'bg-[var(--text)]/5 text-[var(--text)]/20 scale-90'}`}
                                >
                                    <Send size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleWhatsAppRedirect}
                                className="w-full group flex items-center justify-center gap-4 bg-green-500 hover:bg-green-600 p-4 rounded-2xl transition-all duration-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                            >
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                                    <MessageCircle className="text-white fill-white" size={18} />
                                </div>
                                <span className="text-[14px] font-bold text-white">Spreek de echte Merlijn</span>
                                <ArrowRight size={14} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "linear" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 relative group overflow-hidden ${isOpen ? 'bg-white' : 'bg-primary shadow-[0_0_30px_rgba(99,102,241,0.3)]'}`}
            >
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-50" />

                {isOpen ? (
                    <X className="text-black relative z-10" size={28} />
                ) : (
                    <MessageCircle className="text-white relative z-10" size={32} />
                )}
            </motion.button>
        </div>
    );
};

export default WhatsAppWidget;
