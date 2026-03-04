import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: 'Over Mij Pagina',
    type: 'document',
    fields: [
        defineField({
            name: 'introSans',
            title: 'Intro Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'introSerif',
            title: 'Intro Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'bio',
            title: 'Biografie / Verhaal',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'photo',
            title: 'Foto (Merlijn)',
            type: 'image',
            options: { hotspot: true }
        }),
        // "Wie ik ben" Section
        defineField({
            name: 'whoAmIHeadlineSans',
            title: 'Wie Ik Ben Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'whoAmIHeadlineSerif',
            title: 'Wie Ik Ben Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'whoAmIParas',
            title: 'Wie Ik Ben Teksten (Paragrafen)',
            type: 'array',
            of: [{ type: 'text' }]
        }),
        // "Keuze" (Waarom mij) Section
        defineField({
            name: 'choiceHeadlineSans',
            title: 'Keuze Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'choiceHeadlineSerif',
            title: 'Keuze Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'choices',
            title: 'Waarom Kiezen Voor Mij (Kaarten)',
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
        })
    ]
})
