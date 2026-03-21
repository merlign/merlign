import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';

const Terms = () => {
    return (
        <div className="pt-40 md:pt-56 pb-20 md:pb-32 bg-[#0A0A0A] min-h-screen relative overflow-hidden">
            <SEO
                title="Algemene Voorwaarden"
                description="Algemene Voorwaarden van Merlign. De juridische basis voor onze samenwerking."
                path="/terms"
                noindex={true}
            />
            <div className="content-max-width section-px relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl space-y-12"
                >
                    <SectionLabel>Juridisch</SectionLabel>
                    <h1 className="font-sans font-bold text-[var(--text)] text-h1 tracking-tighter">Algemene Voorwaarden</h1>

                    <div className="prose prose-invert max-w-4xl font-sans text-[var(--text)]/80 space-y-12 leading-relaxed">
                        <section className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 space-y-4">
                            <p className="text-xl font-bold text-primary italic lowercase tracking-tight">Merlign</p>
                            <p className="font-sans text-base font-bold text-[#F2F0E9]/60">
                                E-mail: contact@merlign.com<br />
                                Website: www.merlign.com
                            </p>
                        </section>

                        <section className="space-y-12 pt-10">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 1 - Definities</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li><span className="text-[#F2F0E9] font-bold">Merlign</span>: Merlign, gevestigd te Boxtel, KvK-nummer 75629887.</li>
                                    <li><span className="text-[#F2F0E9] font-bold">Klant</span>: degene met wie Merlign een overeenkomst is aangegaan.</li>
                                    <li><span className="text-[#F2F0E9] font-bold">Partijen</span>: Merlign en de Klant samen.</li>
                                    <li><span className="text-[#F2F0E9] font-bold">Consument</span>: een Klant die tevens een individu is en die als privépersoon handelt.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 2 - Toepasselijkheid</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Deze voorwaarden zijn van toepassing op alle offertes, aanbiedingen, werkzaamheden, bestellingen, overeenkomsten en leveringen van diensten of producten door of namens Merlign.</li>
                                    <li>Merlign en de Klant kunnen alleen afwijken van deze voorwaarden als dat schriftelijk is afgesproken.</li>
                                    <li>Merlign en de Klant sluiten de toepasselijkheid van de algemene voorwaarden van de Klant of van anderen uitdrukkelijk uit.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 3 - Aanbiedingen en offertes</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Aanbiedingen en offertes van Merlign zijn vrijblijvend, tenzij daarin uitdrukkelijk anders vermeld.</li>
                                    <li>Een aanbod of offerte is maximaal 2 weken geldig, tenzij er een andere termijn in het aanbod of de offerte staat.</li>
                                    <li>Aanvaardt de Klant een aanbod of offerte niet binnen de geldende termijn, dan vervalt het aanbod of de offerte.</li>
                                    <li>Aanbiedingen en offertes gelden niet voor nabestellingen, tenzij Merlign en de Klant dit schriftelijk afspreken.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 4 - Aanvaarding</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Bij aanvaarding van een vrijblijvende offerte of aanbieding, mag Merlign de offerte of het aanbod alsnog binnen 3 dagen na ontvangst van de aanvaarding intrekken, zonder dat de Klant hieraan enige rechten kan ontlenen.</li>
                                    <li>Mondelinge aanvaarding van de Klant verbindt Merlign slechts nadat de Klant deze schriftelijk of elektronisch heeft bevestigd.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 5 - Prijzen</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Merlign hanteert prijzen in euro's, exclusief btw en exclusief eventuele overige kosten zoals administratie- of verzendkosten, tenzij schriftelijk anders is afgesproken.</li>
                                    <li>Merlign mag de prijzen van zijn diensten en producten op zijn website en in andere uitingen altijd wijzigen.</li>
                                    <li>Merlign en de Klant spreken voor een dienstverlening een totaalbedrag als richtprijs af, tenzij schriftelijk anders wordt afgesproken.</li>
                                    <li>Merlign mag tot 10% van de richtprijs afwijken.</li>
                                    <li>Merlign moet de Klant op tijd laten weten waarom een hogere prijs gerechtvaardigd is, wanneer de richtprijs meer dan 10% hoger uit gaat vallen.</li>
                                    <li>De Klant mag het deel van de opdracht dat boven de richtprijs (vermeerderd met 10%) uitkomt laten vervallen, wanneer de richtprijs meer dan 10% hoger uit gaat vallen.</li>
                                    <li>Merlign zal prijsaanpassingen meedelen aan de Klant voorafgaand aan de ingang ervan.</li>
                                    <li>Een consument mag de overeenkomst met Merlign opzeggen wanneer hij het niet eens is met de prijsverhoging.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 6 - Betalingen en betalingstermijn</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Merlign mag bij het aangaan van de overeenkomst een aanbetaling tot 50% van het afgesproken bedrag verlangen.</li>
                                    <li>De Klant moet een betaling achteraf binnen 14 dagen na levering hebben voldaan.</li>
                                    <li>De betalingstermijnen die Merlign hanteert, zijn fatale betalingstermijnen. Dat betekent dat indien de Klant het afgesproken bedrag niet uiterlijk op de laatste dag van de betalingstermijn heeft betaald, hij automatisch in verzuim en in gebreke is, zonder dat Merlign aan de Klant een aanmaning hoeft te sturen of in gebreke hoeft te stellen.</li>
                                    <li>Merlign mag een levering afhankelijk stellen van onmiddellijke betaling dan wel een zekerheidstelling eisen voor het totale bedrag van de diensten of producten.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 7 - Gevolgen te late betaling</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Betaalt de Klant niet binnen de afgesproken termijn, dan mag Merlign de wettelijke rente per maand voor handelstransacties in rekening brengen vanaf de dag dat de Klant in verzuim is.</li>
                                    <li>Wanneer de Klant in verzuim is, moet hij bovendien buitengerechtelijke incassokosten en eventuele schadevergoeding betalen aan Merlign.</li>
                                    <li>De incassokosten worden berekend aan de hand van het Besluit vergoeding voor buitengerechtelijke incassokosten.</li>
                                    <li>Wanneer de Klant niet op tijd betaalt, mag Merlign zijn verplichtingen opschorten totdat de Klant heeft betaald.</li>
                                    <li>In geval van liquidatie, faillissement, beslag of surseance van betaling aan de zijde van de Klant, zijn de vorderingen van Merlign op de Klant onmiddellijk opeisbaar.</li>
                                    <li>Weigert de Klant zijn medewerking aan de uitvoering van de overeenkomst door Merlign, dan moet hij nog steeds de afgesproken prijs betalen.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 8 - Opschortingsrecht</h3>
                                <p>De Klant doet hierbij afstand van het recht om de nakoming van enige uit deze overeenkomst voortvloeiende verbintenis op te schorten.</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 9 - Verrekening</h3>
                                <p>De Klant doet afstand van zijn recht om een schuld aan Merlign te verrekenen met een vordering op Merlign.</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 10 - Verzekering</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>De Klant moet de volgende zaken voldoende verzekeren en verzekerd houden tegen onder andere brand, ontploffings- en waterschade, en diefstal:
                                        <ul className="list-disc pl-5 mt-2 space-y-1 opacity-80">
                                            <li>geleverde zaken die noodzakelijk zijn voor de uitvoering van de onderliggende overeenkomst</li>
                                            <li>zaken van Merlign die bij de Klant aanwezig zijn</li>
                                            <li>zaken die onder eigendomsvoorbehoud zijn geleverd</li>
                                        </ul>
                                    </li>
                                    <li>De Klant geeft op eerste verzoek van Merlign de polis van deze verzekeringen ter inzage.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 11 - Intrekking opdracht</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Het staat de Klant vrij om de opdracht aan Merlign op elk gewenst moment te beëindigen.</li>
                                    <li>Wanneer de Klant de opdracht intrekt, is de Klant verplicht de verschuldigde vergoeding en de gemaakte onkosten van Merlign te betalen.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 12 - Klachtplicht</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>De Klant is verplicht klachten over de verrichte werkzaamheden direct schriftelijk te melden aan Merlign. De klacht bevat een zo gedetailleerd mogelijke omschrijving van de tekortkoming, zodat Merlign in staat wordt gesteld hierop adequaat te reageren.</li>
                                    <li>Een klacht kan er in ieder geval niet toe leiden dat Merlign gehouden kan worden om andere werkzaamheden te verrichten dan zijn overeengekomen.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 13 - Garantie</h3>
                                <p>Wanneer de Klant en Merlign een overeenkomst met een dienstverlenend karakter zijn aangegaan, bevat deze voor Merlign slechts een inspanningsverplichting en dus geen resultaatsverplichting.</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 14 - Uitvoering van de overeenkomst</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Merlign voert de overeenkomst naar beste inzicht en vermogen en volgens de eisen van goed vakmanschap uit.</li>
                                    <li>Merlign mag de afgesproken dienstverlening in zijn geheel of deels laten uitvoeren door anderen.</li>
                                    <li>De uitvoering van de overeenkomst gebeurt in overleg en na een schriftelijk akkoord en betaling van een eventueel voorschot door de Klant.</li>
                                    <li>De Klant moet ervoor zorgen dat Merlign op tijd kan beginnen aan de uitvoering van de overeenkomst.</li>
                                    <li>Zorgt de Klant er niet voor dat Merlign tijdig kan beginnen, dan komen de daaruit voortvloeiende extra kosten voor rekening van de Klant.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 15 - Informatieverstrekking door de Klant</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>De Klant stelt alle informatie, gegevens en bescheiden die relevant zijn voor de correcte uitvoering van de overeenkomst tijdig en in gewenste vorm en op gewenste wijze beschikbaar aan Merlign.</li>
                                    <li>De Klant staat in voor de juistheid en volledigheid van de ter beschikking gestelde informatie, gegevens en bescheiden, ook indien deze van derden afkomstig zijn, voor zover uit de aard van de overeenkomst niet anders voortvloeit.</li>
                                    <li>Wanneer en voor zover de Klant dit verzoekt, retourneert Merlign de betreffende bescheiden.</li>
                                    <li>Stelt de Klant niet, niet tijdig of niet behoorlijk de door Merlign redelijkerwijs verlangde informatie, gegevens of bescheiden beschikbaar en loopt de uitvoering van de overeenkomst hierdoor vertraging op, dan komen de daaruit voortvloeiende extra kosten en extra uren voor rekening van de Klant.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 16 - Duur overeenkomst dienst</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>De overeenkomst tussen Merlign en de Klant betreffende een dienst of diensten wordt aangegaan voor onbepaalde tijd, tenzij uit de aard van de overeenkomst iets anders voortvloeit of anders wordt afgesproken.</li>
                                    <li>Wanneer de Klant een overeenkomst voor bepaalde tijd aangaat, dan wordt deze na afloop van de termijn stilzwijgend omgezet in een overeenkomst voor onbepaalde tijd, tenzij 1 van de partijen de overeenkomst opzegt met inachtneming van een opzegtermijn van 2 maanden, of een consument de overeenkomst opzegt met inachtneming van een opzegtermijn van 1 maand, waardoor de overeenkomst automatisch eindigt.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 17 - Opzeggen dienst voor onbepaalde tijd</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>De Klant kan een overeenkomst voor een dienst voor onbepaalde tijd opzeggen met een opzegtermijn van 2 maanden.</li>
                                    <li>Een consument mag een overeenkomst voor een dienst voor onbepaalde tijd opzeggen met een opzegtermijn van 1 maand.</li>
                                </ol>
                            </div>

                            <div className="space-y-4 pb-20">
                                <h3 className="text-xl font-bold text-primary italic">Artikel 18 - Intellectueel eigendom</h3>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Merlign behoudt alle intellectuele eigendomsrechten op alle ontwerpen, tekeningen, geschriften, dragers met gegevens of andere informatie, offertes, afbeeldingen, schetsen, modellen en maquettes, tenzij anders is afgesproken.</li>
                                    <li>De Klant mag de intellectuele eigendomsrechten in lid 1 niet zonder voorafgaande schriftelijke toestemming van Merlign aan anderen tonen, ter beschikking stellen of op een andere manier gebruiken.</li>
                                </ol>
                            </div>
                        </section>

                        <p className="pt-12 text-sm opacity-40 italic border-t border-white/5">Laatst bijgewerkt: 9 maart 2026</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
