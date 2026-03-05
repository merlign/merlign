import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Homepagina',
    type: 'document',
    fields: [
        defineField({
            name: 'heroSans',
            title: 'Hero Headline (Sans - Bold)',
            type: 'string',
            initialValue: 'Krijg meer gedaan met',
            description: 'Bijv: "Duidelijke taal."'
        }),
        defineField({
            name: 'heroLabel',
            title: 'Hero Label (Kleine tekst bovenin)',
            type: 'string',
            initialValue: 'Senior Digitaal Strateeg · 10+ jaar Designer',
            description: 'Bijv: "Senior Digitaal Strateeg · 10+ jaar Designer"'
        }),
        defineField({
            name: 'heroSerif',
            title: 'Hero Headline (Serif - Italic)',
            type: 'string',
            initialValue: 'je huidige team.',
            description: 'Bijv: "Harde resultaten."'
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Ondertitel',
            type: 'text',
            initialValue: 'Ik bouw de systemen die het werk van je overnemen. Een website die zelf leads vangt, een dashboard voor direct overzicht, of slimme hulpjes voor je dagelijkse taken. Jij richt je op de groei, ik regel de techniek.'
        }),
        defineField({
            name: 'heroCta',
            title: 'Hero Knop (Primair - Goud)',
            type: 'string',
            initialValue: 'Gratis adviesgesprek'
        }),
        defineField({
            name: 'heroCtaAlt',
            title: 'Hero Knop (Secundair - Omrand)',
            type: 'string',
            initialValue: 'Bekijk diensten'
        }),
        // Value Props / Features (Service Cards)
        defineField({
            name: 'features',
            title: 'Dienst Kaarten op Home (Titel & Omschrijving)',
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
                {
                    title: 'Nieuwe website die écht verkoopt',
                    description: 'Je wacht al te lang op die nieuwe site. Ik bouw een strakke website die direct klanten voor je binnenhaalt. Geen maanden gedoe, volgende week ben je live.'
                },
                {
                    title: 'Al je cijfers in één simpel overzicht',
                    description: 'Van je bankrekening tot je advertenties: je ziet in één oogopslag waar je winst maakt en waar je geld verliest. Direct overzicht op je laptop of telefoon.'
                },
                {
                    title: 'Je randzaken op de autopilot',
                    description: 'Ik neem je saaie, herhalende werk over. Van het opvolgen van aanvragen tot je administratie. Ik bouw de slimme koppelingen, jij doet alleen nog wat je leuk vindt.'
                }
            ]
        }),
        // "Wie ben ik?" Section
        defineField({
            name: 'aboutHeadlineSans',
            title: 'About Sectie Headline (Sans)',
            type: 'string',
            initialValue: 'Geen mooie praatjes.'
        }),
        defineField({
            name: 'aboutHeadlineSerif',
            title: 'About Sectie Headline (Serif)',
            type: 'string',
            initialValue: 'Gewoon resultaten.'
        }),
        defineField({
            name: 'aboutPara1',
            title: 'About Sectie Paragraaf 1',
            type: 'text',
            initialValue: 'Ik ben al meer dan 10 jaar actief als designer. Dat is mijn edge. Ik begrijp hoe systemen eruit moeten zien voordat ik ze bouw: waardoor wat ik opleveer niet alleen werkt, maar er ook ziet alsof het zo hoort.'
        }),
        defineField({
            name: 'aboutPara2',
            title: 'About Sectie Paragraaf 2',
            type: 'text',
            initialValue: 'Ik heb een allergie voor traagheid en onnodige complexiteit. Geen eindeloze meetings, geen vaag advies. Ik bouw geen websites, ik bouw tools die je werk uit handen nemen omdat ik stop met handmatige gepruts. Dit is geen tijdprobleem, dit is een systeemprobleem.'
        }),
        // "Wat ik bouw" (Services) Header
        defineField({
            name: 'servicesHeadlineSans',
            title: 'Diensten Sectie Headline (Sans)',
            type: 'string',
            initialValue: 'Kies waar we'
        }),
        defineField({
            name: 'servicesHeadlineSerif',
            title: 'Diensten Sectie Headline (Serif)',
            type: 'string',
            initialValue: 'beginnen.'
        }),
        defineField({
            name: 'servicesSubtitle',
            title: 'Diensten Sectie Ondertitel',
            type: 'text',
            initialValue: 'Drie manieren om je bedrijf weer op snelheid te krijgen. Zonder gedoe, direct resultaat.'
        }),
        // "Het Traject" (Process) Section
        defineField({
            name: 'processHeadlineSans',
            title: 'Proces Sectie Headline (Sans)',
            type: 'string',
            initialValue: 'Drie fases.'
        }),
        defineField({
            name: 'processHeadlineSerif',
            title: 'Proces Sectie Headline (Serif)',
            type: 'string',
            initialValue: 'Geen verrassingen.'
        }),
        defineField({
            name: 'processSteps',
            title: 'Home Proces Stappen (3)',
            type: 'array',
            initialValue: [
                {
                    stepNumber: '01',
                    title: 'De Intake',
                    description: 'Eén gesprek van 45 minuten om de koers te bepalen. Ik graaf diep in je business en we trekken een streep in het zand.'
                },
                {
                    stepNumber: '02',
                    title: 'De Bouw-Sprint',
                    description: 'Ik bouw je website, dashboard of automatisering in recordtempo. Alles in-house, zonder vertraging.'
                },
                {
                    stepNumber: '03',
                    title: 'De Overdracht',
                    description: 'Je krijgt een systeem dat werkt, inclusief een simpele uitleg zodat je direct door kunt met real-time overzicht over je business.'
                }
            ],
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'stepNumber', title: 'Stap Nummer (bijv "01")', type: 'string' },
                        { name: 'title', title: 'Titel', type: 'string' },
                        { name: 'description', title: 'Omschrijving', type: 'text' }
                    ]
                }
            ]
        })
    ],
})
