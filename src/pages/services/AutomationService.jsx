import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Check, ArrowRight, MousePointerClick, Search, Settings, Cpu } from 'lucide-react';
import SectionLabel from '../../components/SectionLabel';
import ContactForm from '../../components/ContactForm';
import { Link } from 'react-router-dom';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15 } }
};

const AutomationService = () => {
    return (
        <div className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-8 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Artifacts */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[5%] w-[35vw] h-[35vw] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-8 md:px-20 space-y-20 md:space-y-40 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="space-y-8 md:space-y-12"
                >
                    <SectionLabel>Automatisering</SectionLabel>
                    <motion.h1
                        variants={fadeUp}
                        className="font-sans font-bold leading-tight text-[#F2F0E9] tracking-tighter text-3xl md:text-5xl lg:text-[58px]"
                    >
                        Automatiseer alsof er <span className="text-primary font-drama font-normal text-3xl md:text-5xl lg:text-[61px]">10 extra mensen werken.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-4xl border-l-[3px] border-primary/20 pl-8 md:pl-12">
                        Ik automatiseer de repetitieve taken in jouw bedrijf. Van leadopvolging tot administratie. Jij besteedt je tijd aan wat telt.
                    </motion.p>
                    <motion.div variants={fadeUp} className="pt-4">
                        <Link to="/contact" className="btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">Vraag een gratis check aan</span>
                            <div className="btn-bg bg-[#F2F0E9]" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Benefits Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                    <div className="space-y-10 md:space-y-16 order-2 lg:order-1">
                        <div className="space-y-6 md:space-y-10">
                            <h2 className="font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-2xl md:text-3xl lg:text-[58px]">
                                Winst in tijd <span className="text-primary font-drama font-normal text-2xl md:text-3xl lg:text-[61px]">is winst in vrijheid.</span>
                            </h2>
                            <p className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed">
                                Elke taak die je herhaalt kost tijd. Opgeteld zijn dat uren per week die je aan groei had kunnen besteden. Ik bouw de systemen die dat overnemen.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {[
                                { title: "Leadopvolging op autopilot", desc: "Iemand vult je contactformulier in. Automatisch krijgt hij een bevestiging, een herinnering en een follow-up. Zonder dat jij er aan denkt." },
                                { title: "Tools die samenwerken", desc: "Ik koppel je bestaande tools aan elkaar zodat data automatisch doorstroomt. Geen handmatig overzetten meer." },
                                { title: "Administratie die zelf doet", desc: "Van factuurverwerking tot rapportages. Ik bouw de workflows die jou uren per week teruggeven." },
                                { title: "Schaalbaar zonder extra mensen", desc: "Je bedrijf kan groeien zonder dat je er meteen iemand voor hoeft aan te nemen. De automatisering schaalt mee." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="space-y-4"
                                >
                                    <h4 className="text-lg md:text-xl font-sans font-bold text-[#F2F0E9] tracking-tighter">{item.title}</h4>
                                    <p className="font-sans text-[#F2F0E9]/40 leading-relaxed italic text-sm md:text-base">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="aspect-square bg-[#1A1A1A]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden flex items-center justify-center p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-1000 order-1 lg:order-2"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 opacity-30" />
                        <div className="w-full max-w-sm border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-10 md:p-16 space-y-10 md:space-y-16 relative group hover:border-primary/20 transition-all duration-1000">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between group/line">
                                    <div className="flex items-center gap-6 md:gap-8">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-1000 ${i === 1 ? 'text-primary bg-primary/10 shadow-lg shadow-primary/10' : 'text-[#F2F0E9]/10'}`}>
                                            <Zap size={24} className="md:scale-125" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 md:w-32 bg-white/5 rounded-full" />
                                            <div className="h-2 w-12 md:w-16 bg-white/5 rounded-full opacity-50" />
                                        </div>
                                    </div>
                                    <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full border border-white/5 flex items-center justify-center transition-all duration-1000 ${i === 1 ? 'bg-primary border-primary scale-110 shadow-xl shadow-primary/30' : 'opacity-20 translate-x-4'}`}>
                                        {i === 1 && <Check size={18} className="text-black md:scale-125" />}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-10 md:pt-16 border-t border-white/5 flex flex-col items-center gap-4">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping delay-75" />
                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping delay-150" />
                                </div>
                                <p className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-primary font-black">Running Autopilot...</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Process Section */}
                <div className="space-y-16 md:space-y-24">
                    <div className="text-center space-y-8">
                        <SectionLabel className="justify-center">Hoe het werkt</SectionLabel>
                        <h2 className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter">
                            Zo werkt <span className="text-primary font-drama font-normal italic inline-block align-baseline mt-4 leading-[1.1] text-3xl md:text-5xl lg:text-[58px]">het.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { step: "01", title: "Gratis check", desc: "We kijken samen welke taken je nu handmatig doet en hoeveel tijd dat kost. Ik geef je direct een eerlijk beeld van wat er mogelijk is.", icon: <Search size={24} /> },
                            { step: "02", title: "Bouw en test", desc: "Ik bouw de automatisering, test hem grondig en koppel hem aan je bestaande tools. Jij hoeft niks te doen.", icon: <Settings size={24} /> },
                            { step: "03", title: "Live en op de achtergrond", desc: "Zodra het live staat, loopt het. Je hoeft er niet meer naar om te kijken. Het werk wordt gedaan terwijl jij onderneemt.", icon: <Cpu size={24} /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[2.5rem] bg-[#1A1A1A]/40 border border-white/5 space-y-8 group hover:bg-[#1A1A1A]/60 transition-all duration-700"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700">
                                        {item.icon}
                                    </div>
                                    <span className="font-mono text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors uppercase italic">{item.step}</span>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl md:text-2xl font-sans font-bold text-[#F2F0E9] tracking-tighter">{item.title}</h3>
                                    <p className="font-sans text-[#F2F0E9]/40 leading-relaxed italic">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="py-20 md:py-32 border-t border-white/5 flex flex-col items-center text-center">
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center space-y-10 md:space-y-16 mb-16 md:mb-24 w-full"
                    >
                        <SectionLabel className="md:justify-center">Start Vandaag</SectionLabel>
                        <Link to="/contact" className="group flex flex-col items-center">
                            <h2 className="font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter md:text-center text-3xl md:text-5xl lg:text-[58px]">
                                Klaar om je tijd <span className="text-primary font-drama font-normal ml-4 text-3xl md:text-5xl lg:text-[61px]">terug te krijgen?</span>
                            </h2>
                        </Link>
                        <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/40 text-base md:text-xl font-light leading-relaxed italic max-w-3xl mx-auto border-l-2 md:border-l-0 md:border-b-2 border-white/5 pb-10 md:pb-12 pl-8 md:pl-0">
                            Vraag een gratis check aan. In 20 minuten weet je wat er geautomatiseerd kan worden.
                        </motion.p>
                    </motion.div>

                    <ContactForm selectedUpgrade="automation" />
                </div>
            </div>
        </div>
    );
};

export default AutomationService;
