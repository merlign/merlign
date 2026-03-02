import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import ContactForm from '../components/ContactForm';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const About = () => {
    return (
        <div className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-8 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Artifacts */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-8 md:px-20 space-y-20 md:space-y-40 relative z-10">
                {/* Hero */}
                <motion.div
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="space-y-8 md:space-y-12"
                >
                    <SectionLabel>Over mij</SectionLabel>
                    <motion.h1
                        variants={fadeUp}
                        className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold leading-[1.1] text-[#F2F0E9] tracking-tighter"
                    >
                        Designer. Bouwer. <br />
                        <span className="text-primary font-drama font-normal inline-block align-baseline mt-6 leading-[1.1] text-3xl md:text-5xl lg:text-[58px]">Jouw sparringspartner.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="font-sans text-[#F2F0E9]/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-4xl border-l-[3px] border-primary/20 pl-8 md:pl-12">
                        Ik ben Merlijn. 10 jaar designer, nu ook bouwer van websites, dashboards en automatiseringen. Ik combineer wat andere freelancers niet combineren.
                    </motion.p>
                </motion.div>

                {/* Who am I */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 relative group"
                    >
                        <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#1A1A1A]/40 border border-white/5 shadow-sm">
                            <img
                                src="/merlijn-portrait.png"
                                alt="Merlijn"
                                className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                            />
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -z-10" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 space-y-12 md:space-y-16"
                    >
                        <div className="space-y-8">
                            <SectionLabel>Wie ik ben</SectionLabel>
                            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter">
                                De perfecte mix tussen <br />
                                <span className="text-primary font-drama font-normal inline-block align-baseline mt-4 leading-[1.1] text-3xl md:text-4xl lg:text-[58px]">vorm en functie.</span>
                            </motion.h2>
                        </div>
                        <div className="space-y-8 font-sans text-[#F2F0E9]/60 text-lg md:text-2xl font-light italic leading-relaxed border-l-[3px] border-primary/20 pl-8 md:pl-12">
                            <p>
                                Ik begon als grafisch designer en ben in AI gedoken omdat ik zag wat er mogelijk was. Nu combineer ik 10 jaar design-ervaring met moderne AI-tools om dingen te bouwen die er goed uitzien en goed werken.
                            </p>
                            <p>
                                Het verschil met een bureau: ik ben snel, ik denk mee en je hebt altijd één aanspreekpunt. Het verschil met een goedkope freelancer: ik lever niet alleen wat je vraagt, maar ook wat je nodig hebt.
                            </p>
                            <p>
                                Voor ondernemers van 1 tot 10 man ben ik de sparringspartner die ze anders niet hebben. Iemand die begrijpt hoe een goede uitstraling eruitziet én hoe systemen in elkaar moeten zitten.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Why choose me */}
                <div className="space-y-16 md:space-y-24 pt-16 md:pt-32 border-t border-white/5">
                    <div className="flex flex-col md:items-center text-left md:text-center space-y-8">
                        <SectionLabel>Keuze</SectionLabel>
                        <h2 className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter">
                            Waarom ondernemers voor <br />
                            <span className="text-primary font-drama font-normal inline-block align-baseline mt-4 leading-[1.1] text-3xl md:text-5xl lg:text-[58px]">mij kiezen.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {[
                            { title: "Niet alleen bouwen, ook meedenken", desc: "Ik neem niet blind je briefing over. Als ik iets zie dat beter kan, zeg ik het. Dat is wat een sparringspartner doet." },
                            { title: "Design en techniek in één", desc: "Je hoeft niet te kiezen tussen iemand die het mooi maakt of iemand die het laat werken. Ik doe beide." },
                            { title: "Snel en zonder gedoe", desc: "Geen maanden wachten, geen eindeloze vergaderingen. Ik werk in korte sprints en lever op." },
                            { title: "Eerlijk over wat het kost", desc: "Geen vage offertes. Na de check weet je precies wat het wordt voor je akkoord gaat." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[2.5rem] bg-[#1A1A1A]/40 border border-white/5 space-y-6 hover:bg-[#1A1A1A]/60 transition-all duration-700"
                            >
                                <h3 className="text-xl md:text-3xl font-sans font-bold text-[#F2F0E9] tracking-tighter">{item.title}</h3>
                                <p className="font-sans text-[#F2F0E9]/40 leading-relaxed italic text-base md:text-lg">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="py-20 md:py-32 border-t border-white/5 flex flex-col items-center text-center">
                    <SectionLabel className="md:justify-center">Samenwerken</SectionLabel>
                    <h2 className="text-3xl md:text-5xl lg:text-[58px] font-sans font-bold text-[#F2F0E9] leading-[1.1] tracking-tighter mt-8">
                        Wil je <span className="text-primary font-drama font-normal italic inline-block align-baseline leading-[1.1] text-3xl md:text-5xl lg:text-[58px]">samenwerken?</span>
                    </h2>
                    <p className="font-sans text-[#F2F0E9]/40 text-lg md:text-2xl mt-8 mb-16 md:mb-24 italic max-w-2xl">
                        Plan een gratis check. In 20 minuten weet je of we een match zijn.
                    </p>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default About;
