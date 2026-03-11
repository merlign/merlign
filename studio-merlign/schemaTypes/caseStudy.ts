import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'caseStudy',
    title: 'Projecten / Cases',
    type: 'document',
    fields: [
        defineField({
            name: 'showOnWebsite',
            title: 'Zichtbaar op website',
            type: 'boolean',
            initialValue: true,
            description: 'Zet dit uit om de case tijdelijk te verbergen.'
        }),
        defineField({
            name: 'title',
            title: 'Klantnaam / Projectnaam',
            type: 'string',
        }),
        defineField({
            name: 'clientLogo',
            title: 'Klant Logo',
            type: 'image',
            description: 'Het logo van de klant (bijv. een wit/transparant logo werkt het best).',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'logoUrl',
            title: 'Logo Link URL',
            type: 'url',
            description: 'De URL waar het logo naar moet linken (bijv. de website van de klant).'
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
            name: 'authorImage',
            title: 'Foto van de auteur',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'image',
            title: 'Hoofdafbeelding / Foto',
            type: 'image',
            options: { hotspot: true },
            readOnly: false,
            description: 'Upload hier de hoofdafbeelding of foto voor deze case.'
        }),
        defineField({
            name: 'caseUrl',
            title: 'Project Link URL',
            type: 'url',
            description: 'De URL waar de foto naar moet linken (bijv. het dashboard of de live website).'
        }),
        defineField({
            name: 'scrollAnimation',
            title: 'Auto-Scroll Animatie',
            type: 'boolean',
            description: 'Schakel dit in voor lange afbeeldingen om een glijdend effect te creëren op hover.',
            initialValue: false
        }),
    ]
})
