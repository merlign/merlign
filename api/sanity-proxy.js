import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN, // Gebruik PRIVATE token in Vercel Dashboard
    useCdn: false,
    apiVersion: '2023-05-03',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { query, params } = req.body;

        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }

        const data = await client.fetch(query, params || {});
        return res.status(200).json(data);
    } catch (error) {
        console.error('Sanity Proxy Error:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
