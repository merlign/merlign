import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="bg-[var(--background)] min-h-screen">
            <SEO
                title={data?.seoTitle || "Plan je gratis scan (20 min) | Direct advies"}
                description={data?.seoDescription || "Welke upgrade heeft jouw bedrijf nodig? Ik kijk in 20 minuten met je mee waar je winst laat liggen. Plan nu je gratis scan!"}
                path="/contact"
            />
            <AnimatePresence mode="wait">
                {!data ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-[var(--background)] z-[200] flex items-center justify-center"
                    >
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-12 h-12 border border-primary/20 rounded-full"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="pt-40 md:pt-56 pb-20 md:pb-32 relative overflow-hidden"
                    >
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
                                        className="font-sans font-bold text-[var(--text)] md:text-center text-h1 tracking-tighter"
                                    >
                                        {headlineSans}{' '}
                                        <span className="text-primary font-drama font-normal text-h1-serif">{headlineSerif}</span>
                                    </motion.h1>
                                    <motion.p variants={fadeUp} className="font-sans text-[var(--text)]/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl text-center">
                                        {subtitle}
                                    </motion.p>
                                </motion.div>

                                <div className="pt-12 md:pt-24 border-t border-[var(--border)]">
                                    <ContactForm />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                    {[
                                        { icon: <Mail className="w-6 h-6 md:w-8 md:h-8" />, value: contactEmail, href: `mailto:${contactEmail}` },
                                        { icon: <Linkedin className="w-6 h-6 md:w-8 md:h-8" />, value: "Merlijn van der Vleuten", href: linkedinLink }
                                    ].map((item, i) => (
                                        <motion.a
                                            key={i}
                                            href={item.href}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center justify-between p-8 md:p-12 rounded-[2.5rem] bg-[var(--paper)]/20 backdrop-blur-xl border-[var(--border)] group hover:bg-[var(--paper)]/40 hover:border-primary/20 transition-all duration-700"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700">
                                                    {item.icon}
                                                </div>
                                                <div className="text-left">
                                                    <span className="text-lg md:text-2xl font-sans font-bold text-[var(--text)]/70 group-hover:text-primary transition-colors duration-500 tracking-tighter">{item.value}</span>
                                                </div>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactPage;
