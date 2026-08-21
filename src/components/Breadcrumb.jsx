import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[var(--text)]/40 mb-6">
        <Link to="/" className="hover:text-[var(--text)]/70 transition-colors">Home</Link>
        {items.map((item, i) => (
            <React.Fragment key={i}>
                <ChevronRight size={11} className="shrink-0" />
                {item.href ? (
                    <Link to={item.href} className="hover:text-[var(--text)]/70 transition-colors">{item.label}</Link>
                ) : (
                    <span className="text-[var(--text)]/60">{item.label}</span>
                )}
            </React.Fragment>
        ))}
    </nav>
);

export default Breadcrumb;
