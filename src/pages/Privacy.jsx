import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';

const Privacy = () => {
    return (
        <div className="pt-40 md:pt-56 pb-20 md:pb-32 bg-[#0A0A0A] min-h-screen relative overflow-hidden">
            <SEO title="Privacybeleid" description="Privacybeleid van Merlign. Ontdek hoe wij omgaan met uw gegevens." path="/privacy" />
            <div className="content-max-width section-px relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl space-y-12">
                    <SectionLabel>Juridisch</SectionLabel>
                    <h1 className="font-sans font-bold text-[#F2F0E9] text-h1">Privacybeleid</h1>
                    <div className="prose prose-invert max-w-4xl font-sans text-[#F2F0E9]/80 space-y-8">
                        <p className="text-xl md:text-2xl font-light italic leading-relaxed">
                            Bij Merlign hechten we grote waarde aan de privacy van onze bezoekers. In dit document leggen we uit welke gegevens we verzamelen en hoe we deze beschermen.
                        </p>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary italic">1. Gegevensverzameling</h2>
                            <p>Wij verzamelen alleen gegevens die noodzakelijk zijn voor het leveren van onze diensten. Dit omvat contactgegevens die u via onze formulieren verstuurt.</p>
                        </section>
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary italic">2. Gebruik van gegevens</h2>
                            <p>Uw gegevens worden uitsluitend gebruikt om contact met u op te nemen naar aanleiding van uw verzoek en om onze dienstverlening te verbeteren.</p>
                        </section>
                        <p className="pt-12 text-sm opacity-40 italic">Laatst bijgewerkt: 8 maart 2026</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
