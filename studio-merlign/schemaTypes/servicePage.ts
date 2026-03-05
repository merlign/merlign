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
            initialValue: 'Een resultaatgericht systeem'
        }),
        defineField({
            name: 'heroSerif',
            title: 'Hero Headline (Serif - Italic)',
            type: 'string',
            initialValue: 'voor jouw business.'
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Ondertitel',
            type: 'text',
            initialValue: 'Ik bouw wat je nodig hebt om te groeien, zonder de hoofdpijn van techniek.'
        }),
        // "Waarom" / Middle Section
        defineField({
            name: 'whyHeadlineSans',
            title: 'Midden Sectie Headline (Sans)',
            type: 'string',
            initialValue: 'Waarom dit'
        }),
        defineField({
            name: 'whyHeadlineSerif',
            title: 'Midden Sectie Headline (Serif)',
            type: 'string',
            initialValue: 'onmisbaar is.'
        }),
        defineField({
            name: 'whySubtitle',
            title: 'Midden Sectie Ondertitel',
            type: 'text',
            initialValue: 'Zonder de juiste tools laat je winst en tijd liggen. Ik zorg dat alles voor je werkt.'
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
            ],
            initialValue: [
                { title: 'Snel resultaat', description: 'Geen maanden wachten, we leveren in sprints.' },
                { title: 'Maatwerk', description: 'Precies wat je nodig hebt, niks meer en niks minder.' }
            ]
        }),
        defineField({
            name: 'processSteps',
            title: 'Proces Stappen',
            type: 'array',
            initialValue: [
                { stepNumber: '01', title: 'Check', description: 'Kijken wat er nodig is.' },
                { stepNumber: '02', title: 'Sprints', description: 'Bouwen en testen.' },
                { stepNumber: '03', title: 'Live', description: 'Direct resultaat.' }
            ],
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
            initialValue: 'Klaar om te'
        }),
        defineField({
            name: 'ctaHeadlineSerif',
            title: 'Beneden CTA Headline (Serif)',
            type: 'string',
            initialValue: 'starten?'
        }),
        defineField({
            name: 'ctaSubtitle',
            title: 'Beneden CTA Ondertitel',
            type: 'text',
            initialValue: 'Plan een gratis check en ontdek de mogelijkheden.'
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
