import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const apiKeyLine = envContent.split('\n').find(l => l.startsWith('ANTHROPIC_API_KEY='));
const apiKey = apiKeyLine ? apiKeyLine.split('=')[1] : null;

async function doFetch() {
    if (!apiKey) {
        console.error('No API key found in .env');
        return;
    }
    try {
        const res = await fetch('https://api.anthropic.com/v1/models', {
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            }
        });
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}
doFetch();
