import React from 'react'
import { WidthProvider, Responsive, Layouts, Layout } from 'react-grid-layout'

import { useBikeRentalStations, useStopPlacesWithDepartures } from '../../logic'
import DashboardWrapper from '../../containers/DashboardWrapper'
import { getDisruptionMessagesForStop } from '../../logic/getDisruptionMessages'

import DepartureTile from './DepartureTile'
import BikeTile from './BikeTile'
import MarketingTile from './MarketingTile'
import './styles.scss'

import {
    getFromLocalStorage,
    saveToLocalStorage,
} from '../../settings/LocalStorage'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

function onLayoutChange(layouts: Layouts, key: string): void {
    saveToLocalStorage(key, layouts)
}

function getDataGrid(index: number): { [key: string]: number } {
    return {
        w: 1,
        maxW: 1,
        minH: 1,
        h: 4,
        x: index,
        y: 0,
    }
}

const EnturDashboard = ({ history }: Props): JSX.Element => {
    const dashboardKey = history.location.key

    const bikeRentalStations = useBikeRentalStations()

    let stopPlacesWithDepartures = useStopPlacesWithDepartures()

    // Remove stop places without departures
    if (stopPlacesWithDepartures) {
        stopPlacesWithDepartures = stopPlacesWithDepartures.filter(
            ({ departures }) => departures.length > 0,
        )
    }

    const numberOfStopPlaces = stopPlacesWithDepartures
        ? stopPlacesWithDepartures.length
        : 0
    const anyBikeRentalStations =
        bikeRentalStations && bikeRentalStations.length

    const localStorageLayout: Layouts =
        getFromLocalStorage(history.location.key) || {}
    const extraCols = anyBikeRentalStations ? 1 : 0

    // Limit column count if there are not enough space
    function limitToMax(columns: number): number {
        return Math.min(numberOfStopPlaces + extraCols, columns)
    }

    const cols = {
        xlg: limitToMax(6),
        lg: limitToMax(5),
        md: limitToMax(4),
        sm: limitToMax(3),
        xs: limitToMax(2),
        xxs: 1,
    }

    const gridBreakpoints = {
        xlg: 2350,
        lg: 2000,
        md: 1550,
        sm: 1200,
        xs: 768,
        xxs: 480,
    }

    return (
        <DashboardWrapper
            className="compact"
            history={history}
            bikeRentalStations={bikeRentalStations}
            stopPlacesWithDepartures={stopPlacesWithDepartures}
        >
            <div className="compact__tiles">
                <ResponsiveReactGridLayout
                    key={numberOfStopPlaces}
                    cols={cols}
                    layouts={localStorageLayout}
                    breakpoints={gridBreakpoints}
                    compactType="vertical"
                    isResizable={true}
                    onLayoutChange={(
                        layout: Layout[],
                        layouts: Layouts,
                    ): void => {
                        if (numberOfStopPlaces > 0) {
                            onLayoutChange(layouts, dashboardKey)
                        }
                    }}
                >
                    {(stopPlacesWithDepartures || []).map((stop, index) => (
                        <div
                            key={index.toString()}
                            data-grid={getDataGrid(index)}
                            className={
                                getDisruptionMessagesForStop(stop)
                                    ? 'warning'
                                    : ''
                            }
                        >
                            <DepartureTile
                                key={index}
                                stopPlaceWithDepartures={stop}
                                disruptionMessages={getDisruptionMessagesForStop(
                                    stop,
                                )}
                            />
                        </div>
                    ))}
                    {bikeRentalStations && anyBikeRentalStations ? (
                        <div
                            key={numberOfStopPlaces.toString()}
                            data-grid={getDataGrid(numberOfStopPlaces)}
                        >
                            <BikeTile stations={bikeRentalStations} />
                        </div>
                    ) : (
                        []
                    )}
                    <div
                        key="marketing"
                        data-grid={getDataGrid(numberOfStopPlaces)}
                    >
                        <MarketingTile></MarketingTile>
                    </div>
                </ResponsiveReactGridLayout>
            </div>
        </DashboardWrapper>
    )
}

interface Props {
    history: any
}

export default EnturDashboard
