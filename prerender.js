import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { client } from './src/lib/sanity.js';

if (!process.env.VITE_SANITY_PROJECT_ID) {
    console.warn('⚠️ WARNING: VITE_SANITY_PROJECT_ID is missing for prerender.js. Using fallbacks.');
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, 'dist');
const TEMPLATE = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

const routes = [
    { path: '/', type: 'home' },
    { path: '/website', type: 'service', name: 'Website' },
    { path: '/dashboard', type: 'service', name: 'Dashboard' },
    { path: '/automatisering', type: 'service', name: 'Automation' },
    { path: '/over-mij', type: 'about' },
    { path: '/cases', type: 'cases' },
    { path: '/contact', type: 'contact' },
    { path: '/privacy', type: 'simple', title: 'Privacy Policy — Merlign' },
    { path: '/terms', type: 'simple', title: 'Terms of Service — Merlign' },
    { path: '/website-lp', type: 'simple', title: 'Professionele website in twee weken | Merlign', noindex: true },
    { path: '/404', type: 'simple', title: '404 - Pagina niet gevonden | Merlign', noindex: true }
];

async function generate() {
    console.log('Fetching data from Sanity for SEO injection...');

    // Fetch generic FAQs (for home)
    const faqs = await client.fetch(`*[_type == "faq"] | order(order asc)`);

    for (const route of routes) {
        console.log(`Processing ${route.path}...`);

        let seoContent = '';
        let routeTitle = 'Merlign — Webdesign & AI-automatisering';
        let routeDesc = 'Ik bouw websites die converteren, dashboards die inzicht geven en automatiseringen die tijd besparen. Geen gedoe, gewoon resultaat.';
        const schemas = [];

        try {
            if (route.type === 'service') {
                const data = await client.fetch(`*[_type == "servicePage" && serviceName == $name][0]`, { name: route.name });
                if (data) {
                    routeTitle = data.seoTitle || `${data.title || route.name} — Merlign`;
                    routeDesc = data.seoDescription || data.heroSubtitle || routeDesc;
                    seoContent += `<h1>${data.heroSans || ''} ${data.heroSerif || ''}</h1>`;
                    seoContent += `<p>${data.heroSubtitle || ''}</p>`;

                    // Inject features
                    if (data.features?.length > 0) {
                        seoContent += `<h2>Onze aanpak voor ${route.name}</h2><ul>`;
                        data.features.forEach(f => {
                            seoContent += `<li><h3>${f.title}</h3><p>${f.description}</p></li>`;
                        });
                        seoContent += `</ul>`;
                    }

                    // Inject FAQs
                    if (data.faqs?.length > 0) {
                        seoContent += `<h2>Veelgestelde vragen</h2>`;
                        data.faqs.forEach(f => {
                            seoContent += `<div><h3>${f.question}</h3><p>${f.answer}</p></div>`;
                        });
                    } else {
                        // Static fallbacks for each service
                        if (route.name === 'Website') {
                            seoContent += `<h2>Veelgestelde vragen over websites</h2>`;
                            seoContent += `<div><b>Waarom React/Vite?</b> Veel bureaus gebruiken WordPress omdat het makkelijk is voor henzelf, maar het is vaak zwaar en traag...</div>`;
                            seoContent += `<div><b>Klaar in 2 weken?</b> Ja, door een strakke workflow en focus op wat echt telt voor conversie...</div>`;
                        } else if (route.name === 'Automation') {
                            seoContent += `<h2>Veelgestelde vragen over automatisering</h2>`;
                            seoContent += `<div><b>Waarom n8n?</b> Zapier is prima voor simpele taken, maar wordt extreem duur...</div>`;
                        } else if (route.name === 'Dashboard') {
                            seoContent += `<h2>Veelgestelde vragen over dashboards</h2>`;
                            seoContent += `<div><b>Data bronnen combineren?</b> Ja, dat is juist de kracht van een custom dashboard...</div>`;
                        }
                    }
                }
            } else if (route.type === 'home') {
                const home = await client.fetch(`*[_type == "homePage"][0]`);
                routeTitle = home?.seoTitle || "Design & AI-Automatisering voor MKB & ZZP | Merlign";
                routeDesc = home?.seoDescription || home?.heroSubtitle || "Ik bouw websites die converteren, dashboards die inzicht geven en automatiseringen die tijd besparen. Geen gedoe, gewoon resultaat voor MKB & ZZP in Boxtel en omstreken.";

                seoContent += `<h1>Maatwerk Websites & AI-Automatisering</h1>`;
                seoContent += `<p>${routeDesc}</p>`;

                seoContent += `<h2>Diensten</h2>`;
                seoContent += `<ul>
                    <li>Website ontwerp & realisatie</li>
                    <li>Data dashboards & insights</li>
                    <li>AI & Workflow automatisering</li>
                </ul>`;

                faqs.forEach(f => {
                    seoContent += `<div><h3>${f.question}</h3><p>${f.answer}</p></div>`;
                });
            } else if (route.type === 'about') {
                const about = await client.fetch(`*[_type == "aboutPage"][0]`);
                routeTitle = about?.seoTitle || "Over Merlign — Design & Strategie";
                routeDesc = about?.seoDescription || "Lees meer over de visie van Merlijn op design en automatisering.";
                seoContent += `<h1>Over Merlign</h1>`;
                seoContent += `<p>Merlijn is een senior digitaal strateeg met meer dan 10 jaar ervaring in design en ontwikkeling.</p>`;
            } else if (route.type === 'cases') {
                const cases = await client.fetch(`*[_type == "caseStudy"] | order(order asc)`);
                routeTitle = "Cases & Resultaten — Merlign";
                routeDesc = "Bekijk hoe ik andere ondernemers hielp aan meer tijd en overzicht. Van snelle websites tot volledige AI-automatiseringen.";

                seoContent += `<h1>Projecten & Successen</h1><p>${routeDesc}</p>`;

                if (cases?.length > 0) {
                    seoContent += `<div class="cases-list">`;
                    cases.forEach(c => {
                        seoContent += `<article>
                            <h2>${c.title}</h2>
                            <p class="date">Opgeleverd: ${c.completionDate || 'Recent'}</p>
                            <p><strong>Situatie:</strong> ${c.situatie || ''}</p>
                            <p><strong>Aanpak:</strong> ${c.aanpak || ''}</p>
                            <h3>Resultaten:</h3>
                            <ul>${c.results?.map(r => `<li>${r}</li>`).join('') || ''}</ul>
                            <blockquote>${c.quote || ''} — ${c.author || ''}</blockquote>
                        </article>`;

                        schemas.push({
                            "@context": "https://schema.org",
                            "@type": "CreativeWork",
                            "name": c.title,
                            "description": c.situatie,
                            "datePublished": c.completionDate,
                            "author": { "@type": "ProfessionalService", "name": "Merlign" },
                            "review": {
                                "@type": "Review",
                                "reviewBody": c.quote,
                                "author": { "@type": "Person", "name": c.author }
                            }
                        });
                    });
                    seoContent += `</div>`;
                }
            } else if (route.type === 'contact') {
                const contact = await client.fetch(`*[_type == "contactInfo"][0]`);
                routeTitle = contact?.seoTitle || "Contact opnemen — Merlign";
                routeDesc = contact?.seoDescription || "Heb je een vraag of wil je direct een gratis check inplannen?";
                seoContent += `<h1>Contact opnemen</h1>`;
                seoContent += `<p>Plan direct een afspraak in of stel je vraag via de website.</p>`;
            } else if (route.type === 'simple') {
                routeTitle = route.title;
                routeDesc = "Lees onze voorwaarden.";
                seoContent += `<h1>${route.title}</h1>`;
            }
        } catch (fetchErr) {
            console.warn(`⚠️ Warning: Content fetch failed for ${route.path}. Using basic fallbacks. Message: ${fetchErr.message}`);
        }
        // Inject content into body
        // We put it inside #root so it's visible to bots but gets replaced by React on hydration
        // We use inline styles to hide it visually from users to avoid FOUC
        const hiddenStyle = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0;';
        let finalHtml = TEMPLATE.replace(
            '<div id="root"></div>',
            `<div id="root"><div style="${hiddenStyle}">${seoContent}</div></div>`
        );

        // 1. Breadcrumb Schema (All pages)
        schemas.push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merlign.com" },
                ...(route.path !== '/' ? [{ "@type": "ListItem", "position": 2, "name": route.name || route.title, "item": `https://merlign.com${route.path}` }] : [])
            ]
        });

        // 2. Business/Service Schema
        if (route.type === 'home') {
            schemas.push({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "Merlign",
                "image": "https://merlign.com/logo_merlign.png",
                "@id": "https://merlign.com",
                "url": "https://merlign.com",
                "telephone": "+31 6 47693209",
                "priceRange": "€€",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Boxtel",
                    "addressRegion": "Noord-Brabant",
                    "postalCode": "5282 HK",
                    "addressCountry": "NL"
                },
                "sameAs": [
                    "https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/"
                ]
            });
        }

        if (route.type === 'service') {
            const data = await client.fetch(`*[_type == "servicePage" && serviceName == $name][0]`, { name: route.name });
            if (data) {
                schemas.push({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": data.title || route.name,
                    "provider": { "@type": "ProfessionalService", "name": "Merlign" },
                    "description": data.seoDescription || data.heroSubtitle
                });

                if (data.faqs?.length > 0) {
                    schemas.push({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": data.faqs.map(f => ({
                            "@type": "Question",
                            "name": f.question,
                            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
                        }))
                    });
                }
            }
        }

        // Inject meta tags AND schemas into head
        const schemaScripts = schemas.map(s => `\n    <script type="application/ld+json">${JSON.stringify(s)}</script>`).join('');

        const metaTags = `
    <title>${routeTitle}</title>
    <meta name="description" content="${routeDesc}">
    <meta name="google-site-verification" content="r3hVpGRHUOO4mx2O30EZ6eyUYx62mJBLucBDW9cLPZI">
    <meta property="og:title" content="${routeTitle}">
    <meta property="og:description" content="${routeDesc}">
    <link rel="canonical" href="https://merlign.com${route.path === '/' ? '' : route.path}">
    ${route.noindex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow">'}${schemaScripts}`;

        finalHtml = finalHtml.replace('</head>', `${metaTags}\n</head>`);

        // Save HTML
        const relativePath = route.path === '/' ? '/index.html' : route.path === '/404' ? '/404.html' : `${route.path}/index.html`;
        const savePath = path.join(DIST_DIR, relativePath);
        const saveDir = path.dirname(savePath);

        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
        }

        fs.writeFileSync(savePath, finalHtml);
        console.log(`✅ Saved ${savePath}`);
    }
}

generate().then(() => {
    console.log('SEO Injection finished!');
    process.exit(0);
}).catch(err => {
    console.error('SEO Injection failed:', err);
    process.exit(1);
});
