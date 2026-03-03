import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: '1r5lk62n',
    dataset: 'production',
    useCdn: true, // `false` als je de allernieuwste data wilt, `true` voor extra snelheid
    apiVersion: '2023-05-03', // Of een recentere datum
})

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
    return await client.fetch(`*[_type == "caseStudy"]`)
}

export async function getServicePageData(serviceName) {
    return await client.fetch(`*[_type == "servicePage" && serviceName == $serviceName][0]`, { serviceName })
}

export async function getContactInfo() {
    return await client.fetch(`*[_type == "contactInfo"][0]`)
}

