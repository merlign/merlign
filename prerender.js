import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { client } from './src/lib/sanity.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, 'dist');
const TEMPLATE = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

const routes = [
    { path: '/', type: 'home' },
    { path: '/website', type: 'service', name: 'Website' },
    { path: '/dashboard', type: 'service', name: 'Dashboard' },
    { path: '/automatisering', type: 'service', name: 'Automation' },
    { path: '/over-mij', type: 'about' }
];

async function generate() {
    console.log('Fetching data from Sanity for SEO injection...');

    // Fetch generic FAQs (for home)
    const faqs = await client.fetch(`*[_type == "faq"] | order(order asc)`);

    for (const route of routes) {
        console.log(`Processing ${route.path}...`);

        let seoContent = '';

        if (route.type === 'service') {
            const data = await client.fetch(`*[_type == "servicePage" && serviceName == $name][0]`, { name: route.name });
            if (data) {
                seoContent += `<h1>${data.heroSans || ''} ${data.heroSerif || ''}</h1>`;
                seoContent += `<p>${data.heroSubtitle || ''}</p>`;
                // Hier voegen we de FAQ content toe voor indexatie
                if (route.name === 'Website') {
                    seoContent += `<h2>Veelgestelde vragen over websites</h2>`;
                    seoContent += `<div><b>Waarom React/Vite?</b> Veel bureaus gebruiken WordPress omdat het makkelijk is voor henzelf, maar het is vaak zwaar en traag...</div>`;
                } else if (route.name === 'Automation') {
                    seoContent += `<h2>Veelgestelde vragen over automatisering</h2>`;
                    seoContent += `<div><b>Waarom n8n?</b> Zapier is prima voor simpele taken, maar wordt extreem duur...</div>`;
                } else if (route.name === 'Dashboard') {
                    seoContent += `<h2>Veelgestelde vragen over dashboards</h2>`;
                    seoContent += `<div><b>Data bronnen combineren?</b> Ja, dat is juist de kracht van een custom dashboard...</div>`;
                }
            }
        } else if (route.type === 'home') {
            seoContent += `<h1>Cinematic Landing Pages & AI Automatisering</h1>`;
            faqs.forEach(f => {
                seoContent += `<div><h3>${f.question}</h3><p>${f.answer}</p></div>`;
            });
        }

        // Injecteer de content in een verborgen container die Google wel ziet
        const finalHtml = TEMPLATE.replace(
            '<div id="root"></div>',
            `<div id="root">
                <div id="seo-content" style="display:none" aria-hidden="true">${seoContent}</div>
            </div>`
        );

        const relativePath = route.path === '/' ? '/index.html' : `${route.path}/index.html`;
        const savePath = path.join(DIST_DIR, relativePath);
        const saveDir = path.dirname(savePath);

        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
        }

        fs.writeFileSync(savePath, finalHtml);
        console.log(`Saved ${savePath}`);
    }
}

generate().then(() => {
    console.log('SEO Injection finished!');
    process.exit(0);
}).catch(err => {
    console.error('SEO Injection failed:', err);
    process.exit(0);
});
