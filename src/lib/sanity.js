import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Helper to get env variables in both Vite and Node.js environments
const getEnv = (key) => {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
        return import.meta.env[key];
    }
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
        return process.env[key];
    }
    return '';
};

export const client = createClient({
    projectId: getEnv('VITE_SANITY_PROJECT_ID'),
    dataset: getEnv('VITE_SANITY_DATASET') || 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
    if (!source) return null;
    return builder.image(source)
}

export async function getHomePageData() {
    return await client.fetch(`*[_type == "homePage"][0]`)
}

export async function getAboutPageData() {
    return await client.fetch(`*[_type == "aboutPage"][0]`)
}

export async function getFaqs() {
    return await client.fetch(`*[_type == "faq"] | order(order asc)`)
}

export async function getCases() {
    try {
        const data = await client.fetch(`*[_type == "caseStudy" && showOnWebsite == true]`)
        return Array.isArray(data) ? data : []
    } catch (err) {
        console.error("Sanity getCases Error:", err);
        return [];
    }
}

export async function getServicePageData(serviceName) {
    return await client.fetch(`*[_type == "servicePage" && serviceName == $serviceName][0]`, { serviceName })
}

export async function getContactInfo() {
    return await client.fetch(`*[_type == "contactInfo"][0]`)
}

export async function getCasesPageData() {
    return await client.fetch(`*[_type == "casesPage"][0]`)
}

