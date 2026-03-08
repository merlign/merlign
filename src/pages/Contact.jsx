import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { getContactInfo } from '../lib/sanity';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const ContactPage = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getContactInfo();
                setData(res);
            } catch (err) {
                console.error("Contact Page Fetch Error:", err);
            }
        };
        fetchData();
    }, []);

    const headlineSans = data?.headlineSans || "Laat zien wat er speelt. ";
    const headlineSerif = data?.headlineSerif || "Ik kijk mee.";
    const subtitle = data?.subtitle || "In 20 minuten kijk ik met je mee naar je situatie. Je krijgt direct eerlijke feedback over wat het oplevert als je het aanpakt.";
    const contactEmail = data?.email || "contact@merlign.com";
    const linkedinLink = data?.linkedin || "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/";
    return (
        <div className="pt-40 md:pt-56 pb-20 md:pb-32 bg-[#0A0A0A] relative overflow-hidden">
            <SEO
                title="Samenwerken"
                description="Klaar voor de volgende stap? Neem contact op met Merlign voor een gratis adviesgesprek over uw website, dashboard of AI-automatisering."
                path="/contact"
            />
            {/* Background Artifacts */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="content-max-width section-px space-y-20 md:space-y-40 relative z-10">
                <div className="space-y-24 md:space-y-40 text-center">
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto space-y-8 md:space-y-12 mb-4 md:mb-12 flex flex-col items-center"
                    >
                        <SectionLabel>Contact</SectionLabel>
                        <motion.h1
                            variants={fadeUp}
                            className="font-sans font-bold text-[#F2F0E9] md:text-center text-h1"
                        >
                            {headlineSans}{' '}
                            <span className="text-primary font-drama font-normal text-h1-serif">{headlineSerif}</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-4xl border-l-[3px] md:border-l-0 md:border-b-2 border-primary/20 pl-8 md:pl-0 pb-8 md:pb-12 text-center">
                            {subtitle}
                        </motion.p>
                    </motion.div>

                    <div className="pt-12 md:pt-24 border-t border-white/5">
                        <ContactForm />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {[
                            { icon: <Mail className="w-6 h-6 md:w-8 md:h-8" />, label: "E-mail", value: contactEmail, href: `mailto:${contactEmail}` },
                            { icon: <Linkedin className="w-6 h-6 md:w-8 md:h-8" />, label: "LinkedIn", value: "Merlijn van der Vleuten", href: linkedinLink }
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
