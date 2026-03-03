import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'servicePage',
    title: 'Diensten Pagina',
    type: 'document',
    fields: [
        defineField({
            name: 'serviceName',
            title: 'Dienst Naam',
            type: 'string',
            description: 'Bijv: "Website", "Dashboard" of "Automatisering"'
        }),
        defineField({
            name: 'heroSans',
            title: 'Hero Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'heroSerif',
            title: 'Hero Headline (Serif - Italic)',
            type: 'string',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Ondertitel',
            type: 'text',
        }),
        defineField({
            name: 'features',
            title: 'Kenmerken / Voordelen',
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
        defineField({
            name: 'processSteps',
            title: 'Proces Stappen',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'stepNumber', title: 'Stap Nummer', type: 'string' },
                        { name: 'title', title: 'Titel', type: 'string' },
                        { name: 'description', title: 'Omschrijving', type: 'text' }
                    ]
                }
            ]
        })
    ]
})
