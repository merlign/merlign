import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const SectionLabel = ({ children, className = "" }) => (
    <motion.div
        variants={fadeUp}
        className={`flex items-center ${className}`}
    >
        <span className="font-sans text-[15px] md:text-[17px] text-primary font-bold tracking-tight">
            {children}
        </span>
    </motion.div>
);

export default SectionLabel;
