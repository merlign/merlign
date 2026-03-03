import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'faq',
    title: 'Veelgestelde Vragen',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Vraag',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Antwoord',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Volgorde',
            type: 'number',
        }),
    ],
})
