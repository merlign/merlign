import puppeteer from 'puppeteer';
import http from 'http';
import handler from 'serve-handler';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 5500;
const DIST_DIR = path.resolve(__dirname, 'dist');

const routes = [
    '/',
    '/over-mij',
    '/cases',
    '/contact',
    '/website',
    '/dashboard',
    '/automatisering',
    '/privacy',
    '/terms'
];

async function prerender() {
    const server = http.createServer((request, response) => {
        return handler(request, response, {
            public: DIST_DIR,
            rewrites: [{ source: '/**', destination: '/index.html' }]
        });
    });

    server.listen(PORT, async () => {
        console.log(`Temp server listening on http://localhost:${PORT}`);

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
        });

        for (const route of routes) {
            console.log(`Prerendering ${route}...`);
            const page = await browser.newPage();

            // Log console messages from the page
            page.on('console', msg => console.log('PAGE LOG:', msg.text()));
            page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

            await page.setViewport({ width: 1920, height: 1080 });

            // Navigate to the route
            await page.goto(`http://localhost:${PORT}${route}`, {
                waitUntil: 'networkidle0',
                timeout: 90000
            });

            // Wait for the Sanity loader to disappear (classed as .page-loader)
            try {
                await page.waitForFunction(() => !document.querySelector('.page-loader'), { timeout: 20000 });
            } catch (e) {
                console.log(`Warning: Loader did not disappear for ${route}, proceeding anyway.`);
            }

            // Extra buffer for GSAP animations to settle
            await new Promise(r => setTimeout(r, 1000));

            const html = await page.content();

            // Determine where to save the file
            const relativePath = route === '/' ? '/index.html' : `${route}/index.html`;
            const savePath = path.join(DIST_DIR, relativePath);
            const saveDir = path.dirname(savePath);

            if (!fs.existsSync(saveDir)) {
                fs.mkdirSync(saveDir, { recursive: true });
            }

            // Write the content
            fs.writeFileSync(savePath, html);
            console.log(`Saved pre-rendered ${savePath}`);
            await page.close();
        }

        await browser.close();
        server.close();
        console.log('Prerendering finished!');
    });
}

prerender().catch(err => {
    console.error('Prerendering failed:', err);
    process.exit(1);
});
