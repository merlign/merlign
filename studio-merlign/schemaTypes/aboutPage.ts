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
        })
    ]
})
