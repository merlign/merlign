import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';
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
        <div className="bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Artifacts */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            {/* Hero Section */}
            <section className="pt-40 md:pt-56 pb-20 md:pb-32 relative z-10">
                <div className="content-max-width section-px">
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="space-y-8 md:space-y-12"
                    >
                        <SectionLabel>Over mij</SectionLabel>
                        <motion.h1
                            variants={fadeUp}
                            className="font-sans font-bold text-[#F2F0E9] text-h1"
                        >
                            {introSans} <span className="text-primary font-drama font-normal text-h1-serif">{introSerif}</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-4xl border-l-[3px] border-primary/20 pl-8 md:pl-12">
                            {bioText}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Who am I Section */}
            <section className="section-py relative overflow-hidden border-y border-white/5">
                <div className="content-max-width section-px grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group lg:ml-0 order-first lg:order-none"
                    >
                        {/* Exact Clone of Home Portal */}
                        <div className="aspect-[4/5] w-full max-w-[280px] md:max-w-[480px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-visible bg-[#1A1A1A]/40 border border-white/5 relative shadow-2xl transition-all duration-700 group-hover:bg-[#1A1A1A]/60">
                            {/* Blueprint Grid Interior */}
                            <div className="absolute inset-8 rounded-[1.5rem] border border-primary/10 opacity-20 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:20px_20px]" />

                            {/* Glowing Aura Behind Him */}
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            {/* The Cutout Portrait */}
                            <motion.img
                                src="/merlijn-new.png"
                                alt="Merlijn"
                                className="absolute bottom-0 left-[48%] -translate-x-1/2 w-auto h-[95%] max-w-none z-10 filter brightness-95 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000 ease-out pointer-events-none origin-bottom"
                            />

                            {/* Glassmorphic "Technical" Overlay */}
                            <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none z-20" />
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
                                className="font-sans font-bold text-[#F2F0E9] text-h2"
                            >
                                {data?.whoAmIHeadlineSans || "De perfecte mix tussen"} <span className="text-primary font-drama font-normal text-h2-serif">{data?.whoAmIHeadlineSerif || "vorm en functie."}</span>
                            </motion.h2>
                        </div>
                        <div className="space-y-8 font-sans text-[#F2F0E9]/60 text-lg md:text-2xl font-light italic leading-relaxed border-l-[3px] border-primary/20 pl-8 md:pl-12">
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
            <section className="section-py border-t border-white/5">
                <div className="content-max-width section-px">
                    <div className="flex flex-col md:items-center text-left md:text-center space-y-8 mb-16 md:mb-24">
                        <SectionLabel>Keuze</SectionLabel>
                        <h2 className="font-sans font-bold text-[#F2F0E9] md:text-center text-h2">
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
                                className="p-10 rounded-[2.5rem] bg-[#1A1A1A]/40 border border-white/5 space-y-6 hover:bg-[#1A1A1A]/60 transition-all duration-700"
                            >
                                <h3 className="text-xl md:text-3xl font-sans font-bold text-[#F2F0E9] tracking-tighter">{item.title}</h3>
                                <p className="font-sans text-[#F2F0E9]/70 leading-relaxed italic text-base md:text-lg">{item.description || item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="section-px pt-20 pb-32">
                <div className="content-max-width border-t border-white/5 pt-20 flex flex-col items-center text-center">
                    <SectionLabel className="md:justify-center">Samenwerken</SectionLabel>
                    <h2 className="font-sans font-bold text-[#F2F0E9] mt-8 md:text-center text-h2">
                        {data?.ctaHeadlineSans || "Wil je"} <span className="text-primary font-drama font-normal text-h2-serif">{data?.ctaHeadlineSerif || "samenwerken?"}</span>
                    </h2>
                    <p className="font-sans text-[#F2F0E9]/40 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl">
                        {data?.ctaSubtitle || "Plan een gratis check. In 20 minuten weet je of we een match zijn."}
                    </p>
                    <ContactForm />
                </div>
            </section>
        </div>
    );
};

export default About;
