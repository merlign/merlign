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
        // Value Props / Features
        defineField({
            name: 'features',
            title: 'Belangrijkste Waarde Proposities (3)',
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
        })
    ],
})
