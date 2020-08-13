import React, { memo, useCallback } from 'react'

import { Slider } from '../../../../components'

import './styles.scss'
import { Label } from '@entur/typography'

function DistanceEditor(props: Props): JSX.Element {
    const { distance, onDistanceUpdated } = props

    const handleDistanceUpdate = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onDistanceUpdated(Number(event.target.value))
        },
        [onDistanceUpdated],
    )

    return (
        <div className="distance-editor">
            <Label>Hvor langt unna vil du inkludere holdeplasser?</Label>
            <Slider handleChange={handleDistanceUpdate} distance={distance} />
            <p className="distance-editor__text">
                Viser holdeplasser innenfor <b>{distance}</b> m avstand.
            </p>
        </div>
    )
}

interface Props {
    distance: number
    onDistanceUpdated: (newDistance: number) => void
}

export default memo<Props>(DistanceEditor)
