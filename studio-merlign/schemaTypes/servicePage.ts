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
        // "Waarom" / Middle Section
        defineField({
            name: 'whyHeadlineSans',
            title: 'Midden Sectie Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'whyHeadlineSerif',
            title: 'Midden Sectie Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'whySubtitle',
            title: 'Midden Sectie Ondertitel',
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
        }),
        // Bottom CTA
        defineField({
            name: 'ctaHeadlineSans',
            title: 'Beneden CTA Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'ctaHeadlineSerif',
            title: 'Beneden CTA Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'ctaSubtitle',
            title: 'Beneden CTA Ondertitel',
            type: 'text',
        }),
        // Service-Specific FAQs
        defineField({
            name: 'faqs',
            title: 'Veelgestelde Vragen (Specifiek voor deze dienst)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', title: 'Vraag', type: 'string' },
                        { name: 'answer', title: 'Antwoord', type: 'text' }
                    ]
                }
            ]
        })
    ]
})
