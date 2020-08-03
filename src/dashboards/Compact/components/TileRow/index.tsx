import React from 'react'
import { Heading3 } from '@entur/typography'

import { TileSubLabel } from '../../../../types'
import { ValidationExclamationIcon } from '@entur/icons'
import ValidationError from '../../../../assets/icons/ValidationError'
import './styles.scss'

export function TileRow({
    label,
    icon,
    subLabels,
    alerts,
}: Props): JSX.Element {
    return (
        <div className="tilerow">
            <div className="tilerow__icon">{icon}</div>
            <div className="tilerow__texts">
                <Heading3 className="tilerow__label">{label}</Heading3>
                <AlertContainer alerts={alerts} />
                <div className="tilerow__sublabels">
                    {subLabels.map((subLabel, index) => (
                        <div
                            className={`tilerow__sublabel${
                                subLabel.isRealtime ? ' realtime' : ''
                            }`}
                            key={index}
                        >
                            {subLabel.time}
                            <SubLabelIcon subLabel={subLabel} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const AlertContainer = ({ alerts }: AlertProps): JSX.Element => {
    return alerts ? (
        <div className="tilerow__alerts" key={alerts.toString()}>
            {alerts.map((alertText) => (
                <div key={alertText} className="tilerow__alerts__alert">
                    <ValidationExclamationIcon className="tilerow__alerts__icon"></ValidationExclamationIcon>
                    <p>{alertText}</p>
                </div>
            ))}
        </div>
    ) : null
}

function SubLabelIcon({
    subLabel,
}: {
    subLabel: TileSubLabel
}): JSX.Element | null {
    if (subLabel.hasCancellation)
        return (
            <div className="tilerow__sublabel__cancellation">
                <ValidationError />
            </div>
        )

    return null
}

interface Props {
    label: string
    subLabels: TileSubLabel[]
    icon: JSX.Element | null
    alerts?: string[]
}

interface AlertProps {
    alerts: string[]
}

export default TileRow
