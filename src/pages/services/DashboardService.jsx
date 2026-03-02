import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MousePointerClick, Activity, Search, Database, Layout } from 'lucide-react';
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

const DashboardService = () => {
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
                    <SectionLabel>Dashboard</SectionLabel>
                    <motion.h1
                        variants={fadeUp}
                        className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold leading-[1.1] text-[#F2F0E9] tracking-tighter"
                    >
                        Stop met gokken. <br />
                        <span className="text-primary font-drama font-normal inline-block align-baseline mt-6 leading-[1.1] text-3xl md:text-5xl lg:text-[58px]">Begin met sturen op cijfers.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-4xl border-l-[3px] border-primary/20 pl-8 md:pl-12">
                        Ik bouw een dashboard dat al je belangrijkste cijfers op één plek zet. Altijd inzichtelijk, op je telefoon of laptop.
                    </motion.p>
                    <motion.div variants={fadeUp} className="pt-4 text-left md:text-center">
                        <Link to="/contact" className="btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">Vraag een gratis check aan</span>
                            <div className="btn-bg bg-[#F2F0E9]" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Why Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                    <div className="space-y-10 md:space-y-16 order-2 lg:order-1">
                        <div className="space-y-6 md:space-y-10">
                            <h2 className="text-2xl md:text-3xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter transition-all duration-700 hover:scale-[1.01]">
                                Waarom ondernemers zonder <br />
                                <span className="text-primary font-drama font-normal inline-block align-baseline mt-4 leading-[1.1] text-2xl md:text-3xl lg:text-[58px]">dashboard geld laten liggen.</span>
                            </h2>
                            <p className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed">
                                Je kunt je bedrijf niet sturen als je niet weet wat er gebeurt. Een dashboard geeft je in één oogopslag wat je nodig hebt om de juiste beslissingen te nemen.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {[
                                { title: "Alles op één plek", desc: "Omzet, leads, websitebezoek, advertentiekosten. Niet meer schakelen tussen tools. Eén scherm, alles erin." },
                                { title: "Altijd bij de hand", desc: "Op je laptop, telefoon of tablet. Je ziet in één oogopslag hoe het ervoor staat zonder in te loggen op vijf verschillende systemen." },
                                { title: "Gebouwd op jouw data", desc: "Ik koppel de tools die jij al gebruikt. Geen gedoe met migraties of nieuwe software." },
                                { title: "Simpel te begrijpen", desc: "Geen ingewikkelde grafieken. Alleen wat jij nodig hebt om snel een beslissing te nemen." }
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
                        <div className="w-full h-auto border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-8 md:p-12 space-y-10 md:space-y-16 relative group hover:border-primary/20 transition-all duration-1000">
                            <div className="flex justify-between items-center">
                                <div className="h-6 w-32 md:w-48 bg-white/5 rounded-full" />
                                <Activity size={24} className="text-primary animate-pulse" />
                            </div>
                            <div className="flex items-end gap-2 md:gap-3 h-32 md:h-64">
                                {[30, 60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                                        className="flex-grow bg-primary/10 hover:bg-primary transition-all duration-700 rounded-t-xl group/bar relative border-t border-primary/20"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-mono font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                            {h}%
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/5 pt-10">
                                <div className="space-y-3">
                                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                    <div className="h-4 w-full bg-primary/20 rounded-full" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                    <div className="h-4 w-full bg-white/5 rounded-full" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                    <div className="h-4 w-full bg-white/5 rounded-full" />
                                </div>
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
                            { step: "01", title: "Gratis check", desc: "We kijken samen welke cijfers voor jou het meest relevant zijn en welke tools je al gebruikt. 20 minuten, geen verplichtingen.", icon: <Search size={24} /> },
                            { step: "02", title: "Bouw en koppeling", desc: "Ik bouw het dashboard en koppel je databronnen. Jij hoeft niks te doen behalve feedback geven op het ontwerp.", icon: <Database size={24} /> },
                            { step: "03", title: "Klaar voor gebruik", desc: "Je krijgt toegang, een korte uitleg en je bent klaar. Vanaf dat moment stuur je op feiten in plaats van gevoel.", icon: <Layout size={24} /> }
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
                <div className="py-20 md:py-32 border-t border-white/5 flex flex-col items-center">
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-left md:text-center space-y-10 md:space-y-16 mb-16 md:mb-24 w-full"
                    >
                        <SectionLabel className="md:justify-center">Start Vandaag</SectionLabel>
                        <Link to="/contact" className="group flex flex-col items-center">
                            <h2 className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter">
                                Klaar om te <br />
                                <span className="text-primary font-drama font-normal inline-block align-baseline mt-6 leading-[1.1] text-3xl md:text-5xl lg:text-[58px]">sturen op cijfers?</span>
                            </h2>
                        </Link>
                        <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/40 text-base md:text-xl font-light leading-relaxed italic max-w-3xl mx-auto border-l-2 md:border-l-0 md:border-b-2 border-white/5 pb-10 md:pb-12 pl-8 md:pl-0 text-center">
                            Vraag een gratis check aan. In 20 minuten weet je wat een dashboard jou oplevert.
                        </motion.p>
                    </motion.div>

                    <ContactForm selectedUpgrade="dashboard" />
                </div>
            </div>
        </div>
    );
};

export default DashboardService;
