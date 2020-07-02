import React from 'react'
import { Heading2 } from '@entur/typography'
import { WarningIcon } from '@entur/icons'

import './styles.scss'

function Tile({ title, icons, children, alerts }: Props): JSX.Element {
    const isAlert = alerts ? alerts.length > 0 : false

    return (
        <div className="tile">
            <div className={isAlert ? 'tile__warning' : ''}>
                <header className="tile__header">
                    <Heading2>{title}</Heading2>
                    <div className="tile__header-icons">{icons}</div>
                </header>
                {isAlert
                    ? alerts.map(el => {
                          const alert = el['alert']
                          const heading =
                              alert['header_text']['translation'][0]['text']
                          const description =
                              alert['description_text']['translation'][0][
                                  'text'
                              ]

                          return (
                              <div className="tile__alert" key={heading}>
                                  <WarningIcon className="tile__alert__icon"></WarningIcon>
                                  <div className="tile__alert__text">
                                      <h4>{heading}</h4>
                                      <p>{description}</p>
                                  </div>
                              </div>
                          )
                      })
                    : null}
            </div>
            {children}
        </div>
    )
}

interface Props {
    title: string
    icons: JSX.Element | Array<JSX.Element>
    children: Array<JSX.Element>
    alerts?: Array<object>
}

export default Tile
