import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'Merlign_Ads_Gradients');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR);
}

const styles = [
  { name: '1_Midnight_Glow', css: 'radial-gradient(circle at 50% 150%, rgba(99, 102, 241, 0.15) 0%, #0D0D12 60%)' },
  { name: '2_Cyber_Slash', css: 'radial-gradient(circle at -10% -10%, rgba(99, 102, 241, 0.12) 0%, transparent 50%), radial-gradient(circle at 110% 110%, rgba(99, 102, 241, 0.08) 0%, #0D0D12 60%)' },
  { name: '3_Deep_Eclipse', css: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.09) 0%, #0D0D12 70%)' },
  { name: '4_Indigo_Horizon', css: 'radial-gradient(ellipse at 50% -50%, rgba(99, 102, 241, 0.18) 0%, #0D0D12 70%)' }
];

const sizes = [
  { name: 'Feed_1080x1080', w: 1080, h: 1080 },
  { name: 'Story_1080x1920', w: 1080, h: 1920 }
];

(async () => {
  console.log('🖼️  Puppeteer is generating 8 high-res PNG gradients...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const style of styles) {
    for (const size of sizes) {
      await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 1 });
      
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; background-color: #0D0D12; }
            .box {
              width: ${size.w}px;
              height: ${size.h}px;
              background: ${style.css};
              position: relative;
            }
            .box::after {
              content: "";
              position: absolute;
              inset: 0;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
              mix-blend-mode: overlay;
              pointer-events: none;
            }
          </style>
        </head>
        <body><div class="box"></div></body>
        </html>
      `;
      
      await page.setContent(html);
      // Wait a tiny bit for the SVG filter to render smoothly
      await new Promise(r => setTimeout(r, 500));
      
      const fileName = `${style.name}_${size.name}.png`;
      const filePath = path.join(OUT_DIR, fileName);
      
      await page.screenshot({ path: filePath });
      console.log(`✅ Saved: ${fileName}`);
    }
  }

  await browser.close();
  console.log('🎉 Done! All PNGs saved to /Merlign_Ads_Gradients');
})();
