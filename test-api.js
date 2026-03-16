import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf-8');
const keyLine = envFile.split('\n').find(row => row.startsWith('ANTHROPIC_API_KEY='));
const apiKey = keyLine ? keyLine.split('=')[1].trim() : null;

if (!apiKey) {
    console.error('No ANTHROPIC_API_KEY found in .env');
    process.exit(1);
}

const payload = {
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 100,
    messages: [{ role: 'user', content: 'Say hello' }]
};

fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
})
    .then(res => res.json())
    .then(data => console.log('Sonnet Response:', JSON.stringify(data)))
    .catch(console.error);

fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
    },
    body: JSON.stringify({ ...payload, model: 'claude-3-5-haiku-20241022' })
})
    .then(res => res.json())
    .then(data => console.log('Haiku Response:', JSON.stringify(data)))
    .catch(console.error);
