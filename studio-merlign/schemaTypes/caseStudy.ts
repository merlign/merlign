import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'caseStudy',
    title: 'Projecten / Cases',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Klantnaam / Projectnaam',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Categorie',
            type: 'string',
            options: {
                list: [
                    { title: 'Websites', value: 'websites' },
                    { title: 'Dashboards', value: 'dashboards' },
                    { title: 'Automatiseringen', value: 'automatiseringen' }
                ],
                layout: 'radio'
            }
        }),
        defineField({
            name: 'tag',
            title: 'Tag (bijv. "Website")',
            type: 'string',
        }),
        defineField({
            name: 'situatie',
            title: 'De Situatie',
            type: 'text',
        }),
        defineField({
            name: 'aanpak',
            title: 'De Aanpak',
            type: 'text',
        }),
        defineField({
            name: 'results',
            title: 'Resultaten (lijst)',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'quote',
            title: 'Quote van de klant',
            type: 'text',
        }),
        defineField({
            name: 'author',
            title: 'Auteur van de quote (bijv. "Ferry, Ferry Zorgt")',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Mockup Afbeelding',
            type: 'image',
            options: { hotspot: true }
        }),
    ]
})
