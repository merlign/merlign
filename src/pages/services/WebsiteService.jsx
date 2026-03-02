import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MousePointerClick, Zap, Layout as LayoutIcon, Search, Settings } from 'lucide-react';
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

const WebsiteService = () => {
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
                    <SectionLabel>Website</SectionLabel>
                    <motion.h1
                        variants={fadeUp}
                        className="font-sans font-bold leading-tight text-[#F2F0E9] tracking-tighter text-3xl md:text-5xl lg:text-[58px]"
                    >
                        Een website die voor je werkt <span className="text-primary font-drama font-normal text-3xl md:text-5xl lg:text-[61px]">terwijl jij onderneemt.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-4xl border-l-[3px] border-primary/20 pl-8 md:pl-12">
                        Niet alleen mooi. Gebouwd om bezoekers te overtuigen en te laten converteren. Klaar in 72 uur.
                    </motion.p>
                    <motion.div variants={fadeUp} className="pt-4 text-left">
                        <Link to="/contact" className="btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">Vraag een gratis check aan</span>
                            <div className="btn-bg bg-[#F2F0E9]" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Features Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                    <div className="space-y-10 md:space-y-16 order-2 lg:order-1">
                        <div className="space-y-6 md:space-y-10">
                            <h2 className="font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter text-2xl md:text-3xl lg:text-[58px]">
                                Wat je krijgt dat <span className="text-primary font-drama font-normal text-2xl md:text-3xl lg:text-[61px]">anderen niet leveren.</span>
                            </h2>
                            <p className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed">
                                Ik denk niet alleen na over hoe het eruit ziet. Ik denk na over wat een bezoeker voelt, twijfelt en nodig heeft om actie te nemen.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {[
                                { title: "Strategie voor design", desc: "Elke sectie heeft een doel. Elke zin doet werk. Ik bouw op basis van 10 jaar design-ervaring gecombineerd met funnel-denken." },
                                { title: "Live in 72 uur", desc: "Geen weken wachten. Na de check ga ik aan de slag en lever ik op. Jij geeft feedback, ik pas aan, klaar." },
                                { title: "SEO ingebakken", desc: "Snelle laadtijd, schone structuur, juiste titels en beschrijvingen. Je website wordt gevonden zonder dat je er extra voor hoeft te betalen." },
                                { title: "Zorgeloos onderhoud", desc: "Je website blijft veilig, snel en up-to-date. Ik zorg voor de techniek op de achtergrond, zodat jij er geen omkijken naar hebt." },
                                { title: "Makkelijk te beheren", desc: "Wil je toch zelf iets aanpassen? Dat kan. Ik lever met een korte uitleg zodat je zelfstandig kleine wijzigingen kunt doen." }
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
                        <div className="w-full h-full border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-[#1A1A1A]/60 backdrop-blur-3xl shadow-2xl flex flex-col p-8 md:p-12 space-y-8 md:space-y-12 relative group hover:border-primary/20 transition-all duration-1000">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-400/30" />
                                <div className="w-3 h-3 rounded-full bg-amber-400/30" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400/30" />
                            </div>
                            <div className="grid grid-cols-2 gap-8 flex-grow">
                                <div className="bg-white/5 rounded-[1.5rem] flex items-center justify-center overflow-hidden border border-white/5">
                                    <LayoutIcon size={48} className="text-[#F2F0E9]/10 group-hover:text-primary transition-all duration-1000 md:scale-125" />
                                </div>
                                <div className="space-y-6">
                                    <div className="h-4 md:h-6 w-full bg-white/5 rounded-full" />
                                    <div className="h-4 md:h-6 w-2/3 bg-white/5 rounded-full" />
                                    <div className="h-3 md:h-4 w-full bg-white/5 rounded-full mt-6" />
                                    <div className="h-3 md:h-4 w-5/6 bg-white/5 rounded-full" />
                                    <div className="h-3 md:h-4 w-4/6 bg-white/5 rounded-full" />
                                </div>
                            </div>
                            <div className="h-12 md:h-16 w-full bg-primary/10 rounded-full border border-primary/10 flex items-center px-8">
                                <div className="w-1/3 h-2 bg-primary/30 rounded-full" />
                            </div>
                        </div>
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                y: [-5, 5, -5]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-16 right-16 md:bottom-24 md:right-24 w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.5)] group hover:scale-110 transition-transform duration-700"
                        >
                            <MousePointerClick size={24} className="text-black md:scale-125" />
                        </motion.div>
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
                            { step: "01", title: "Gratis check", desc: "20 minuten. Ik kijk naar je huidige situatie, wat je wil bereiken en wat daarvoor nodig is. Geen verkooppraatje.", icon: <Search size={24} /> },
                            { step: "02", title: "Bouwsprint", desc: "Ik bouw de website. Design, copy-structuur, SEO, snelheid, alles in één sprint. Jij geeft feedback als ik iets laat zien.", icon: <Zap size={24} /> },
                            { step: "03", title: "Live en klaar", desc: "Je site staat live. Korte overdracht, je bent zelfstandig, en je weet dat ik op de achtergrond het onderhoud blijf doen als je dat wenst.", icon: <Check size={24} /> }
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
                        <Link to="/contact" className="group flex flex-col items-center">
                            <h2 className="font-sans font-bold text-[#F2F0E9] leading-tight tracking-tighter md:text-center text-3xl md:text-5xl lg:text-[58px]">
                                Klaar om te <span className="text-primary font-drama font-normal ml-4 text-3xl md:text-5xl lg:text-[61px]">beginnen?</span>
                            </h2>
                        </Link>
                        <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/40 text-base md:text-xl font-light leading-relaxed italic max-w-3xl mx-auto border-l-2 md:border-l-0 md:border-b-2 border-white/5 pb-10 md:pb-12 pl-8 md:pl-0 text-center">
                            Vraag een gratis check aan. In 20 minuten weet je wat het oplevert.
                        </motion.p>
                    </motion.div>

                    <ContactForm selectedUpgrade="website" />
                </div>
            </div>
        </div>
    );
};

export default WebsiteService;
