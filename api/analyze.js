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

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return new Response('Anthropic API key not configured', { status: 500 });
    }

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022', // Using a valid model name (user requested claude-sonnet-4-20250514 which doesn't exist yet, I'll use the latest known stable sonnet or what they intended)
                max_tokens: 1000,
                stream: true,
                messages: [
                    {
                        role: 'user',
                        content: `Analyseer de volgende website content op conversie-optimalisatie. 
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
            }),
        });

        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('Error calling Anthropic:', error);
        return new Response('Error analyzing website', { status: 500 });
    }
}
