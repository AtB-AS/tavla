import { LegMode, TransportSubmode, StopPlace } from '@entur/sdk'

export interface LineData {
    id: string
    type: LegMode
    subType: TransportSubmode
    time: string
    route: string
    expectedDepartureTime: string
    situation?: string
    hasCancellation?: boolean
    isRealtime?: boolean
}

export interface Line {
    id: string
    name: string
    transportMode: LegMode
    transportSubmode: TransportSubmode
}

export type StopPlaceWithDepartures = StopPlace & {
    departures: LineData[]
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
    isRealtime?: boolean
}

export enum Theme {
    DEFAULT = 'default',
    DARK = 'dark',
    LIGHT = 'light',
    GREY = 'grey',
}

export type IconColorType = 'default' | 'contrast'
