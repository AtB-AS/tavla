import React, { useCallback, useMemo, useEffect, useState } from 'react'

import { ExpandablePanel } from '@entur/expand'
import { Checkbox } from '@entur/form'

import { getIcon, toggleValueInList, getIconColorType } from '../../../../utils'
import { StopPlaceWithLines, IconColorType, Theme } from '../../../../types'
import { useSettingsContext } from '../../../../settings'

import './styles.scss'
import ThemeContrastWrapper from '../../../ThemeWrapper/ThemeContrastWrapper'

function StopPlacePanel(props: Props): JSX.Element {
    const [iconColorType, setIconColorType] = useState<IconColorType>(
        'contrast',
    )

    const [settings, { setHiddenStops, setHiddenRoutes }] = useSettingsContext()

    const { hiddenModes, hiddenStops, hiddenRoutes } = settings

    const { stops } = props

    useEffect(() => {
        if (settings) {
            setIconColorType(getIconColorType(settings.theme))
        }
    }, [settings])

    const filteredStopPlaces = useMemo(
        () =>
            stops
                .map((stopPlace) => ({
                    ...stopPlace,
                    lines: stopPlace.lines.filter(
                        ({ transportMode }) =>
                            !hiddenModes.includes(transportMode),
                    ),
                }))
                .filter(({ lines }) => lines.length > 0),
        [hiddenModes, stops],
    )

    const onChooseAllPressed = useCallback(() => {
        if (hiddenStops.length > 0) {
            setHiddenStops([])
        } else {
            setHiddenStops(stops.map(({ id }) => id))
        }
    }, [hiddenStops.length, setHiddenStops, stops])

    const onToggleStop = useCallback(
        (event) => {
            const stopId = event.target.id
            const newDisabledList = toggleValueInList(hiddenStops, stopId)
            setHiddenStops(newDisabledList)
        },
        [hiddenStops, setHiddenStops],
    )

    const onToggleRoute = useCallback(
        (stopPlaceId: string, routeName: string) => {
            const newHiddenRoutes = {
                ...hiddenRoutes,
                [stopPlaceId]: toggleValueInList(
                    hiddenRoutes[stopPlaceId] || [],
                    routeName,
                ),
            }
            setHiddenRoutes(newHiddenRoutes)
        },
        [hiddenRoutes, setHiddenRoutes],
    )

    const isRouteSelected = useCallback(
        (stopPlaceId, routeName) => {
            return (
                !hiddenRoutes[stopPlaceId] ||
                !hiddenRoutes[stopPlaceId].includes(routeName)
            )
        },
        [hiddenRoutes],
    )

    const onToggleAllLines = useCallback(
        (stopPlaceId: string): void => {
            const stop = stops.find(({ id }) => id === stopPlaceId)
            const lines = stop ? stop.lines : []
            const lineNames = lines.map(({ name }) => name)
            const allWereSelected = lines.every((line) =>
                isRouteSelected(stopPlaceId, line.name),
            )

            let newHiddenRoutesForStop

            if (allWereSelected) {
                newHiddenRoutesForStop = [
                    ...(hiddenRoutes[stopPlaceId] || []),
                    ...lineNames,
                ]
            } else {
                newHiddenRoutesForStop = (
                    hiddenRoutes[stopPlaceId] || []
                ).filter((name) => !lineNames.includes(name))
            }

            setHiddenRoutes({
                ...hiddenRoutes,
                [stopPlaceId]: newHiddenRoutesForStop,
            })
        },
        [hiddenRoutes, isRouteSelected, setHiddenRoutes, stops],
    )

    if (!filteredStopPlaces.length) {
        return (
            <div className="stop-place-panel">
                <div className="stop-place-panel__header">
                    <h2>Stoppesteder</h2>
                </div>
            </div>
        )
    }

    return (
        <ThemeContrastWrapper useContrast={settings?.theme === Theme.DEFAULT}>
            <div className="stop-place-panel">
                <div className="stop-place-panel__header">
                    <h2>Stoppesteder</h2>
                    <div className="stop-place-panel__checkall">
                        <Checkbox
                            id="check-all-stop-places"
                            name="check-all-stop-places"
                            onChange={onChooseAllPressed}
                            checked={!hiddenStops.length}
                        >
                            Velg alle
                        </Checkbox>
                    </div>
                </div>
                {filteredStopPlaces.map(({ name, id, lines }) => {
                    return (
                        <div key={id} className="stop-place-panel__row">
                            <Checkbox
                                id={id}
                                className="stop-place-panel__row__checkbox"
                                checked={!hiddenStops.includes(id)}
                                onChange={onToggleStop}
                            />
                            <ExpandablePanel
                                variant="midnight"
                                className="stop-place-panel__row__expandable"
                                title={
                                    <div className="stop-place-panel__row__header">
                                        <span>{name}</span>
                                    </div>
                                }
                            >
                                <Checkbox
                                    id={`checkbox-all-lines-${id}`}
                                    checked={lines.every((line) =>
                                        isRouteSelected(id, line.name),
                                    )}
                                    onChange={(): void => onToggleAllLines(id)}
                                    className="stop-place-panel__route-checkbox"
                                >
                                    Velg alle
                                </Checkbox>
                                {lines.map(
                                    ({
                                        name: routeName,
                                        transportMode,
                                        transportSubmode,
                                    }) => {
                                        const routeId = `${id}-${routeName}`
                                        const icon = getIcon(
                                            transportMode,
                                            iconColorType,
                                            transportSubmode,
                                        )

                                        return (
                                            <Checkbox
                                                key={`checkbox-${routeId}`}
                                                id={`checkbox-${routeId}`}
                                                className="stop-place-panel__route"
                                                name={routeName}
                                                onChange={(): void =>
                                                    onToggleRoute(id, routeName)
                                                }
                                                checked={isRouteSelected(
                                                    id,
                                                    routeName,
                                                )}
                                            >
                                                {icon}
                                                {routeName}
                                            </Checkbox>
                                        )
                                    },
                                )}
                            </ExpandablePanel>
                        </div>
                    )
                })}
            </div>
        </ThemeContrastWrapper>
    )
}

interface Props {
    stops: StopPlaceWithLines[]
}

export default StopPlacePanel
