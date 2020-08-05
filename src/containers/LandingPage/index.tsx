import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Coordinates } from '@entur/sdk'

import { Github, AtbLogo, TrondelagLogo, EnturLogo } from '../../assets/icons'

import { createSettings } from '../../services/firebase'
import { DEFAULT_SETTINGS } from '../../settings/UrlStorage'
import SearchPanel from './SearchPanel'
import PageWrapper from '../PageWrapper'
import './styles.scss'

const LandingPage = ({ history }: Props): JSX.Element => {
    const addLocation = useCallback(
        (position: Coordinates, locationName: string): void => {
            const initialSettings = {
                ...DEFAULT_SETTINGS,
                coordinates: position,
                boardName: locationName,
                created: new Date(),
            }

            createSettings(initialSettings).then((docRef) => {
                history.push(`/t/${docRef.id}`)
            })
        },
        [history],
    )

    return (
        <div className="landing-page">
            <PageWrapper>
                <SearchPanel handleCoordinatesSelected={addLocation} />
                <p className="landing-page__instructions">
                    For å opprette en tavle trenger vi å vite hvilket område du
                    er interessert i.
                    <br />
                    Hvis du vil, kan du lese om{' '}
                    <Link to="/privacy">personvern her.</Link>
                    <div className="dashboard-wrapper__byline">
                        <a href="https://tavla.entur.no">
                            Tjenesten leveres av{' '}
                            <EnturLogo height="24px" style="black" />
                        </a>
                    </div>
                </p>
            </PageWrapper>
        </div>
    )
}

interface Props {
    history: any
}

export default LandingPage
