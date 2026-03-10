import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'casesPage',
    title: 'Projecten Overzicht',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO / Zoekmachine' },
    ],
    fields: [
        defineField({
            name: 'seoTitle',
            title: 'SEO Titel',
            type: 'string',
            group: 'seo',
            initialValue: 'Projecten & Successen — Merlign',
            description: 'De titel die getoond wordt in Google. Laat leeg om de standaard te gebruiken.'
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Omschrijving',
            type: 'text',
            group: 'seo',
            initialValue: 'Bekijk de cases en projecten die ik heb uitgevoerd voor diverse klanten. Van high-end websites tot slimme AI-automatiseringen.',
            description: 'De tekst die getoond wordt onder de titel in Google.'
        }),
        defineField({
            name: 'headlineSans',
            title: 'Headline (Sans)',
            type: 'string',
            initialValue: 'Recente'
        }),
        defineField({
            name: 'headlineSerif',
            title: 'Headline (Serif)',
            type: 'string',
            initialValue: 'Projecten.'
        }),
        defineField({
            name: 'subtitle',
            title: 'Ondertitel',
            type: 'text',
            initialValue: 'Een selectie van werk dat echt impact heeft gemaakt.'
        }),
    ]
})
