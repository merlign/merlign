import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Track Google Analytics Page View
        if (typeof window.gtag === 'function') {
            window.gtag('config', 'G-Z43W0FQ842', {
                page_path: location.pathname + location.search,
            });
        }

        // Track Meta Pixel Page View
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'PageView');
        }
    }, [location]);

    return null;
};

export default Analytics;
