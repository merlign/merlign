import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#0D0D12] text-white flex items-center justify-center p-6 text-center relative overflow-hidden">
            <SEO 
                title="404 - Pagina niet gevonden | Merlign" 
                description="De pagina die je zoekt bestaat niet of is verplaatst."
                noindex={true}
            />

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#6366F1]/[0.05] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#6366F1]/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 space-y-8 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-none opacity-10 font-drama italic">404</h1>
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Oeps. Verdwaald?</h2>
                        <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
                            De pagina die je zoekt is er niet (meer). <br className="hidden md:block" />
                            Geen zorgen, we brengen je zo weer op het juiste pad.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-3 bg-[#6366F1] text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-[1.05] active:scale-[0.98] shadow-lg shadow-[#6366F1]/20"
                    >
                        <Home size={20} />
                        Terug naar Home
                    </Link>
                    <button 
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10"
                    >
                        <ArrowLeft size={20} />
                        Vorige pagina
                    </button>
                </motion.div>
            </div>

            {/* Aesthetic Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ 
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px' 
                 }} 
            />
        </div>
    );
};

export default NotFound;
