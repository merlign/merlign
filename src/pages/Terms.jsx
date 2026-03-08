import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';

const Terms = () => {
    return (
        <div className="pt-40 md:pt-56 pb-20 md:pb-32 bg-[#0A0A0A] min-h-screen relative overflow-hidden">
            <SEO title="Algemene Voorwaarden" description="Algemene Voorwaarden van Merlign. De juridische basis voor onze samenwerking." path="/terms" />
            <div className="content-max-width section-px relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-12">
                    <SectionLabel>Juridisch</SectionLabel>
                    <h1 className="font-sans font-bold text-[#F2F0E9] text-h1">Algemene Voorwaarden</h1>
                    <div className="prose prose-invert max-w-4xl font-sans text-[#F2F0E9]/80 space-y-8">
                        <p className="text-xl md:text-2xl font-light italic leading-relaxed">
                            Door gebruik te maken van onze diensten gaat u akkoord met onze algemene voorwaarden. Hierin leggen we de kaders van onze samenwerking vast.
                        </p>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary italic">1. Diensten</h2>
                            <p>Merlign levert diensten op het gebied van webdesign en automatisering. Wij streven naar de hoogste kwaliteit binnen de afgesproken termijnen.</p>
                        </section>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary italic">2. Betaling</h2>
                            <p>Tenzij anders overeengekomen hanteert Merlign een betalingstermijn van 14 dagen na factuurdatum.</p>
                        </section>
                        <p className="pt-12 text-sm opacity-40 italic">Laatst bijgewerkt: 8 maart 2026</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
