import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path = "" }) => {
    const fullTitle = `${title} — Merlign`;
    const url = `https://merlign.com${path}`;
    const ogImage = "https://merlign.com/og-image.png";

    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Breadcrumb Schema */}
            {path && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Merlign",
                                "item": "https://merlign.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": title,
                                "item": url
                            }
                        ]
                    })}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
