import React from 'react'

import { useCounter } from '../../utils'

import './styles.scss'
import { Heading2 } from '@entur/typography'

const DAYS = [
    'Søndag',
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
]

const MONTHS = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
]

function Clock({ className }: Props): JSX.Element {
    useCounter()

    const now = new Date()

    const date = `${DAYS[now.getDay()]} ${now.getDate()}. ${
        MONTHS[now.getMonth()]
    }`
    const hours = `${now.getHours()}`.padStart(2, '0')
    const minutes = `${now.getMinutes()}`.padStart(2, '0')
    const seconds = now.getSeconds()
    const time =
        seconds % 2 ? (
            <span>
                {hours}:{minutes}
            </span>
        ) : (
            <span>
                {hours}
                <span style={{ opacity: 0 }}>:</span>
                {minutes}
            </span>
        )

    return (
        <div className={`clock ${className}`}>
            <Heading2
                margin="none"
                className={`clock__time ${className}__time`}
                as="span"
            >
                {time}
            </Heading2>
            <span className={`clock__date ${className}__date`}>{date}</span>
        </div>
    )
}

interface Props {
    className?: string
}

export default Clock
