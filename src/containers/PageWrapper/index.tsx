import React from 'react'
import { Link } from 'react-router-dom'

import { Github, AtbLogo, TrondelagLogo, EnturLogo } from '../../assets/icons'

import {
    InstagramIcon,
    TwitterIcon,
    FacebookIcon,
    BackArrowIcon,
} from '@entur/icons'
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
                        <div className="page-wrapper__social">
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
                        <div className="page-wrapper__footer-logo">
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
                <div className="page-wrapper__cover-photo"></div>
            </div>
        </div>
    )
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export default PageWrapper
