import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';

const Privacy = () => {
    return (
        <div className="pt-40 md:pt-56 pb-20 md:pb-32 bg-[#0A0A0A] min-h-screen relative overflow-hidden">
            <SEO
                title="Privacyverklaring"
                description="Privacyverklaring van Merlign. Ontdek hoe ik zorgvuldig omga met jouw persoonsgegevens."
                path="/privacy"
            />
            <div className="content-max-width section-px relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl space-y-12"
                >
                    <SectionLabel>Juridisch</SectionLabel>
                    <h1 className="font-sans font-bold text-[#F2F0E9] text-h1 tracking-tighter">Privacyverklaring</h1>

                    <div className="prose prose-invert max-w-4xl font-sans text-[#F2F0E9]/80 space-y-12 leading-relaxed">
                        <section className="space-y-6">
                            <p className="text-xl md:text-2xl font-light italic leading-relaxed border-l-2 border-primary/30 pl-6">
                                Zodra je mijn website <span className="text-primary underline">www.merlign.com</span> bezoekt of contact met mij opneemt, ontvang ik informatie over jou. In deze privacyverklaring leg ik uit wat ik met deze informatie doe. Ik ga altijd zorgvuldig met je informatie om en sla die veilig op. Heb je vragen of wil je weten welke informatie ik van je heb, neem dan contact op met mij.
                            </p>
                            <p className="text-sm opacity-60 italic">
                                Ik kan deze privacyverklaring aanpassen als ik dat nodig vind. Ik raad je daarom aan om deze regelmatig te bekijken. Deze privacyverklaring is voor het laatst gewijzigd op 09 maart 2026.
                            </p>
                        </section>

                        <section className="space-y-8 pt-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#F2F0E9] border-b border-white/5 pb-4">Inhoudsopgave</h2>
                            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base list-decimal pl-5">
                                <li>Wanneer pas je deze privacyverklaring toe?</li>
                                <li>Wie gebruikt je gegevens?</li>
                                <li>Van wie gebruiken we gegevens?</li>
                                <li>Hoe komen we aan je gegevens?</li>
                                <li>Welke gegevens van je gebruiken we?</li>
                                <li>Waarvoor gebruiken we de gegevens?</li>
                                <li>Hoelang bewaren we je gegevens?</li>
                                <li>Met wie delen we je gegevens?</li>
                                <li>Waar slaan we je gegevens op?</li>
                                <li>Hoe veilig zijn je gegevens bij ons?</li>
                                <li>Wat mag je van ons vragen?</li>
                                <li>Welke regels gelden voor deze privacyverklaring?</li>
                            </ol>
                        </section>

                        <section className="space-y-12 pt-20">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">1. Wanneer pas je deze privacyverklaring toe?</h3>
                                <p>
                                    Deze privacyverklaring is van toepassing op alle persoonsgegevens die ik verwerk en op alle domeinen die aan Merlign gerelateerd zijn. Het gaat hier om de persoonsgegevens van iedereen die weleens contact met mij heeft gehad of mijn website heeft bezocht, zoals bezoekers, klanten en zakelijke contactpersonen.
                                </p>
                                <p>
                                    Persoonsgegevens zijn alle gegevens die herleidbaar zijn tot jou als individu, zoals je naam, telefoonnummer, IP-adres, klantnummer of surfgedrag.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">2. Wie gebruikt je gegevens?</h3>
                                <p>
                                    Merlign is verantwoordelijk voor de website <span className="text-primary">www.merlign.com</span> en daarmee de verantwoordelijke organisatie voor het gebruik van je persoonsgegevens. De volledige gegevens zijn:
                                </p>
                                <ul className="list-none space-y-1 font-bold text-[#F2F0E9]">
                                    <li>Merlign</li>
                                    <li>Dennendreef 5-111</li>
                                    <li>5282 HK Boxtel</li>
                                    <li className="font-sans text-sm font-bold text-[#F2F0E9]/60 pt-2">KVK: 75629887</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">3. Van wie gebruiken we gegevens?</h3>
                                <p>
                                    Ik verwerk de persoonsgegevens van iedereen die contact met mij heeft gehad of mijn website heeft bezocht. Dit zijn onder meer bezoekers, particuliere klanten, zakelijke klanten en contactpersonen van partners.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">4. Hoe komen we aan je gegevens?</h3>
                                <p>Ik krijg de gegevens rechtstreeks van jou zodra je:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>mijn website bezoekt</li>
                                    <li>gegevens invult op mijn website</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">5. Welke gegevens gebruiken we van je?</h3>
                                <p>Ik maak gebruik van de volgende gegevens:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Naam</li>
                                    <li>E-mailadres</li>
                                    <li>Telefoonnummer</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">6. Waarvoor gebruiken we je gegevens?</h3>
                                <p>Ik gebruik je persoonsgegevens alleen voor het doel waar ik die voor mag gebruiken:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Je hebt mij toestemming gegeven om je persoonsgegevens te gebruiken.</li>
                                    <li>Ik gebruik je gegevens omdat ik je als klant de beste service wil geven en ik dat zonder die informatie niet kan doen.</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">7. Hoelang bewaren we je gegevens?</h3>
                                <p>
                                    Ik bewaar je persoonsgegevens zo lang als ik dat volgens de wet moet doen en zo lang als nodig is voor het doel waarvoor ik je gegevens gebruik. Zolang je bijvoorbeeld klant bij mij bent, bewaar ik je gegevens volgens de wettelijke bewaartermijn van zeven jaar (belastingdienst). Daarna bewaar ik je gegevens alleen voor statistische doeleinden en om eventuele klachten af te handelen.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">8. Met wie delen we je gegevens?</h3>
                                <p>
                                    Je persoonsgegevens worden alleen door mij persoonlijk gebruikt. Ik zal je persoonsgegevens **nooit** met anderen delen of verkopen.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">9. Waar slaan we je gegevens op?</h3>
                                <p>
                                    Ik verwerk je gegevens binnen de Europese Economische Ruimte (EER). Dit houdt in dat ik je gegevens ook binnen de EER opsla.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">10. Hoe veilig zijn je gegevens bij ons?</h3>
                                <p>
                                    Ik heb er veel aan gedaan om je gegevens zowel organisatorisch als technisch zo goed mogelijk te beveiligen. Mijn systemen en communicatiemiddelen zijn beveiligd om ervoor te zorgen dat je gegevens niet in de verkeerde handen terechtkomen. Ook zorg ik ervoor dat je gegevens alleen worden gebruikt door mensen die daar toestemming voor hebben.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-primary italic">11. Wat mag je van ons vragen?</h3>
                                <p>Omdat ik persoonsgegevens van je gebruik, heb je verschillende rechten:</p>

                                <div className="space-y-6 bg-white/[0.02] p-8 rounded-[2rem] border border-white/5">
                                    <h4 className="font-bold text-[#F2F0E9]">Recht op informatie</h4>
                                    <p className="text-sm">Ik moet op een begrijpelijke en heldere manier uitleggen wat ik met je gegevens doe en welke controle je daarover hebt. Dat doe ik via deze privacyverklaring.</p>

                                    <h4 className="font-bold text-[#F2F0E9] pt-4">Recht op inzage</h4>
                                    <p className="text-sm">Je mag mij altijd vragen om je gegevens die ik van je heb in te zien.</p>

                                    <h4 className="font-bold text-[#F2F0E9] pt-4">Recht op correctie</h4>
                                    <p className="text-sm">Je mag mij vragen om je gegevens te laten corrigeren als deze niet juist of onvolledig zijn.</p>

                                    <h4 className="font-bold text-[#F2F0E9] pt-4">Recht om bezwaar te maken</h4>
                                    <p className="text-sm">Je mag bezwaar maken tegen de verwerking van je gegevens. Bijvoorbeeld als je niet langer mail van mij wilt ontvangen.</p>

                                    <h4 className="font-bold text-[#F2F0E9] pt-4">Recht om vergeten te worden</h4>
                                    <p className="text-sm">Je mag mij vragen om alle gegevens die ik van je heb te verwijderen. In sommige gevallen (zoals de belastingdienst) moet ik bepaalde gegevens wel 7 jaar bewaren.</p>
                                </div>
                            </div>

                            <div className="space-y-4 bg-primary/10 p-8 rounded-[2rem] border border-primary/20">
                                <h3 className="text-xl font-bold text-primary italic">Hoe dien je een aanvraag of klacht in?</h3>
                                <p>
                                    Stuur je aanvraag of klacht naar mij via <span className="font-bold text-primary italic">contact@merlign.com</span>. Ik verwerk je aanvraag binnen 30 dagen. Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.
                                </p>
                            </div>

                            <div className="space-y-4 pb-20">
                                <h3 className="text-xl font-bold text-primary italic">12. Welke regels gelden voor deze privacyverklaring?</h3>
                                <p>
                                    Deze privacyverklaring voldoet aan de voorwaarden van de Algemene Verordening Gegevensbescherming (AVG). Daarnaast zijn de algemene regels die volgens de Nederlandse wet gelden van toepassing.
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
