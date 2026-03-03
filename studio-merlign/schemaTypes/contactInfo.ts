import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contactInfo',
    title: 'Contact Informatie & Teksten',
    type: 'document',
    fields: [
        defineField({
            name: 'headlineSans',
            title: 'Contact Headline (Sans)',
            type: 'string',
        }),
        defineField({
            name: 'headlineSerif',
            title: 'Contact Headline (Serif)',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Contact Ondertitel',
            type: 'text',
        }),
        defineField({
            name: 'ctaButton',
            title: 'Knop Tekst',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'E-mailadres',
            type: 'string',
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram Link',
            type: 'url',
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn Link',
            type: 'url',
        }),
    ]
})
