import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'caseStudy',
    title: 'Projecten / Cases',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Project Titel',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitel (Wat heb je gedaan?)',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Omschrijving',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Head Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'result',
            title: 'Resultaat (bijv: "2x meer leads")',
            type: 'string',
        })
    ]
})
