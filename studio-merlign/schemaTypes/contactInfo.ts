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
            initialValue: 'Welke upgrade gaan we als'
        }),
        defineField({
            name: 'headlineSerif',
            title: 'Contact Headline (Serif)',
            type: 'string',
            initialValue: 'eerste activeren?'
        }),
        defineField({
            name: 'subtitle',
            title: 'Contact Ondertitel',
            type: 'text',
            initialValue: 'Kies het onderdeel waar je nu de meeste winst laat liggen. Ik kijk in 20 minuten met je mee waar de kansen zitten.'
        }),
        defineField({
            name: 'ctaButton',
            title: 'Knop Tekst',
            type: 'string',
            initialValue: 'Plan Je Scan'
        }),
        defineField({
            name: 'email',
            title: 'E-mailadres',
            type: 'string',
            initialValue: 'merlijn@merlign.com'
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram Link',
            type: 'url',
            initialValue: 'https://www.instagram.com/merlijn.vdev/'
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn Link',
            type: 'url',
            initialValue: 'https://www.linkedin.com/in/merlijn-van-der-vleuten-1b9118267/'
        }),
        defineField({
            name: 'whatsappPhone',
            title: 'WhatsApp Telefoonnummer',
            type: 'string',
            initialValue: '31647693209',
            description: 'Inclusief landcode (bijv. +316...)'
        }),
        defineField({
            name: 'footerDescription',
            title: 'Footer Omschrijving',
            type: 'text',
            initialValue: 'Websites, dashboards en automatiseringen voor ondernemers die vooruit willen.',
            description: 'De kleine tekst onder het logo in de footer.'
        }),
    ]
})
