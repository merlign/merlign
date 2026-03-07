import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles, User, ArrowRight } from 'lucide-react';

const WhatsAppWidget = ({ phoneNumber = "+31612345678" }) => {
    const [isOpen, setIsOpen] = useState(false);
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
        }
    }, [chatHistory, isOpen, isTyping]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMsg = message.trim();
        setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
        setMessage('');
        setIsTyping(true);

        // Simulate AI "thinking" and generating a response based on Merlign's services
        setTimeout(() => {
            let response = "";
            const lowerMsg = userMsg.toLowerCase();

            if (lowerMsg.includes('website')) {
                response = "Ik kan een high-end website voor je bouwen die binnen 72 uur live staat. Geen standaard templates, maar echt maatwerk gericht op conversie. Wil je hier meer over weten?";
            } else if (lowerMsg.includes('dashboard')) {
                response = "Mijn Smart Dashboards koppelen al je data (omzet, leads, ad-spend) in één overzicht. Zo kun je sturen op cijfers in plaats van op gevoel.";
            } else if (lowerMsg.includes('automatisering') || lowerMsg.includes('ai')) {
                response = "Ik help ondernemers repetitief werk te automatiseren met AI en slimme workflows. Denk aan leadopvolging of administratie die 'zichzelf' doet.";
            } else if (lowerMsg.includes('prijs') || lowerMsg.includes('kosten')) {
                response = "Omdat elk project maatwerk is, heb ik geen vaste prijslijst. Maar ik werk altijd met een duidelijke investering vooraf die zich snel terugverdient door tijd- of omzetwinst.";
            } else {
                response = "Goede vraag! Voor dit soort specifieke zaken kan ik je het beste even persoonlijk spreken. Zal ik je doorverbinden naar m'n persoonlijke WhatsApp?";
            }

            setChatHistory(prev => [...prev, { role: 'assistant', text: response }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleWhatsAppRedirect = () => {
        const lastConv = chatHistory.slice(-2).map(m => `${m.role === 'user' ? 'Mijn vraag' : 'Merlijn'}: ${m.text}`).join('\n\n');
        const encodedMessage = encodeURIComponent(`Hoi Merlijn, ik heb een vraag via je AI-assistent:\n\n${lastConv}`);
        const cleanPhone = phoneNumber.replace(/\+/g, '').replace(/\s/g, '');
        window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[1000] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-[340px] md:w-[420px] h-[550px] bg-[#141414] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl"
                    >
                        {/* Header with Photo */}
                        <div className="bg-primary p-6 md:p-8 flex items-center justify-between shadow-lg relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-inner">
                                        <img src="/merlijn-portrait.png" alt="Merlijn" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-primary shadow-sm" />
                                </div>
                                <div className="text-white">
                                    <h4 className="font-sans font-black text-sm uppercase tracking-widest leading-none">Merlijn AI</h4>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <Sparkles size={10} className="text-white/60 animate-pulse" />
                                        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/50">Generative Assistant</p>
                                    </div>
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
                                            ? 'bg-primary text-black font-bold rounded-tr-none'
                                            : 'bg-white/5 border border-white/5 text-[#F2F0E9]/80 italic rounded-tl-none'
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
                                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1.5">
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
                        <div className="p-6 md:p-8 bg-black/20 border-t border-white/5 space-y-4">
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
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-14 text-[#F2F0E9] font-sans text-sm focus:outline-none focus:border-primary transition-all min-h-[60px] max-h-[120px] resize-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!message.trim() || isTyping}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all ${message.trim() ? 'bg-primary text-black scale-100 shadow-lg' : 'bg-white/5 text-white/20 scale-90'}`}
                                >
                                    <Send size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleWhatsAppRedirect}
                                className="w-full group flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 p-4 rounded-2xl transition-all duration-500"
                            >
                                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#F2F0E9]/60 group-hover:text-primary transition-colors">Spreek de echte Merlijn</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    <ArrowRight size={14} className="text-[#F2F0E9]/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button with Notification Badge */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 relative group overflow-hidden ${isOpen ? 'bg-white border-white' : 'bg-primary border-primary'}`}
            >
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-50" />

                {isOpen ? (
                    <X className="text-black relative z-10" size={28} />
                ) : (
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/20 mb-[-10px] scale-110 shadow-xl group-hover:scale-125 transition-transform duration-700">
                            <img src="/merlijn-portrait.png" alt="Merlijn" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="bg-primary text-black px-2 py-0.5 rounded-full border border-black/10 scale-75 md:scale-90">
                            <MessageSquare size={12} strokeWidth={3} />
                        </div>
                    </div>
                )}
            </motion.button>
        </div>
    );
};

export default WhatsAppWidget;
