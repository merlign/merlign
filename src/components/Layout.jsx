import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Linkedin, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import WhatsAppWidget from './WhatsAppWidget';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDienstenOpen, setIsDienstenOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDienstenOpen(false);
    }, [pathname]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const navLinks = [
        { label: 'Over mij', href: '/over-mij' },
        { label: 'Cases', href: '/cases' },
        { label: 'Contact', href: '/contact' }
    ];

    const services = [
        { label: 'Website', href: '/website', desc: 'Live in 72 uur' },
        { label: 'Dashboard', href: '/dashboard', desc: 'Direct inzicht' },
        { label: 'Automatisering', href: '/automatisering', desc: 'Tijd terug' }
    ];

    return (
        <>
            <div className="fixed top-4 md:top-6 left-0 w-full z-[100] px-4 md:px-20 pointer-events-none">
                <nav className={`max-w-[1500px] mx-auto pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] rounded-full border ${isScrolled ? 'bg-[#0A0A0A]/60 backdrop-blur-xl border-white/5 py-3 md:py-4 px-6 md:px-10 shadow-2xl' : 'bg-[#0A0A0A]/20 backdrop-blur-sm border-white/5 py-4 md:py-6 px-4'}`}>
                    <div className="flex items-center justify-between">
                        <Link
                            to="/"
                            onClick={(e) => {
                                if (pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                                setIsMobileMenuOpen(false);
                            }}
                            className="relative z-10"
                        >
                            <img src="/logo_merlign.png" alt="Merlign" className="h-5 md:h-6 transition-all duration-500 brightness-0 invert" />
                        </Link>

                        <div className="hidden lg:flex items-center gap-10 font-mono text-[13px] uppercase tracking-[0.3em] text-[#F2F0E9]/60">
                            {/* Diensten Dropdown */}
                            <div
                                className="relative group/diensten"
                                onMouseEnter={() => setIsDienstenOpen(true)}
                                onMouseLeave={() => setIsDienstenOpen(false)}
                            >
                                <button className="hover:text-[#F2F0E9] transition-colors py-2 flex items-center gap-2 font-bold group font-sans text-[13px] uppercase tracking-widest">
                                    Diensten
                                    <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                                </button>

                                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-500 ${isDienstenOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                    <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-6 shadow-2xl w-[280px] backdrop-blur-3xl">
                                        <div className="space-y-2">
                                            {services.map((s, i) => (
                                                <Link
                                                    key={i}
                                                    to={s.href}
                                                    className="block p-4 rounded-[1.5rem] hover:bg-primary/10 transition-all group/item"
                                                >
                                                    <p className="text-[#F2F0E9] font-sans font-bold text-[13px] uppercase tracking-widest leading-none">{s.label}</p>
                                                    <p className="text-[#F2F0E9]/60 font-sans text-[9px] uppercase tracking-widest mt-2">{s.desc}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {navLinks.map((link, i) => (
                                <Link key={i} to={link.href} className="hover:text-[#F2F0E9] transition-colors py-2 relative group font-bold">
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 md:gap-6 relative z-10">
                            <a href="#contact" className="hidden sm:block btn-magnetic group bg-white/5 text-white px-6 py-2.5 rounded-full overflow-hidden">
                                <span className="relative z-10 text-[12px] font-bold uppercase tracking-widest">Gratis adviesgesprek</span>
                                <div className="btn-bg bg-primary shadow-[0_0_20px_rgba(201,168,76,0.5)]" />
                            </a>

                            <button
                                className="lg:hidden w-10 h-10 flex items-center justify-center text-[#F2F0E9]/60 hover:text-[#F2F0E9] transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[90] bg-[#0A0A0A] flex flex-col pt-32 px-8 lg:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            <div className="space-y-4">
                                <button
                                    className="flex items-center gap-4 text-[#F2F0E9] uppercase tracking-tighter font-sans text-3xl font-bold py-2"
                                    onClick={() => setIsDienstenOpen(!isDienstenOpen)}
                                >
                                    Diensten
                                    <ChevronDown size={24} className={`transition-transform duration-500 text-primary ${isDienstenOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isDienstenOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-1 gap-4 pl-4">
                                                {services.map((s, i) => (
                                                    <Link
                                                        key={i}
                                                        to={s.href}
                                                        className="text-xl md:text-2xl font-sans font-bold uppercase tracking-widest text-[#F2F0E9]/60 hover:text-[#F2F0E9] transition-colors pl-4"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {s.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-8">
                                {navLinks.map((link, i) => (
                                    <Link
                                        key={i}
                                        to={link.href}
                                        className="text-3xl font-sans font-bold text-[#F2F0E9] uppercase tracking-tighter"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pb-12 space-y-8">
                            <a
                                href="#contact"
                                className="w-full bg-primary text-[#0A0A0A] py-5 rounded-full font-mono text-[14px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-4 group overflow-hidden relative"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="relative z-10">Gratis adviesgesprek</span>
                                <ArrowRight size={18} className="relative z-10" />
                                <div className="btn-bg bg-[#F2F0E9]" />
                            </a>
                            <div className="flex justify-center gap-8 text-[#F2F0E9]/20 font-mono text-[10px] uppercase tracking-[0.4em]">
                                <span>© 2026</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Footer = ({ data }) => {
    const { pathname } = useLocation();
    const description = data?.footerDescription || "Websites, dashboards en automatiseringen voor ondernemers die vooruit willen.";
    const linkedinLink = data?.linkedin || "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/";

    return (
        <footer className="bg-[#141414] text-[#F2F0E9] pt-12 md:pt-20 pb-12 px-6 md:px-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="max-w-[1500px] mx-auto px-8 md:px-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-32 border-b border-white/5 pb-10 md:pb-16">
                    <div className="md:col-span-2 space-y-10 md:space-y-16">
                        <Link
                            to="/"
                            onClick={(e) => {
                                if (pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                        >
                            <img src="/logo_merlign.png" alt="Merlign" className="h-8 brightness-0 invert" />
                        </Link>
                        <div className="space-y-8 text-left">
                            <div className="pt-4">
                                <p className="font-sans text-[#F2F0E9]/60 italic text-lg max-w-md leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8 md:space-y-12 pt-8 md:pt-0">
                        <h5 className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.5em] text-[#F2F0E9]/40 font-black italic">Archief</h5>
                        <ul className="space-y-4 md:space-y-6 font-mono text-[14px] md:text-[16px] uppercase tracking-[0.2em] font-bold">
                            <li><Link to="/over-mij" className="text-[#F2F0E9]/60 hover:text-primary transition-colors">Over mij</Link></li>
                            <li><Link to="/cases" className="text-[#F2F0E9]/60 hover:text-primary transition-colors">Cases</Link></li>
                            <li><Link to="/contact" className="text-[#F2F0E9]/60 hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-8 md:space-y-12 pt-8 md:pt-0">
                        <h5 className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.5em] text-[#F2F0E9]/40 font-black italic">Sociaal</h5>
                        <ul className="space-y-4 md:space-y-6 font-mono text-[14px] md:text-[16px] uppercase tracking-[0.2em] font-bold">
                            <li><a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-[#F2F0E9]/60 hover:text-primary transition-colors">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 pt-8 md:pt-10 border-t border-white/5">
                    <div className="flex items-center gap-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black italic text-[#F2F0E9]/45">
                        <span>© 2026 MERLIJN VAN DER VLEUTEN</span>
                    </div>
                    <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.4em] text-[#F2F0E9]/20">
                        <a href="#" className="hover:text-primary transition-colors italic">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors italic">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

import { getContactInfo } from '../lib/sanity';

const Layout = ({ children }) => {
    const { pathname, hash } = useLocation();
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        // Scroll to top or specific hash on route change
        if (!hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
        } else {
            const id = hash.substring(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }

        const fetchContact = async () => {
            try {
                const data = await getContactInfo();
                setContactInfo(data);
            } catch (err) {
                console.error("Footer Contact Error:", err);
            }
        };
        fetchContact();
    }, [pathname, hash]);

    return (
        <div className="bg-[#0A0A0A] text-[#F2F0E9] selection:bg-primary selection:text-black min-h-screen">
            <Navbar />
            <main>{children}</main>
            <WhatsAppWidget phoneNumber={contactInfo?.whatsappPhone || "+31612345678"} />
            <Footer data={contactInfo} />
        </div>
    );
};

export default Layout;
