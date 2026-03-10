import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: 'Over Mij Pagina',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO / Zoekmachine' },
    ],
    fields: [
        defineField({
            name: 'seoTitle',
            title: 'SEO Titel',
            type: 'string',
            group: 'seo',
            description: 'De titel die getoond wordt in Google. Laat leeg om de standaard te gebruiken.'
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Omschrijving',
            type: 'text',
            group: 'seo',
            description: 'De tekst die getoond wordt onder de titel in Google.'
        }),
        defineField({
            name: 'introSans',
            title: 'Intro Headline (Sans)',
            type: 'string',
            initialValue: 'Designer. Bouwer.'
        }),
        defineField({
            name: 'introSerif',
            title: 'Intro Headline (Serif)',
            type: 'string',
            initialValue: 'Jouw sparringspartner.'
        }),
        defineField({
            name: 'bio',
            title: 'Biografie / Verhaal',
            type: 'array',
            of: [{ type: 'block' }],
            initialValue: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            text: 'Ik ben Merlijn. 10 jaar designer, nu ook bouwer van websites, dashboards en automatiseringen. Ik combineer wat andere freelancers niet combineren.'
                        }
                    ]
                }
            ]
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
            initialValue: 'De perfecte mix tussen'
        }),
        defineField({
            name: 'whoAmIHeadlineSerif',
            title: 'Wie Ik Ben Headline (Serif)',
            type: 'string',
            initialValue: 'vorm en functie.'
        }),
        defineField({
            name: 'whoAmIParas',
            title: 'Wie Ik Ben Teksten (Paragrafen)',
            type: 'array',
            of: [{ type: 'text' }],
            initialValue: [
                'Ik begon als grafisch designer en ben in AI gedoken omdat ik zag wat er mogelijk was. Nu combineer ik 10 jaar design-ervaring met moderne AI-tools om dingen te bouwen die er goed uitzien en goed werken.',
                'Het verschil met een bureau: ik ben snel, ik denk mee en je hebt altijd één aanspreekpunt. Het verschil met een goedkope freelancer: ik lever niet alleen wat je vraagt, maar ook wat je nodig hebt.',
                'Voor ondernemers van 1 tot 10 man ben ik de sparringspartner die ze anders niet hebben. Iemand die begrijpt hoe een goede uitstraling eruitziet én hoe systemen in elkaar moeten zitten.'
            ]
        }),
        // "Keuze" (Waarom mij) Section
        defineField({
            name: 'choiceHeadlineSans',
            title: 'Keuze Headline (Sans)',
            type: 'string',
            initialValue: 'Waarom ondernemers voor'
        }),
        defineField({
            name: 'choiceHeadlineSerif',
            title: 'Keuze Headline (Serif)',
            type: 'string',
            initialValue: 'mij kiezen.'
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
            ],
            initialValue: [
                { title: 'Niet alleen bouwen, ook meedenken', description: 'Ik neem niet blind je briefing over. Als ik iets zie dat beter kan, zeg ik het. Dat is wat een sparringspartner doet.' },
                { title: 'Design en techniek in één', description: 'Je hoeft niet te kiezen tussen iemand die het mooi maakt of iemand die het laat werken. Ik doe beide.' },
                { title: 'Snel en zonder gedoe', description: 'Geen maanden wachten, geen eindeloze vergaderingen. Ik werk in korte sprints en lever op.' },
                { title: 'Eerlijk over wat het kost', description: 'Geen vage offertes. Na de check weet je precies wat het wordt voor je akkoord gaat.' }
            ]
        }),
        // Bottom CTA
        defineField({
            name: 'ctaHeadlineSans',
            title: 'Beneden CTA Headline (Sans)',
            type: 'string',
            initialValue: 'Wil je'
        }),
        defineField({
            name: 'ctaHeadlineSerif',
            title: 'Beneden CTA Headline (Serif)',
            type: 'string',
            initialValue: 'samenwerken?'
        }),
        defineField({
            name: 'ctaSubtitle',
            title: 'Beneden CTA Ondertitel',
            type: 'text',
            initialValue: 'Plan een gratis check. In 20 minuten weet je of we een match zijn.'
        })
    ]
})
