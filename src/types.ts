import { LegMode, TransportSubmode, StopPlace, Quay } from '@entur/sdk'

export interface LineData {
    id: string
    type: LegMode
    subType: TransportSubmode
    time: string
    route: string
    expectedDepartureTime: string
    situations?: string[]
    hasCancellation?: boolean
    isScheduled?: boolean
}

export interface Line {
    id: string
    name: string
    transportMode: LegMode
    transportSubmode: TransportSubmode
}

export type StopPlaceWithDepartures = StopPlace & {
    departures: LineData[]
    quays?: Quay[]
}

export type StopPlaceWithLines = StopPlace & { lines: Line[] }

export interface NearestPlaces {
    bikeRentalStationIds: string[]
    stopPlaceIds: string[]
}

export interface TileSubLabel {
    time: string
    hasCancellation?: boolean
    hasSituation?: boolean
    isScheduled?: boolean
}

export enum Theme {
    DEFAULT = 'default',
    DARK = 'dark',
    LIGHT = 'light',
    GREY = 'grey',
    ATB = 'atb',
}

export type IconColorType = 'default' | 'contrast'
