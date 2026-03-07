import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, MessageCircle } from 'lucide-react';

const WhatsAppWidget = ({ phoneNumber = "+31612345678" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) return;
        const encodedMessage = encodeURIComponent(message);
        // Clean phone number (remove +, spaces, etc. for the URL)
        const cleanPhone = phoneNumber.replace(/\+/g, '').replace(/\s/g, '');
        window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
        setIsOpen(false);
        setMessage('');
    };

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[1000] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-[320px] md:w-[380px] bg-[#141414] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-primary p-6 md:p-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
                                    <MessageCircle className="text-white" size={20} />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary" />
                                </div>
                                <div className="text-white">
                                    <p className="font-sans font-bold text-sm uppercase tracking-widest leading-none">Merlign</p>
                                    <p className="text-[10px] uppercase tracking-widest opacity-70 mt-1">Chat Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[85%]">
                                <p className="text-[#F2F0E9]/80 text-[14px] leading-relaxed italic font-sans">
                                    Hi! 👋 Waar kan ik je vandaag bij helpen? <br />
                                    Laat een berichtje achter en we chatten verder op WhatsApp.
                                </p>
                            </div>

                            <div className="relative pt-4">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Typ je bericht..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[#F2F0E9] font-sans text-sm focus:outline-none focus:border-primary transition-all min-h-[100px] resize-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!message.trim()}
                                    className={`absolute bottom-4 right-4 p-3 rounded-full transition-all ${message.trim() ? 'bg-primary text-black scale-100' : 'bg-white/5 text-white/20 scale-90'}`}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative ${isOpen ? 'bg-white border-white' : 'bg-primary border-primary'}`}
            >
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20" />
                {isOpen ? (
                    <X className="text-black" size={24} />
                ) : (
                    <MessageCircle className="text-white" size={28} />
                )}
            </motion.button>
        </div>
    );
};

export default WhatsAppWidget;
