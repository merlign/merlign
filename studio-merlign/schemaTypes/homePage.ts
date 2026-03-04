import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Homepagina',
    type: 'document',
    fields: [
        defineField({
            name: 'heroSans',
            title: 'Hero Headline (Sans - Bold)',
            type: 'string',
            description: 'Bijv: "Duidelijke taal."'
        }),
        defineField({
            name: 'heroSerif',
            title: 'Hero Headline (Serif - Italic)',
            type: 'string',
            description: 'Bijv: "Harde resultaten."'
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Ondertitel',
            type: 'text'
        }),
        defineField({
            name: 'heroCta',
            title: 'Hero Knop Tekst',
            type: 'string'
        }),
        // Value Props / Features (Service Cards)
        defineField({
            name: 'features',
            title: 'Dienst Kaarten op Home (Titel \u0026 Omschrijving)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Titel', type: 'string' },
                        { name: 'description', title: 'Omschrijving', type: 'text' }
                    ]
                }
            ]
        }),
        // "Wie ben ik?" Section
        defineField({
            name: 'aboutHeadlineSans',
            title: 'About Sectie Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'aboutHeadlineSerif',
            title: 'About Sectie Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'aboutPara1',
            title: 'About Sectie Paragraaf 1',
            type: 'text',
        }),
        defineField({
            name: 'aboutPara2',
            title: 'About Sectie Paragraaf 2',
            type: 'text',
        }),
        // "Wat ik bouw" (Services) Header
        defineField({
            name: 'servicesHeadlineSans',
            title: 'Diensten Sectie Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'servicesHeadlineSerif',
            title: 'Diensten Sectie Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'servicesSubtitle',
            title: 'Diensten Sectie Ondertitel',
            type: 'text',
        }),
        // "Het Traject" (Process) Section
        defineField({
            name: 'processHeadlineSans',
            title: 'Proces Sectie Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'processHeadlineSerif',
            title: 'Proces Sectie Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'processSteps',
            title: 'Home Proces Stappen (3)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'stepNumber', title: 'Stap Nummer (bijv "01")', type: 'string' },
                        { name: 'title', title: 'Titel', type: 'string' },
                        { name: 'description', title: 'Omschrijving', type: 'text' }
                    ]
                }
            ]
        })
    ],
})
