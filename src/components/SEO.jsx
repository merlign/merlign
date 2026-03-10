import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path = "", type = "website" }) => {
    const siteName = "Merlign";
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    const url = `https://merlign.com${path}`;
    const ogImage = "https://merlign.com/og-image.png";

    // Structured Data (Schema.org) for the specific page
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://merlign.com"
            },
            ...(path ? [{
                "@type": "ListItem",
                "position": 2,
                "name": title,
                "item": url
            }] : [])
        ]
    };

    // ProfessionalService Schema - Helps Google understand what this business is
    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Merlign",
        "image": "https://merlign.com/logo_merlign.png",
        "@id": "https://merlign.com",
        "url": "https://merlign.com",
        "telephone": "+31 6 47693209",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Dennendreef 5-111",
            "addressLocality": "Boxtel",
            "postalCode": "5282 HK",
            "addressRegion": "Noord-Brabant",
            "addressCountry": "NL"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 51.5974,
            "longitude": 5.2887
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/"
        ]
    };

    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta name="robots" content="index, follow" />

            {/* Google Search Console Verification - Replace with real code when available */}
            <meta name="google-site-verification" content="r3hVpGRHUOO4mx2O30EZ6eyUYx62mJBLucBDW9cLPZI" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Structured Data Scripts */}
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(businessSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
