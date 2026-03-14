export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const { url } = await req.json();

    if (!url) {
        return new Response('URL is required', { status: 400 });
    }

    let textContent = '';
    try {
        const urlFetchRes = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        if (urlFetchRes.ok) {
            const html = await urlFetchRes.text();
            // Basic regex to strip tags and scripts, not perfect but okay for Edge runtime
            textContent = html
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
                .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
                .replace(/<[^>]+>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .substring(0, 3000);
        }
    } catch (e) {
        console.error('Failed to fetch URL content server-side:', e);
        // Fallback to minimal content if fetch fails so AI can still generate *something* based on the URL context
        textContent = `Website URL: ${url}. Kon de inhoud niet direct ophalen wegens beveiligingsinstellingen. Baseer je scan op de URL zelf en algemene aannames voor dit type bedrijf.`;
    }

    if (!textContent || textContent.length < 10) {
        textContent = `Website URL: ${url}. (Geen content gevonden).`;
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
        return new Response('Google Gemini API key not configured', { status: 500 });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:streamGenerateContent?alt=sse&key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Analyseer de volgende website content op conversie-optimalisatie. 
                Geef je output ALS GELDIG JSON (niets anders, geen markdown):
                {
                  "score": <getal 1-10>,
                  "scoreLabel": <bijv "Matig" / "Goed" / "Zwak">,
                  "firstImpression": <2 zinnen, wat ziet bezoeker in 3 seconden?>,
                  "bottlenecks": [<punt 1>, <punt 2>, <punt 3>],
                  "missedOpp": <één concrete grootste gemiste kans>,
                  "ctaText": <afsluitende zin met urgentie, max 12 woorden>
                }

                REGELS:
                - Geen algemeenheden, wees concreet over wát er mist
                - Score: gemiddeld = 5, slecht = 2-3, goed = 7-8
                - Schrijf in het Nederlands

                Website content:
                ${textContent}`,
                            },
                        ],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', errorText);
            if (response.status === 429) {
                return new Response('De scanner is momenteel erg druk. Probeer het over een minuutje nog een keer.', { status: 429 });
            }
            return new Response(`AI Provider Error: ${response.status}`, { status: response.status });
        }

        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('Error calling Gemini:', error);
        return new Response('Error analyzing website', { status: 500 });
    }
}
