import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Coordinates } from '@entur/sdk'

import { Github, AtbLogo, TrondelagLogo } from '../../assets/icons'

import { createSettings } from '../../services/firebase'
import { DEFAULT_SETTINGS } from '../../settings/UrlStorage'
import {
    InstagramIcon,
    TwitterIcon,
    FacebookIcon,
    BackArrowIcon,
} from '@entur/icons'
import SearchPanel from './SearchPanel'
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
            <div className="landing-page__back-button">
                <p>
                    <a href="https://atb.no">
                        <BackArrowIcon className="go-to" />
                    </a>
                    <a href="https://atb.no">Til atb.no</a>
                </p>
            </div>
            <div className="github-logo">
                <a
                    href="https://github.com/atb-as/tavla"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Github size="30px" />
                </a>
            </div>
            <div className="landing-page__panel-wrapper">
                <div className="landing-page__content">
                    <header className="landing-page__header">
                        <AtbLogo
                            className="landing-page__header__logo"
                            style="dark"
                        />
                        <div className="landing-page__header__title">
                            <h1>Tavla</h1>
                            <h3>
                                Sanntidstavla du selv kan tilpasse etter dine
                                behov.
                            </h3>
                        </div>
                    </header>
                    <SearchPanel handleCoordinatesSelected={addLocation} />
                    <p className="landing-page__instructions">
                        For å opprette en tavle trenger vi å vite hvilket område
                        du er interessert i.
                        <br />
                        Hvis du vil, kan du lese mer om{' '}
                        <Link to="/privacy">personvern her.</Link>
                    </p>
                    <footer>
                        <div className="landing-page__social">
                            <span>
                                Følg oss
                                <a
                                    href="https://www.facebook.com/atb.no/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FacebookIcon></FacebookIcon>
                                </a>
                                <a
                                    href="https://www.instagram.com/atb_no/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <InstagramIcon></InstagramIcon>
                                </a>
                                <a
                                    href="https://twitter.com/atb_no"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <TwitterIcon></TwitterIcon>
                                </a>
                            </span>
                        </div>
                        <div className="landing-page__footer-logo">
                            <a
                                href="https://www.trondelagfylke.no/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <TrondelagLogo
                                    height="30px"
                                    className="trondelagLogo"
                                ></TrondelagLogo>
                            </a>
                        </div>
                    </footer>
                </div>
                <div className="landing-page__cover-photo"></div>
            </div>
        </div>
    )
}

interface Props {
    history: any
}

export default LandingPage
