import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Rocket, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const ProtocolPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const steps = [
        {
            day: "Dag 1",
            title: "Identiteit & Fundering",
            time: "0-24u",
            icon: <Rocket className="text-primary" size={24} />,
            tasks: [
                "Cinematic Intake & Design Keuze",
                "Project Scaffolding (React/Vite)",
                "Global Design System & Layout",
                "Eerste High-Fidelity Draft Live"
            ],
            desc: "We leggen de visuele fundering. Geen witte paginas, maar direct een cinematieke ervaring die de toon zet."
        },
        {
            day: "Dag 2",
            title: "Interactie & CMS",
            time: "24-48u",
            icon: <Zap className="text-primary" size={24} />,
            tasks: [
                "Custom Interactieve Artifacts",
                "Sanity CMS Connectie & Schema's",
                "Dynamic Content Mapping",
                "Scroll-trigger Animaties"
            ],
            desc: "De site komt tot leven. We koppelen de backend zodat je zelf de controle hebt over elk woord en beeld."
        },
        {
            day: "Dag 3",
            title: "Beveiliging & Launch",
            time: "48-72u",
            icon: <Shield className="text-primary" size={24} />,
            tasks: [
                "Security Lockdown (Keys & Forms)",
                "AI-Search Optimization (Schema.org)",
                "Performance Audit & Mobile Polish",
                "Officiële Livegang"
            ],
            desc: "De laatste 1% die het verschil maakt tussen een website en een digitaal instrument. Veilig, snel en vindbaar."
        }
    ];

    return (
        <div className="bg-[var(--background)] min-h-screen">
            <SEO
                title="Het 72-uurs Protocol"
                description="Hoe ik in 3 dagen een high-end, cinematieke website voor je bouw."
                noindex={true}
            />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-[var(--border)]">
                <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="content-max-width section-px relative z-10">
                    <motion.div
                        initial="initial"
                        animate="whileInView"
                        className="max-w-4xl space-y-8"
                    >
                        <SectionLabel>Operationeel Protocol</SectionLabel>
                        <motion.h1
                            variants={fadeUp}
                            className="text-h1 font-sans font-bold text-[var(--text)]"
                        >
                            Techniek is geen <span className="text-primary font-drama font-normal text-h1-serif">bottleneck</span> meer.
                        </motion.h1>
                        <motion.p
                            variants={fadeUp}
                            className="text-xl md:text-2xl font-sans font-light italic text-[var(--text)]/70 max-w-2xl leading-relaxed"
                        >
                            Met de kracht van AI-gedreven development transformeer ik jouw visie in 72 uur naar een premium digitale ervaring. Geen compromissen, alleen pure snelheid.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 md:py-32 relative bg-[var(--paper)]/30">
                <div className="content-max-width section-px">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.15 }}
                                className="group relative"
                            >
                                <div className="bg-[var(--background)] p-8 md:p-10 rounded-[2.5rem] border border-[var(--border)] h-full flex flex-col hover:border-primary/30 transition-all duration-700 shadow-sm hover:shadow-2xl">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                                            {step.icon}
                                        </div>
                                        <div className="text-right">
                                            <span className="font-sans text-lg text-primary font-bold block mb-1">{step.day}</span>
                                            <span className="font-sans text-base text-[var(--text)]/40 italic">{step.time}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-sans font-bold text-[var(--text)] mb-6">{step.title}</h3>
                                    <p className="text-[var(--text)]/60 font-sans font-light italic mb-10 text-lg leading-relaxed">{step.desc}</p>

                                    <div className="space-y-4 mt-auto">
                                        {step.tasks.map((task, j) => (
                                            <div key={j} className="flex items-center gap-3">
                                                <CheckCircle2 size={16} className="text-primary/40 shrink-0" />
                                                <span className="text-sm md:text-base font-sans font-medium text-[var(--text)]/80">{task}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote / Manifesto */}
            <section className="py-24 md:py-32 border-y border-[var(--border)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--border)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                <div className="content-max-width section-px relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl mx-auto space-y-12"
                    >
                        <div className="flex justify-center">
                            <Clock className="text-primary animate-pulse" size={48} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-[var(--text)] italic leading-[1.4]">
                            "De meeste ondernemers wachten <span className="text-primary">weken</span> op een eerste opzet. <br className="hidden md:block" /> Wij lanceren het volledige instrument in <span className="text-primary">dagen</span>."
                        </h2>
                        <div className="w-24 h-[2px] bg-primary mx-auto" />
                    </motion.div>
                </div>
            </section>

            {/* Footer / CTA for client */}
            <section className="py-24 md:py-32 section-px">
                <div className="content-max-width">
                    <div className="bg-primary/5 rounded-[3rem] p-12 md:p-20 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-5xl font-sans font-bold text-[var(--text)]">Klaar voor de start?</h3>
                            <p className="text-xl font-sans font-light italic text-[var(--text)]/60">Laten we vandaag nog die 72 uur in laten gaan.</p>
                        </div>
                        <a href="/contact" className="btn-magnetic group bg-primary text-white px-12 py-6 rounded-full flex items-center gap-4">
                            <span className="relative z-10 text-lg font-bold">Plan je intake</span>
                            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                            <div className="btn-bg bg-primary shadow-[0_0_30px_rgba(99,102,241,0.4)]" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProtocolPage;
