import React from 'react'
import { Heading2 } from '@entur/typography'
import { ValidationExclamationIcon } from '@entur/icons'

import './styles.scss'

function Tile({ title, icons, children, alerts }: Props): JSX.Element {
    return (
        <div className={`tile ${alerts ? 'warning' : ''}`}>
            <div className={alerts ? 'tile__warning' : ''}>
                <header className="tile__header">
                    <Heading2>{title}</Heading2>
                    <div className="tile__header-icons">{icons}</div>
                </header>
                {alerts?.map((alert) => {
                    return (
                        <div className="tile__alert" key={alert}>
                            <ValidationExclamationIcon className="tile__alert__icon"></ValidationExclamationIcon>
                            <div className="tile__alert__text">
                                <p>{alert}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {children}
        </div>
    )
}

interface Props {
    title: string
    icons: JSX.Element | JSX.Element[]
    children: JSX.Element[]
    alerts?: string[]
}

export default Tile
