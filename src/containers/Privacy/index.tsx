import React from 'react'
import { Heading1, Heading2, Heading3, Paragraph } from '@entur/typography'

import './styles.scss'

const Privacy = (): JSX.Element => {
    return (
        <article className="privacy">
            <div className="privacy__header">
                <Heading1>Personvern</Heading1>
            </div>

            <div className="privacy__body">
                <Heading2>Analyseverktøy</Heading2>
                <Paragraph>
                    AtB bruker analyseverktøyene Google Analytics og Firebase
                    for å samle info om hvordan du bruker tjenesten, ved hjelp
                    av informasjonskapsler. Som behandlingsansvarlig for AtB
                    Tavla er det AtB AS som bestemmer hvilke opplysninger Google
                    Analytics kan innhente om bruken av våre tjenester.
                </Paragraph>
                <Paragraph>
                    Analyseverktøyet kan anslå din omtrentlige geografiske
                    plassering, men adressen kan ikke brukes til å identifisere
                    deg.
                </Paragraph>
                <Paragraph>
                    Google Analytics mottar generell web- og appstatistikk, som
                    for eksempel tidspunkt, språk og generell informasjon om din
                    mobilenhet. Hendelser rundt reisesøk logges anonymt til bruk
                    for å forbedre tjenesten. Ingenting av dette kan spores
                    tilbake til enkeltbrukere.
                </Paragraph>
                <Paragraph>
                    Vi benytter informasjonskapsler for å kunne skille mellom
                    brukere og å håndtere forespørselsrate. Disse kalles _ga,
                    _gid og _gat. Varighet og nærmere beskrivelse av disse
                    finnes på{' '}
                    <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage">
                        developers.google.com
                    </a>
                    .
                </Paragraph>

                <Heading2>Tilganger</Heading2>
                <Paragraph>
                    For at AtB Tavla skal fungere optimalt trenger den
                    forskjellige tilganger til nettleseren din. Tavla kan be om
                    følgende tilganger:
                </Paragraph>
                <Heading3>Din posisjon</Heading3>
                <Paragraph>
                    For at søket med «Fra din posisjon» skal fungere, må Entur
                    vite hvor du befinner deg. Denne tilgangen brukes også til å
                    vise de nærmeste holdeplassene. Posisjonen finner vi ved
                    hjelp av nettleserens geolokasjons-funksjon.
                </Paragraph>
                <Paragraph>
                    Om vi vil vite hvor du er, spør vi om lov først. Du kan
                    alltid regulere denne tilgangen i nettleserens
                    innstillinger.
                </Paragraph>
            </div>
        </article>
    )
}

interface Props {
    history: any
}

export default Privacy
