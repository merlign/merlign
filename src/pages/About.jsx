import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { getAboutPageData } from '../lib/sanity';

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

const About = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAboutPageData();
                setData(res);
            } catch (err) {
                console.error("About Fetch Error:", err);
            }
        };
        fetchData();
    }, []);

    const introSans = data?.introSans || "Designer. Bouwer.";
    const introSerif = data?.introSerif || "Jouw sparringspartner.";
    const bioText = data?.bio?.[0]?.children?.[0]?.text || "Ik ben Merlijn. 10 jaar designer, nu ook bouwer van websites, dashboards en automatiseringen. Ik combineer wat andere freelancers niet combineren.";
    return (
        <div className="bg-[var(--background)] min-h-screen">
            <SEO
                title={data?.seoTitle || "Over Merlign | Senior design & tech specialist"}
                description={data?.seoDescription || "Designer, bouwer en jouw sparringspartner. Ik gebruik 10 jaar design-ervaring en de nieuwste AI-tools om ondernemers, zzpers en het mkb echt verder te helpen."}
                path="/over-mij"
            />
            <AnimatePresence mode="wait">
                {!data ? (
                    <motion.div
                        key="about-loader"
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
                        key="about-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative overflow-hidden"
                    >
                        {/* Background Artifacts */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                            <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px]" />
                            <div className="absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[80px]" />
                        </div>

                        {/* Hero Section */}
                        <section className="pt-40 md:pt-56 pb-20 md:pb-32 relative z-10">
                            <div className="content-max-width section-px">
                                <motion.div
                                    initial="initial"
                                    whileInView="whileInView"
                                    viewport={{ once: true }}
                                    className="max-w-5xl space-y-8 md:space-y-12"
                                >
                                    <SectionLabel>Over mij</SectionLabel>
                                    <motion.h1
                                        variants={fadeUp}
                                        className="font-sans font-bold text-[var(--text)] text-h1 text-left"
                                    >
                                        {introSans}{' '}
                                        <span className="text-primary font-drama font-normal text-h1-serif">{introSerif}</span>
                                    </motion.h1>
                                    <motion.p variants={fadeUp} className="font-sans text-[var(--text)]/85 text-lg md:text-xl font-light italic leading-[1.8] max-w-2xl whitespace-pre-wrap">
                                        {bioText}
                                    </motion.p>
                                    <motion.div variants={fadeUp} className="pt-12 md:pt-16">
                                        <a href="#contact" className="btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                            <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">Vraag een gratis check aan</span>
                                            <div className="btn-bg bg-primary" />
                                        </a>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </section>

                        {/* Who am I Section */}
                        <section className="section-py relative overflow-hidden border-y border-[var(--border)]">
                            <div className="content-max-width section-px grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative group lg:ml-0 order-first lg:order-none"
                                >
                                    <div className="aspect-[4/5] w-full max-w-[280px] md:max-w-[480px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-visible bg-[var(--paper)]/40 border border-[var(--border)] relative shadow-2xl transition-all duration-700 group-hover:bg-[var(--paper)]/60">
                                        <div className="absolute inset-8 rounded-[1.5rem] border border-primary/10 opacity-20 bg-[linear-gradient(to_right,#6366F1_1px,transparent_1px),linear-gradient(to_bottom,#6366F1_1px,transparent_1px)] bg-[size:20px_20px]" />
                                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                        <motion.img
                                            src="/merlijn-new.png"
                                            alt="Merlijn van der Vleuten - Senior Design & Tech Specialist bij Merlign"
                                            className="absolute bottom-0 left-[48%] -translate-x-1/2 w-auto h-[95%] max-w-none z-10 filter brightness-95 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000 ease-out pointer-events-none origin-bottom"
                                        />
                                        <div className="absolute inset-0 rounded-[2.5rem] border border-[var(--border)] pointer-events-none z-20" />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial="initial"
                                    whileInView="whileInView"
                                    viewport={{ once: true }}
                                    variants={staggerContainer}
                                    className="space-y-10 md:space-y-16"
                                >
                                    <div className="space-y-8">
                                        <SectionLabel>Wie ik ben</SectionLabel>
                                        <motion.h2
                                            variants={fadeUp}
                                            className="font-sans font-bold text-[var(--text)] text-h2"
                                        >
                                            {data?.whoAmIHeadlineSans || "De perfecte mix tussen"} <span className="text-primary font-drama font-normal text-h2-serif">{data?.whoAmIHeadlineSerif || "vorm en functie."}</span>
                                        </motion.h2>
                                    </div>
                                    <div className="space-y-8 font-sans text-[var(--text)]/85 text-lg md:text-2xl font-light italic leading-[1.8] whitespace-pre-wrap">
                                        {data?.whoAmIParas && data.whoAmIParas.length > 0 ? data.whoAmIParas.map((para, i) => (
                                            <p key={i}>{para}</p>
                                        )) : (
                                            <>
                                                <p>Ik begon als grafisch designer en ben in AI gedoken omdat ik zag wat er mogelijk was. Nu combineer ik 10 jaar design-ervaring met moderne AI-tools om dingen te bouwen die er goed uitzien en goed werken.</p>
                                                <p>Het verschil met een bureau: ik ben snel, ik denk mee en je hebt altijd één aanspreekpunt. Het verschil met een goedkope freelancer: ik lever niet alleen wat je vraagt, maar ook wat je nodig hebt.</p>
                                                <p>Voor ondernemers van 1 tot 10 man ben ik de sparringspartner die ze anders niet hebben. Iemand die begrijpt hoe een goede uitstraling eruitziet én hoe systemen in elkaar moeten zitten.</p>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </section>

                        {/* Choice Section */}
                        <section className="section-py border-t border-[var(--border)]">
                            <div className="content-max-width section-px">
                                <div className="flex flex-col md:items-center text-left md:text-center space-y-8 mb-16 md:mb-24">
                                    <SectionLabel>Keuze</SectionLabel>
                                    <h2 className="font-sans font-bold text-[var(--text)] md:text-center text-h2">
                                        {data?.choiceHeadlineSans || "Waarom ondernemers voor"} <span className="text-primary font-drama font-normal text-h2-serif">{data?.choiceHeadlineSerif || "mij kiezen."}</span>
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                                    {(data?.choices?.length > 0 ? data.choices : [
                                        { title: "Niet alleen bouwen, ook meedenken", description: "Ik neem niet blind je briefing over. Als ik iets zie dat beter kan, zeg ik het. Dat is wat een sparringspartner doet." },
                                        { title: "Design en techniek in één", description: "Je hoeft niet te kiezen tussen iemand die het mooi maakt of iemand die het laat werken. Ik doe beide." },
                                        { title: "Snel en zonder gedoe", description: "Geen maanden wachten, geen eindeloze vergaderingen. Ik werk in korte sprints en lever op." },
                                        { title: "Eerlijk over wat het kost", description: "Geen vage offertes. Na de check weet je precies wat het wordt voor je akkoord gaat." }
                                    ]).map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-10 rounded-[2.5rem] bg-[var(--paper)]/40 border border-[var(--border)] space-y-6 hover:bg-[var(--paper)]/60 transition-all duration-700"
                                        >
                                            <h3 className="text-xl md:text-3xl font-sans font-bold text-[var(--text)] tracking-tighter">{item.title}</h3>
                                            <p className="font-sans text-[var(--text)]/85 leading-[1.8] italic text-base md:text-lg whitespace-pre-wrap">{item.description || item.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.div variants={fadeUp} className="pt-12 md:pt-20 text-center">
                                    <a href="#contact" className="btn-magnetic group inline-flex bg-primary text-white border-transparent px-10 md:px-12 py-5 md:py-6 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                        <span className="relative z-10 text-[12px] md:text-[14px] font-black italic tracking-[0.3em] uppercase">Vraag een gratis check aan</span>
                                        <div className="btn-bg bg-primary" />
                                    </a>
                                </motion.div>
                            </div>
                        </section>

                        {/* Bottom CTA Section */}
                        <section id="contact" className="section-px pt-20 pb-32">
                            <div className="content-max-width border-t border-[var(--border)] pt-20 flex flex-col items-center text-center">
                                <SectionLabel className="md:justify-center">Samenwerken</SectionLabel>
                                <h2 className="font-sans font-bold text-[var(--text)] mt-8 md:text-center text-h2">
                                    {data?.ctaHeadlineSans || "Wil je"} <span className="text-primary font-drama font-normal text-h2-serif">{data?.ctaHeadlineSerif || "samenwerken?"}</span>
                                </h2>
                                <p className="font-sans text-[var(--text)]/40 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl">
                                    {data?.ctaSubtitle || "Plan een gratis check. In 20 minuten weet je of we een match zijn."}
                                </p>
                                <ContactForm />
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default About;
