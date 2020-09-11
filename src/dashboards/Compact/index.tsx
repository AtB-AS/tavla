import React from 'react'
import { WidthProvider, Responsive, Layouts, Layout } from 'react-grid-layout'

import {
    useBikeRentalStations,
    useStopPlacesWithDepartures,
    useScooters,
} from '../../logic'
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

function getDataGrid(
    index: number,
    columns: number,
): { [key: string]: number } {
    return {
        w: 1,
        maxW: 1,
        minH: 1,
        h: 4,
        x: index % columns,
        y: 1,
    }
}

function getCurrentLayout(
    gridBreakpoints: GridBreakpoints,
): keyof GridBreakpoints {
    let size = Object.keys(gridBreakpoints)[0]
    Object.values(gridBreakpoints).forEach((gridValue, i) => {
        if (gridValue > window.innerWidth) {
            size = Object.keys(gridBreakpoints)[i + 1] as keyof GridBreakpoints
        }
    })
    return size as keyof GridBreakpoints
}

const EnturDashboard = ({ history }: Props): JSX.Element => {
    const dashboardKey = history.location.key

    const bikeRentalStations = useBikeRentalStations()

    const scooters = useScooters()

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
    const anyBikeRentalStations: number | null =
        bikeRentalStations && bikeRentalStations.length

    const anyScooters = Boolean(scooters && scooters.length)

    const localStorageLayout: Layouts =
        getFromLocalStorage(history.location.key) || {}

    const bikeCol = anyBikeRentalStations ? 1 : 0
    const extraCols = anyBikeRentalStations ? 1 : 0

    const scooterCol = anyScooters ? 1 : 0

    // Limit column count if there are not enough space
    function limitToMax(columns: number): number {
        return numberOfStopPlaces
            ? Math.min(numberOfStopPlaces + extraCols, columns)
            : columns
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

    const colCount = cols[getCurrentLayout(gridBreakpoints)]

    return (
        <DashboardWrapper
            className="compact"
            history={history}
            bikeRentalStations={bikeRentalStations}
            stopPlacesWithDepartures={stopPlacesWithDepartures}
            scooters={scooters}
        >
            <div className="compact__tiles">
                {colCount > 0 && (
                    <ResponsiveReactGridLayout
                        key={numberOfStopPlaces}
                        cols={cols}
                        layouts={localStorageLayout}
                        breakpoints={gridBreakpoints}
                        compactType="vertical"
                        isResizable={true}
                        margin={[30, 30]}
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
                                data-grid={getDataGrid(index, colCount)}
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
                                data-grid={getDataGrid(
                                    numberOfStopPlaces,
                                    colCount,
                                )}
                            >
                                <BikeTile stations={bikeRentalStations} />
                            </div>
                        ) : (
                            []
                        )}
                        <div
                            key="marketing"
                            data-grid={{
                                x: colCount,
                                y: 0,
                                w: 1,
                                h: 2,
                                isResizable: false,
                            }}
                        >
                            <MarketingTile></MarketingTile>
                        </div>
                    </ResponsiveReactGridLayout>
                )}
            </div>
        </DashboardWrapper>
    )
}

interface Props {
    history: any
}

interface GridBreakpoints {
    xlg: number
    lg: number
    md: number
    sm: number
    xs: number
    xxs: number
}

export default EnturDashboard
