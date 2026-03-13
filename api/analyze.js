export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const { content } = await req.json();

    if (!content) {
        return new Response('Content is required', { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
        return new Response('Google Gemini API key not configured', { status: 500 });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`, {
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
                ${content}`,
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
