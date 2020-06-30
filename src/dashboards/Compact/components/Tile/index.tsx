import React from 'react'
import { Heading2 } from '@entur/typography'
import { WarningIcon } from '@entur/icons'

import './styles.scss'

function Tile({ title, icons, children }: Props): JSX.Element {
    const isAlert = false

    return (
        <div className="tile">
            <div className={isAlert ? 'tile__warning' : ''}>
                <header className="tile__header">
                    <Heading2>{title}</Heading2>
                    <div className="tile__header-icons">{icons}</div>
                </header>
                {isAlert ? (
                    <div className="tile__alert">
                        <WarningIcon className="tile__alert__icon"></WarningIcon>
                        <div className="tile__alert__text">
                            <h4>Lorem ipsum Dolor sit amet consectetur</h4>
                            <p>
                                Dolor sit amet consectetur adipisicing elit.
                                Numquam sed accusantium doloribus vitae veniam.
                            </p>
                        </div>
                    </div>
                ) : null}
            </div>
            {children}
        </div>
    )
}

interface Props {
    title: string
    icons: JSX.Element | Array<JSX.Element>
    children: Array<JSX.Element>
}

export default Tile
