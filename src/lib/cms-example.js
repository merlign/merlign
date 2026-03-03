/**
 * DIT IS EEN VOORBEELD: HOE JE EEN CMS (ZOALS SANITY) KOPPELT
 * 
 * Normaal gesproken installeer je een package: `npm install @sanity/client`
 * Hieronder zie je hoe de code eruit zou zien om data op te halen.
 */

// Simuleer een CMS response (dit zou uit Sanity of Strapi komen)
const mockCmsData = {
    faqs: [
        { q: "Wordt alles echt op maat gecodeerd?", a: "Ja, ik gebruik geen zware templates. Elk project wordt vanaf de eerste regel code opgebouwd voor maximale snelheid." },
        { q: "Wat als ik later iets nieuws wil toevoegen?", a: "Omdat we met een flexibel CMS werken zoals dit voorbeeld, kun je zelf velden toevoegen of teksten wijzigen zonder mij te bellen." }
    ],
    hero: {
        title: "Duidelijke taal. Harde resultaten.",
        subtitle: "De website die voor je werkt terwijl jij onderneemt."
    }
};

// De "Fetcher"functie die je in je componenten gebruikt
export const getCmsData = async (type) => {
    // In een echte setup doe je hier:
    // return await sanityClient.fetch(`*[_type == "${type}"]`)

    // Voor dit voorbeeld simuleren we een korte vertraging (netwerk request)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCmsData[type] || []);
        }, 800);
    });
};
