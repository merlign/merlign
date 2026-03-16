import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Settings, Cpu, ArrowRight, Zap } from 'lucide-react';

export const BrowserMockup = ({ image, title }) => {
    return (
        <div className="relative w-full aspect-[16/10] group/mockup">
            {/* Browser Frame */}
            <div className="absolute inset-0 bg-[#1A1A1A] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col">
                {/* Toolbar */}
                <div className="h-10 md:h-12 bg-white/[0.03] border-b border-white/5 flex items-center px-6 gap-2 shrink-0">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="mx-auto bg-white/5 rounded-md px-4 py-1 flex items-center gap-2">
                        <Globe size={10} className="text-white/20" />
                        <span className="text-[11px] text-white/20 font-sans font-bold truncate max-w-[150px]">
                            {title || 'merlign.com'}
                        </span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow relative overflow-hidden bg-[#0A0A0A]">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-transparent" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-1000" />
        </div>
    );
};

export const DashboardMockup = ({ image, title }) => {
    return (
        <div className="relative w-full aspect-[16/10] group/mockup">
            {/* App Frame */}
            <div className="absolute inset-0 bg-[#141414] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex">
                {/* Sidebar */}
                <div className="w-12 md:w-16 bg-white/[0.02] border-r border-white/5 flex flex-col items-center py-6 gap-6 shrink-0">
                    <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <Settings size={14} />
                    </div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-6 h-1 rounded-full bg-white/5" />
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col pb-4">
                    <div className="h-14 border-b border-white/5 flex items-center px-8 justify-between">
                        <div className="w-24 h-2 bg-white/5 rounded-full" />
                        <div className="w-8 h-8 rounded-full bg-white/5" />
                    </div>
                    <div className="flex-grow relative m-4 md:m-6 mt-4 rounded-xl md:rounded-2xl overflow-hidden border border-white/5 bg-[#0A0A0A]">
                        {image ? (
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full p-6">
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    <div className="bg-white/[0.02] rounded-xl border border-white/5" />
                                    <div className="bg-white/[0.02] rounded-xl border border-white/5" />
                                    <div className="col-span-2 bg-white/[0.02] rounded-xl border border-white/5" />
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                    </div>
                </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-1000" />
        </div>
    );
};

export const AutomationMockup = ({ logos = [], title }) => {
    return (
        <div className="relative w-full aspect-[16/10] group/mockup flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[#0A0A0A] rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <div className="relative h-full w-full flex items-center justify-around px-12 md:px-20">
                    {/* Source */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center relative z-10 group/node shadow-lg"
                    >
                        <Cpu className="w-8 h-8 md:w-12 md:h-12 text-[#F2F0E9]/20 group-hover/node:text-primary transition-colors" />
                        <div className="absolute -inset-4 bg-primary/5 blur-xl rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity" />
                    </motion.div>

                    {/* Path */}
                    <div className="flex-grow flex items-center justify-center relative px-4">
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent relative overflow-hidden">
                            <motion.div
                                animate={{ x: ['100%', '-100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                            />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] p-2 border border-white/5 rounded-full">
                            <Zap size={16} className="text-primary animate-pulse" />
                        </div>
                    </div>

                    {/* Target */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center relative z-10 group/node shadow-xl shadow-primary/5"
                    >
                        <Settings className="w-8 h-8 md:w-12 md:h-12 text-primary brightness-125" />
                        <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity" />
                    </motion.div>
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-sans text-xs font-bold text-[#F2F0E9]/40">Proces Geoptimaliseerd</span>
                </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-8 bg-primary/5 blur-[100px] rounded-full -z-10 opacity-30" />
        </div>
    );
};
