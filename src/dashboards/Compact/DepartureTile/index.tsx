import React, { useState, useEffect } from 'react'
import { colors } from '@entur/tokens'

import {
    getIcon,
    groupBy,
    unique,
    getTransportIconIdentifier,
    createTileSubLabel,
    getIconColorType,
} from '../../../utils'
import {
    StopPlaceWithDepartures,
    LineData,
    IconColorType,
} from '../../../types'

import Tile from '../components/Tile'
import TileRow from '../components/TileRow'

import './styles.scss'
import { useSettingsContext } from '../../../settings'

import { getDisruptionMessagesForRoute } from '../../../logic/getDisruptionMessages'

function getTransportHeaderIcons(departures: LineData[]): JSX.Element[] {
    const transportModes = unique(
        departures.map(({ type, subType }) => ({ type, subType })),
        (a, b) =>
            getTransportIconIdentifier(a.type, a.subType) ===
            getTransportIconIdentifier(b.type, b.subType),
    )

    const transportIcons = transportModes.map(({ type, subType }) => ({
        icon: getIcon(type, undefined, subType, colors.blues.blue60),
    }))

    return transportIcons.map(({ icon }) => icon)
}

const DepartureTile = ({
    stopPlaceWithDepartures,
    disruptionMessages,
}: Props): JSX.Element => {
    const { departures, name } = stopPlaceWithDepartures
    const groupedDepartures = groupBy<LineData>(departures, 'route')
    const headerIcons = getTransportHeaderIcons(departures)
    const routes = Object.keys(groupedDepartures)
    const [settings] = useSettingsContext()
    const [iconColorType, setIconColorType] = useState<IconColorType>(
        'contrast',
    )

    useEffect(() => {
        if (settings) {
            setIconColorType(getIconColorType(settings.theme))
        }
    }, [settings])

    return (
        <Tile title={name} icons={headerIcons} alerts={disruptionMessages}>
            {routes.map((route) => {
                const subType = groupedDepartures[route][0].subType
                const routeData = groupedDepartures[route].slice(0, 3)
                const routeType = routeData[0].type
                const icon = getIcon(routeType, iconColorType, subType)

                return (
                    <TileRow
                        key={route}
                        label={route}
                        subLabels={routeData.map(createTileSubLabel)}
                        icon={icon}
                        alerts={getDisruptionMessagesForRoute(
                            groupedDepartures[route],
                            disruptionMessages,
                        )}
                    />
                )
            })}
        </Tile>
    )
}

interface Props {
    stopPlaceWithDepartures: StopPlaceWithDepartures
    disruptionMessages: string[]
}

export default DepartureTile
