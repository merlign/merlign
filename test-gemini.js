
import fs from 'fs';
import path from 'path';

async function testGemini() {
    // Manually read .env
    const envPath = path.resolve('.env');
    let apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey && fs.existsSync(envPath)) {
        const env = fs.readFileSync(envPath, 'utf8');
        const match = env.match(/GOOGLE_GEMINI_API_KEY=(.*)/);
        if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
    }

    if (!apiKey) {
        console.error('GOOGLE_GEMINI_API_KEY not found in process.env or .env');
        return;
    }

    console.log('Using API Key starting with:', apiKey.substring(0, 5));

    const endpoints = [
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`
    ];

    for (const url of endpoints) {
        console.log(`\nTesting ${url.replace(apiKey, 'REDACTED')}...`);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: 'Hello' }] }]
                })
            });
            console.log(`Status: ${res.status}`);
            const text = await res.text();
            if (!res.ok) {
                console.log(`Error Response: ${text.substring(0, 200)}...`);
            } else {
                console.log('Success! Response length:', text.length);
            }
        } catch (e) {
            console.log(`Fetch error: ${e.message}`);
        }
    }
}

testGemini();
