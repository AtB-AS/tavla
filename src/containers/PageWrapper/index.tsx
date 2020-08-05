import React from 'react'
import { Link } from 'react-router-dom'

import { Github, AtbLogo, TrondelagLogo, EnturLogo } from '../../assets/icons'

import { BackArrowIcon } from '@entur/icons'
import './styles.scss'

const PageWrapper = ({ children }: Props): JSX.Element => {
    return (
        <div className="page-wrapper">
            <div className="page-wrapper__back-button">
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
            <div className="page-wrapper__panel-wrapper">
                <div className="page-wrapper__content">
                    <header className="page-wrapper__header">
                        <AtbLogo
                            className="page-wrapper__header__logo"
                            style="dark"
                        />
                        <div className="page-wrapper__header__title">
                            <h1>Tavla</h1>
                            <h3>
                                Sanntidstavla du selv kan tilpasse etter dine
                                behov.
                            </h3>
                        </div>
                    </header>
                    {children}
                    <footer>
                        <div className="page-wrapper__byline">
                            <a href="https://tavla.entur.no">
                                Tjenesten leveres av{' '}
                                <EnturLogo height="16px" style="black" />
                            </a>
                        </div>
                        <div className="page-wrapper__feedback">
                            <p>
                                <Link to="/feedback">
                                    Gi oss en tilbakemelding.
                                </Link>
                            </p>
                        </div>
                    </footer>
                </div>
                <div className="page-wrapper__cover-photo"></div>
            </div>
        </div>
    )
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export default PageWrapper
