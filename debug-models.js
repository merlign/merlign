import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const apiKeyLine = envContent.split('\n').find(l => l.startsWith('ANTHROPIC_API_KEY='));
const apiKey = apiKeyLine ? apiKeyLine.split('=')[1]?.trim() : null;

async function checkModels() {
    if (!apiKey) {
        console.error('❌ Geen API key gevonden in .env');
        return;
    }

    console.log('📡 Bezig met ophalen model-lijst van Anthropic...');

    try {
        const res = await fetch('https://api.anthropic.com/v1/models', {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            }
        });

        if (!res.ok) {
            const err = await res.text();
            console.error(`❌ API Error ${res.status}:`, err);
            return;
        }

        const data = await res.json();
        console.log('✅ Beschikbare modellen voor jouw account:');
        data.data.forEach(m => console.log(`- ${m.id} (Release: ${m.created_at || 'unknown'})`));
    } catch (e) {
        console.error('❌ Netwerk error:', e.message);
    }
}

checkModels();
