import React, { useCallback } from 'react'
import { Checkbox, Fieldset } from '@entur/form'
import { BikeRentalStation } from '@entur/sdk'

import { toggleValueInList } from '../../../../utils'
import { useSettingsContext } from '../../../../settings'

import './styles.scss'

function BikePanel(props: Props): JSX.Element {
    const [settings, { setHiddenStations }] = useSettingsContext()
    const { hiddenStations } = settings

    const { stations } = props

    const onChooseAllPressed = useCallback(() => {
        if (hiddenStations.length > 0) {
            setHiddenStations([])
        } else {
            setHiddenStations(stations.map(({ id }) => id))
        }
    }, [hiddenStations.length, setHiddenStations, stations])

    const onToggleStation = useCallback(
        (event) => {
            const stationId = event.target.id
            const newDisabledList = toggleValueInList(hiddenStations, stationId)
            setHiddenStations(newDisabledList)
        },
        [hiddenStations, setHiddenStations],
    )

    if (!stations.length) {
        return null
    }

    return (
        <Fieldset className="bike-panel">
            <Checkbox
                id="check-all-stop-places-bike"
                name="check-all-stop-places-bike"
                label="Velg alle"
                onChange={onChooseAllPressed}
                checked={!hiddenStations.length}
            >
                Velg alle
            </Checkbox>
            {stations.map(({ name, id }) => (
                <Checkbox
                    key={id}
                    id={id}
                    label={name}
                    name={name}
                    checked={!hiddenStations.includes(id)}
                    onChange={onToggleStation}
                >
                    {name}
                </Checkbox>
            ))}
        </Fieldset>
    )
}

interface Props {
    stations: BikeRentalStation[]
}

export default BikePanel
