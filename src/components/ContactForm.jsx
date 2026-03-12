import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import emailjs from 'emailjs-com';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const ContactForm = ({ selectedUpgrade: initialUpgrade = null }) => {
    const [selectedUpgrade, setSelectedUpgrade] = useState(initialUpgrade || 'website');
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

    const upgrades = [
        { id: 'website', title: "Website die écht verkoopt", tag: "Klaar in 72u" },
        { id: 'dashboard', title: "Overzicht in cijfers en winst", tag: "Dashboard" },
        { id: 'automation', title: "Randzaken op autopilot", tag: "Automatisering" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedEmail = formData.email?.trim();
        const trimmedName = formData.name?.trim();

        if (!selectedUpgrade || !trimmedEmail || isSending) return;
        setIsSending(true);

        const templateParams = {
            from_name: trimmedName,
            reply_to: trimmedEmail,
            to_email: trimmedEmail, // Added for auto-reply templates
            user_email: trimmedEmail, // Added for auto-reply templates
            email: trimmedEmail, // Added for auto-reply templates
            company: formData.company?.trim(),
            message: formData.message,
            upgrade_choice: upgrades.find(u => u.id === selectedUpgrade)?.title || selectedUpgrade
        };

        try {
            // 1. Send main notification to you (critical)
            await emailjs.send('service_qdlv6x6', 'template_ibof6py', templateParams, 'kWXpmJZNrXzXz9PHt');

            // 2. Send confirmation to client (non-critical, don't block success if it fails)
            try {
                await emailjs.send('service_qdlv6x6', 'template_z48xd8j', templateParams, 'kWXpmJZNrXzXz9PHt');
            } catch (err) {
                console.warn('Auto-reply failed, but main email was sent:', err);
            }

            setIsSuccess(true);
        } catch (error) {
            console.error('EmailJS error:', error);
            const errorMsg = error?.text || error?.message || 'Onbekende fout';
            alert(`Er ging iets mis bij het verzenden: ${errorMsg}. Controleer je gegevens en probeer het opnieuw.`);
        } finally {
            setIsSending(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center space-y-12 py-20">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/50 shadow-[0_0_80px_rgba(79,70,229,0.4)]"
                >
                    <Check size={64} className="text-primary" />
                </motion.div>
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-[68px] font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter">
                        Aanvraag ontvangen.
                    </h2>
                    <p className="font-sans text-[#F2F0E9]/85 text-2xl md:text-3xl font-light italic leading-tight max-w-2xl mx-auto">
                        Ik neem binnen 24 uur contact met je op. <br /> Tot snel.
                    </p>
                </div>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="btn-magnetic group bg-transparent text-[#F2F0E9]/30 px-10 py-5 rounded-full border border-white/10 mx-auto"
                >
                    <span className="relative z-10 text-[12px] font-bold italic tracking-widest uppercase">Nog een aanvraag</span>
                    <div className="btn-bg bg-white/5" />
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 w-full text-left">
            <div className="lg:col-span-5 space-y-4 md:space-y-6">
                {upgrades.map((u, i) => (
                    <motion.div
                        key={u.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedUpgrade(u.id)}
                        className={`cursor-pointer p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-700 group relative overflow-hidden flex items-center justify-between ${selectedUpgrade === u.id ? 'bg-primary border-primary shadow-lg scale-[1.02]' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'}`}
                    >
                        <div className="space-y-1 md:space-y-2 relative z-10 pr-4">
                            <h4 className={`text-lg md:text-2xl font-sans font-bold transition-all duration-500 ${selectedUpgrade === u.id ? 'text-white translate-x-2' : 'text-[#F2F0E9]'}`}>{u.title}</h4>
                            <span className={`font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold ${selectedUpgrade === u.id ? 'text-white/60' : 'text-[#F2F0E9]/45'}`}>{u.tag}</span>
                        </div>
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-700 shrink-0 ${selectedUpgrade === u.id ? 'bg-white border-white scale-110 shadow-lg' : 'border-white/10'}`}>
                            {selectedUpgrade === u.id && <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 bg-[#1A1A1A]/40 backdrop-blur-xl p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 relative shadow-sm"
            >
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {[
                            { label: 'Naam', placeholder: 'Elon Musk', key: 'name', type: 'text' },
                            { label: 'E-mailadres', placeholder: 'naam@bedrijf.nl', key: 'email', type: 'email' },
                            { label: 'Bedrijfsnaam', placeholder: 'Tesla Inc.', key: 'company', type: 'text' }
                        ].map((field, i) => (
                            <div key={i} className="space-y-2 md:space-y-3">
                                <label className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-[#F2F0E9]/45 block font-bold italic">{field.label}</label>
                                <input
                                    required={field.key !== 'company'}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 font-sans text-lg md:text-xl focus:outline-none focus:border-primary transition-all text-[#F2F0E9] placeholder:text-white/10"
                                    value={formData[field.key]}
                                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 md:space-y-3">
                        <label className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-[#F2F0E9]/45 block font-bold italic">Bericht (optioneel)</label>
                        <textarea
                            placeholder="Laat weten wat er speelt..."
                            className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 font-sans text-lg md:text-xl focus:outline-none focus:border-primary transition-all text-[#F2F0E9] placeholder:text-white/10 min-h-[100px] resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <div className="pt-6 md:pt-10">
                        <button
                            type="submit"
                            disabled={!selectedUpgrade || isSending}
                            className={`btn-magnetic group w-full bg-primary text-white py-6 md:py-8 rounded-full shadow-xl shadow-primary/20 flex items-center justify-center gap-4 ${(!selectedUpgrade || isSending) ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.4em] uppercase">
                                {isSending ? 'Verzenden...' : 'Aanvraag verzenden'}
                            </span>
                            {!isSending && <ArrowRight size={20} className="relative z-10 group-hover:translate-x-3 transition-transform" />}
                            <div className="btn-bg bg-primary" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ContactForm;
