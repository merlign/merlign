import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Linkedin, ArrowRight, ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react';
import WhatsAppWidget from './WhatsAppWidget';
import CookieBanner from './CookieBanner';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDienstenOpen, setIsDienstenOpen] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDienstenOpen(false);
    }, [pathname]);

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(true), 1500);
        const removeTimer = setTimeout(() => setShowHint(false), 8000); // 1.5s delay + 8s (4 pulses)
        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, []);

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
        { label: 'Website', href: '/website', desc: 'Live in 2 weken' },
        { label: 'Dashboard', href: '/dashboard', desc: 'Direct inzicht' },
        { label: 'Automatisering', href: '/automatisering', desc: 'Tijd terug' }
    ];

    return (
        <>
            <div className="fixed top-4 md:top-5 left-0 w-full z-[100] px-4 md:px-12 pointer-events-none">
                <nav className={`max-w-[1400px] mx-auto pointer-events-auto transition-[padding,background-color,border-color,box-shadow] duration-500 ease-out rounded-full border ${isScrolled ? 'bg-[var(--background)]/60 backdrop-blur-xl border-[var(--border)] py-2 md:py-3 px-6 md:px-8 shadow-2xl' : 'bg-[var(--background)]/20 backdrop-blur-sm border-[var(--border)] py-3 md:py-4 px-4'}`}>
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
                            <img src="/logo_merlign.png" alt="Merlign" className={`h-5 md:h-6 transition-all duration-500 ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`} />
                        </Link>

                        <div className="hidden lg:flex items-center gap-10 font-sans text-[15px] text-[var(--text)]/60">
                            {/* Diensten Dropdown */}
                            <div
                                className="relative group/diensten"
                                onMouseEnter={() => setIsDienstenOpen(true)}
                                onMouseLeave={() => setIsDienstenOpen(false)}
                            >
                                <button className="hover:text-[var(--text)] transition-colors py-2 flex items-center gap-2 font-bold font-sans text-[15px]">
                                    Diensten
                                    <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                                </button>

                                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-500 ${isDienstenOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                    <div className="bg-[var(--paper)] border-[var(--border)] rounded-[2rem] p-6 shadow-2xl w-[280px] backdrop-blur-3xl">
                                        <div className="space-y-2">
                                            {services.map((s, i) => (
                                                <Link
                                                    key={i}
                                                    to={s.href}
                                                    className="block p-4 rounded-[1.5rem] hover:bg-primary/10 transition-all group/item"
                                                >
                                                    <p className="text-[var(--text)] font-sans font-bold text-[14px] leading-none">{s.label}</p>
                                                    <p className="text-[var(--text)]/60 font-sans text-[11px] mt-2 italic">{s.desc}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {navLinks.map((link, i) => (
                                <Link key={i} to={link.href} className="hover:text-[var(--text)] transition-colors py-2 relative group font-bold">
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 md:gap-6 relative z-10">
                            <a href="#contact" className="hidden sm:block btn-magnetic group bg-[var(--text)]/5 text-[var(--text)] px-6 py-2.5 rounded-full border border-[var(--border)] overflow-hidden">
                                <span className="relative z-10 text-[14px] font-bold">Gratis adviesgesprek</span>
                                <div className="btn-bg bg-primary shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
                            </a>

                            <button
                                onClick={(e) => toggleTheme(e)}
                                className={`w-10 h-10 flex items-center justify-center text-[var(--text)]/60 hover:text-[var(--text)] transition-colors rounded-full bg-[var(--text)]/5 ${showHint ? 'animate-theme-hint' : ''}`}
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <button
                                className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--text)]/60 hover:text-[var(--text)] transition-colors"
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
                        className="fixed inset-0 z-[90] bg-[var(--background)] flex flex-col pt-32 px-8 lg:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            <div className="space-y-4">
                                <button
                                    className="flex items-center gap-4 text-[var(--text)] font-sans text-3xl font-bold py-2"
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
                                                        className="text-xl md:text-2xl font-sans font-bold text-[var(--text)]/60 hover:text-[var(--text)] transition-colors pl-4"
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
                                        className="text-3xl font-sans font-bold text-[var(--text)]"
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
                                className="w-full bg-primary text-white py-5 rounded-full font-sans text-[16px] font-bold flex items-center justify-center gap-4 group border border-white/10 overflow-hidden relative"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="relative z-10">Gratis adviesgesprek</span>
                                <ArrowRight size={18} className="relative z-10" />
                                <div className="btn-bg bg-primary" />
                            </a>
                            <div className="flex justify-center gap-8 text-[var(--text)]/20 font-sans text-[13px] font-bold">
                                <span>© 2026</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Footer = ({ data, theme }) => {
    const { pathname } = useLocation();
    const description = data?.footerDescription || "Websites, dashboards en automatiseringen voor ondernemers die vooruit willen.";
    const linkedinLink = data?.linkedin || "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/";

    return (
        <footer className="bg-[var(--paper)] text-[var(--text)] pt-12 md:pt-16 pb-12 px-6 md:px-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 border-b border-[var(--border)] pb-10 md:pb-12">
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
                            <img src="/logo_merlign.png" alt="Merlign" className={`h-8 transition-all duration-500 ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`} />
                        </Link>
                        <div className="space-y-8 text-left">
                            <div className="pt-4">
                                <p className="font-sans text-[var(--text)]/60 italic text-lg max-w-md leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8 md:space-y-12 pt-8 md:pt-0">
                        <h5 className="font-sans text-[14px] md:text-[16px] text-primary font-bold tracking-tight">Archief</h5>
                        <ul className="space-y-4 md:space-y-6 font-sans text-[15px] md:text-[17px] font-bold">
                            <li><Link to="/over-mij" className="text-[var(--text)]/60 hover:text-primary transition-colors">Over mij</Link></li>
                            <li><Link to="/cases" className="text-[var(--text)]/60 hover:text-primary transition-colors">Cases</Link></li>
                            <li><Link to="/contact" className="text-[var(--text)]/60 hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-8 md:space-y-12 pt-8 md:pt-0">
                        <h5 className="font-sans text-[14px] md:text-[16px] text-primary font-bold tracking-tight">Sociaal</h5>
                        <ul className="space-y-4 md:space-y-6 font-sans text-[15px] md:text-[17px] font-bold">
                            <li><a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-[var(--text)]/60 hover:text-primary transition-colors">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 pt-8 md:pt-10 border-t border-[var(--border)]">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 font-sans text-[12px] md:text-[14px] font-bold text-[var(--text)]/40">
                        <div className="flex items-center gap-4">
                            <span>© 2026 Merlign</span>
                            <span className="opacity-40">|</span>
                            <span>KVK: 75629887</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden md:inline opacity-40">|</span>
                            <span>Boxtel, Nederland</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 font-sans text-[12px] md:text-[14px] font-bold text-[var(--text)]/30 group">
                        <Link to="/privacy" className="hover:text-primary transition-colors hover:translate-y-[-1px] inline-block">Privacybeleid</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors hover:translate-y-[-1px] inline-block">Algemene Voorwaarden</Link>
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
    const [theme, setTheme] = useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        }
        return 'dark';
    });

    useEffect(() => {
        // Class is already set by index.html script, so we just sync state
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme !== theme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = (e) => {
        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? window.innerHeight / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        if (!document.startViewTransition) {
            updateTheme();
            return;
        }

        const transition = document.startViewTransition(() => {
            updateTheme();
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    };

    const updateTheme = () => {
        const h = document.documentElement;
        h.classList.add('no-transitions');
        if (theme === 'dark') {
            h.classList.remove('dark');
            setTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            h.classList.add('dark');
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
        h.classList.remove('no-transitions');
    };

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
        <div className="bg-[var(--background)] text-[var(--text)] selection:bg-primary selection:text-white dark:selection:text-black min-h-screen">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>{children}</main>
            <WhatsAppWidget phoneNumber={contactInfo?.whatsappPhone || "31647693209"} />
            <CookieBanner />
            <Footer data={contactInfo} theme={theme} />
        </div>
    );
};

export default Layout;
