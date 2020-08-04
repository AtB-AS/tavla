import React, { useState, useEffect } from 'react'
import { BikeRentalStation } from '@entur/sdk'
import { Loader } from '@entur/loader'

import { useCounter, isDarkOrDefaultTheme } from '../../utils'
import { useSettingsContext } from '../../settings'

import BottomMenu from './BottomMenu'
import EnturLogo from '../../assets/icons/enturLogo'
import { NoStopsOnTavle } from './../Error/ErrorPages'
import { StopPlaceWithDepartures } from '../../types'
import ThemeContrastWrapper from '../ThemeWrapper/ThemeContrastWrapper'

import './styles.scss'

function DashboardWrapper(props: Props): JSX.Element {
    const secondsSinceMount = useCounter()
    const {
        className,
        children,
        history,
        bikeRentalStations,
        stopPlacesWithDepartures,
    } = props

    const [initialLoading, setInitialLoading] = useState<boolean>(true)

    useEffect(() => {
        if (
            initialLoading &&
            (bikeRentalStations || typeof bikeRentalStations === 'undefined') &&
            (stopPlacesWithDepartures ||
                typeof stopPlacesWithDepartures === 'undefined')
        ) {
            setInitialLoading(false)
        }
    }, [bikeRentalStations, initialLoading, stopPlacesWithDepartures])

    const noData =
        (!stopPlacesWithDepartures || !stopPlacesWithDepartures.length) &&
        (!bikeRentalStations || !bikeRentalStations.length)

    const renderContents = (): JSX.Element | JSX.Element[] => {
        if (!noData && !initialLoading) {
            return children
        }

        if (secondsSinceMount < 2) {
            return null
        }

        if (secondsSinceMount < 5) {
            return <Loader>Laster...</Loader>
        }

        return <NoStopsOnTavle />
    }

    const [{ logo, theme }] = useSettingsContext()

    const getEnturLogo = (): JSX.Element => {
        const logoColor = isDarkOrDefaultTheme(theme) ? 'white' : 'black'
        return <EnturLogo height="24px" style={logoColor} />
    }

    return (
        <ThemeContrastWrapper useContrast={isDarkOrDefaultTheme(theme)}>
            <div className={`dashboard-wrapper ${className}`}>
                {renderContents()}
                <ThemeContrastWrapper useContrast={true}>
                    <div className="dashboard-wrapper__byline">
                        <a href="https://tavla.entur.no">
                            Tjenesten leveres av {getEnturLogo()}
                        </a>
                    </div>
                    <BottomMenu
                        className="dashboard-wrapper__bottom-menu"
                        history={history}
                    />
                </ThemeContrastWrapper>
            </div>
        </ThemeContrastWrapper>
    )
}

interface Props {
    stopPlacesWithDepartures?: StopPlaceWithDepartures[] | null
    bikeRentalStations?: BikeRentalStation[] | null
    className: string
    children: JSX.Element | JSX.Element[]
    history: any
}

export default DashboardWrapper
