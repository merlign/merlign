import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const ContactPage = () => {
    return (
        <div className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-8 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Artifacts */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-8 md:px-20 space-y-20 md:space-y-40 relative z-10">
                <div className="space-y-24 md:space-y-40 text-center">
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="space-y-8 md:space-y-12 mb-4 md:mb-12 flex flex-col items-center"
                    >
                        <SectionLabel>Contact</SectionLabel>
                        <motion.h1
                            variants={fadeUp}
                            className="font-sans font-bold leading-tight text-[#F2F0E9] tracking-tighter md:text-center text-3xl md:text-5xl lg:text-[58px]"
                        >
                            Laat zien wat er speelt. <span className="text-primary font-drama font-normal text-3xl md:text-5xl lg:text-[61px]">Ik kijk mee.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-4xl border-l-[3px] md:border-l-0 md:border-b-2 border-primary/20 pl-8 md:pl-0 pb-8 md:pb-12 text-center">
                            In 20 minuten kijk ik met je mee naar je situatie. Je krijgt direct eerlijke feedback over wat het oplevert als je het aanpakt.
                        </motion.p>
                    </motion.div>

                    <div className="pt-12 md:pt-24 border-t border-white/5">
                        <ContactForm />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {[
                            { icon: <Mail className="w-6 h-6 md:w-8 md:h-8" />, label: "E-mail", value: "contact@merlign.com", href: "mailto:contact@merlign.com" },
                            { icon: <Linkedin className="w-6 h-6 md:w-8 md:h-8" />, label: "LinkedIn", value: "Merlijn van der Vleuten", href: "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/" }
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center justify-between p-8 md:p-12 rounded-[2.5rem] bg-[#1A1A1A]/20 backdrop-blur-xl border border-white/5 group hover:bg-[#1A1A1A]/40 hover:border-primary/20 transition-all duration-700"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700">
                                        {item.icon}
                                    </div>
                                    <div className="text-left space-y-1">
                                        <span className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-[#F2F0E9]/20 font-bold italic block">{item.label}</span>
                                        <span className="text-lg md:text-2xl font-sans font-bold text-[#F2F0E9]/70 group-hover:text-primary transition-colors duration-500 tracking-tighter">{item.value}</span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
