import fs from 'fs';
const envLine = fs.readFileSync('.env', 'utf8').split('\n').find(l => l.startsWith('ANTHROPIC_API_KEY='));
const apiKey = envLine ? envLine.split('=')[1] : null;

if (!apiKey) {
    console.log('No key found in .env');
    process.exit(1);
}

fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'claude-3-5-haiku-20241022', max_tokens: 10, messages: [{ role: 'user', content: 'test' }] })
})
    .then(res => Promise.all([res.status, res.text()]))
    .then(console.log)
    .catch(console.error);
