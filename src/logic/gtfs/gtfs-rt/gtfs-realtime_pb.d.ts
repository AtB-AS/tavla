/* eslint-disable no-redeclare */
/* eslint-disable import/export */
import * as jspb from 'google-protobuf'

export class FeedMessage extends jspb.Message {
    getHeader(): FeedHeader | undefined
    setHeader(value?: FeedHeader): FeedMessage
    hasHeader(): boolean
    clearHeader(): FeedMessage

    getEntityList(): Array<FeedEntity>
    setEntityList(value: Array<FeedEntity>): FeedMessage
    clearEntityList(): FeedMessage
    addEntity(value?: FeedEntity, index?: number): FeedEntity

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): FeedMessage.AsObject
    static toObject(
        includeInstance: boolean,
        msg: FeedMessage,
    ): FeedMessage.AsObject
    static serializeBinaryToWriter(
        message: FeedMessage,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): FeedMessage
    static deserializeBinaryFromReader(
        message: FeedMessage,
        reader: jspb.BinaryReader,
    ): FeedMessage
}

export namespace FeedMessage {
    export type AsObject = {
        header?: FeedHeader.AsObject
        entityList: Array<FeedEntity.AsObject>
    }
}

export class FeedHeader extends jspb.Message {
    getGtfsRealtimeVersion(): string
    setGtfsRealtimeVersion(value: string): FeedHeader

    getIncrementality(): FeedHeader.Incrementality
    setIncrementality(value: FeedHeader.Incrementality): FeedHeader

    getTimestamp(): number
    setTimestamp(value: number): FeedHeader

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): FeedHeader.AsObject
    static toObject(
        includeInstance: boolean,
        msg: FeedHeader,
    ): FeedHeader.AsObject
    static serializeBinaryToWriter(
        message: FeedHeader,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): FeedHeader
    static deserializeBinaryFromReader(
        message: FeedHeader,
        reader: jspb.BinaryReader,
    ): FeedHeader
}

export namespace FeedHeader {
    export type AsObject = {
        gtfsRealtimeVersion: string
        incrementality: FeedHeader.Incrementality
        timestamp: number
    }

    export enum Incrementality {
        FULL_DATASET = 0,
        DIFFERENTIAL = 1,
    }
}

export class FeedEntity extends jspb.Message {
    getId(): string
    setId(value: string): FeedEntity

    getIsDeleted(): boolean
    setIsDeleted(value: boolean): FeedEntity

    getTripUpdate(): TripUpdate | undefined
    setTripUpdate(value?: TripUpdate): FeedEntity
    hasTripUpdate(): boolean
    clearTripUpdate(): FeedEntity

    getVehicle(): VehiclePosition | undefined
    setVehicle(value?: VehiclePosition): FeedEntity
    hasVehicle(): boolean
    clearVehicle(): FeedEntity

    getAlert(): Alert | undefined
    setAlert(value?: Alert): FeedEntity
    hasAlert(): boolean
    clearAlert(): FeedEntity

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): FeedEntity.AsObject
    static toObject(
        includeInstance: boolean,
        msg: FeedEntity,
    ): FeedEntity.AsObject
    static serializeBinaryToWriter(
        message: FeedEntity,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): FeedEntity
    static deserializeBinaryFromReader(
        message: FeedEntity,
        reader: jspb.BinaryReader,
    ): FeedEntity
}

export namespace FeedEntity {
    export type AsObject = {
        id: string
        isDeleted: boolean
        tripUpdate?: TripUpdate.AsObject
        vehicle?: VehiclePosition.AsObject
        alert?: Alert.AsObject
    }
}

export class TripUpdate extends jspb.Message {
    getTrip(): TripDescriptor | undefined
    setTrip(value?: TripDescriptor): TripUpdate
    hasTrip(): boolean
    clearTrip(): TripUpdate

    getVehicle(): VehicleDescriptor | undefined
    setVehicle(value?: VehicleDescriptor): TripUpdate
    hasVehicle(): boolean
    clearVehicle(): TripUpdate

    getStopTimeUpdateList(): Array<TripUpdate.StopTimeUpdate>
    setStopTimeUpdateList(value: Array<TripUpdate.StopTimeUpdate>): TripUpdate
    clearStopTimeUpdateList(): TripUpdate
    addStopTimeUpdate(
        value?: TripUpdate.StopTimeUpdate,
        index?: number,
    ): TripUpdate.StopTimeUpdate

    getTimestamp(): number
    setTimestamp(value: number): TripUpdate

    getDelay(): number
    setDelay(value: number): TripUpdate

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): TripUpdate.AsObject
    static toObject(
        includeInstance: boolean,
        msg: TripUpdate,
    ): TripUpdate.AsObject
    static serializeBinaryToWriter(
        message: TripUpdate,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): TripUpdate
    static deserializeBinaryFromReader(
        message: TripUpdate,
        reader: jspb.BinaryReader,
    ): TripUpdate
}

export namespace TripUpdate {
    export type AsObject = {
        trip?: TripDescriptor.AsObject
        vehicle?: VehicleDescriptor.AsObject
        stopTimeUpdateList: Array<TripUpdate.StopTimeUpdate.AsObject>
        timestamp: number
        delay: number
    }

    export class StopTimeEvent extends jspb.Message {
        getDelay(): number
        setDelay(value: number): StopTimeEvent

        getTime(): number
        setTime(value: number): StopTimeEvent

        getUncertainty(): number
        setUncertainty(value: number): StopTimeEvent

        serializeBinary(): Uint8Array
        toObject(includeInstance?: boolean): StopTimeEvent.AsObject
        static toObject(
            includeInstance: boolean,
            msg: StopTimeEvent,
        ): StopTimeEvent.AsObject
        static serializeBinaryToWriter(
            message: StopTimeEvent,
            writer: jspb.BinaryWriter,
        ): void
        static deserializeBinary(bytes: Uint8Array): StopTimeEvent
        static deserializeBinaryFromReader(
            message: StopTimeEvent,
            reader: jspb.BinaryReader,
        ): StopTimeEvent
    }

    export namespace StopTimeEvent {
        export type AsObject = {
            delay: number
            time: number
            uncertainty: number
        }
    }

    export class StopTimeUpdate extends jspb.Message {
        getStopSequence(): number
        setStopSequence(value: number): StopTimeUpdate

        getStopId(): string
        setStopId(value: string): StopTimeUpdate

        getArrival(): TripUpdate.StopTimeEvent | undefined
        setArrival(value?: TripUpdate.StopTimeEvent): StopTimeUpdate
        hasArrival(): boolean
        clearArrival(): StopTimeUpdate

        getDeparture(): TripUpdate.StopTimeEvent | undefined
        setDeparture(value?: TripUpdate.StopTimeEvent): StopTimeUpdate
        hasDeparture(): boolean
        clearDeparture(): StopTimeUpdate

        getScheduleRelationship(): TripUpdate.StopTimeUpdate.ScheduleRelationship
        setScheduleRelationship(
            value: TripUpdate.StopTimeUpdate.ScheduleRelationship,
        ): StopTimeUpdate

        serializeBinary(): Uint8Array
        toObject(includeInstance?: boolean): StopTimeUpdate.AsObject
        static toObject(
            includeInstance: boolean,
            msg: StopTimeUpdate,
        ): StopTimeUpdate.AsObject
        static serializeBinaryToWriter(
            message: StopTimeUpdate,
            writer: jspb.BinaryWriter,
        ): void
        static deserializeBinary(bytes: Uint8Array): StopTimeUpdate
        static deserializeBinaryFromReader(
            message: StopTimeUpdate,
            reader: jspb.BinaryReader,
        ): StopTimeUpdate
    }

    export namespace StopTimeUpdate {
        export type AsObject = {
            stopSequence: number
            stopId: string
            arrival?: TripUpdate.StopTimeEvent.AsObject
            departure?: TripUpdate.StopTimeEvent.AsObject
            scheduleRelationship: TripUpdate.StopTimeUpdate.ScheduleRelationship
        }

        export enum ScheduleRelationship {
            SCHEDULED = 0,
            SKIPPED = 1,
            NO_DATA = 2,
        }
    }
}

export class VehiclePosition extends jspb.Message {
    getTrip(): TripDescriptor | undefined
    setTrip(value?: TripDescriptor): VehiclePosition
    hasTrip(): boolean
    clearTrip(): VehiclePosition

    getVehicle(): VehicleDescriptor | undefined
    setVehicle(value?: VehicleDescriptor): VehiclePosition
    hasVehicle(): boolean
    clearVehicle(): VehiclePosition

    getPosition(): Position | undefined
    setPosition(value?: Position): VehiclePosition
    hasPosition(): boolean
    clearPosition(): VehiclePosition

    getCurrentStopSequence(): number
    setCurrentStopSequence(value: number): VehiclePosition

    getStopId(): string
    setStopId(value: string): VehiclePosition

    getCurrentStatus(): VehiclePosition.VehicleStopStatus
    setCurrentStatus(value: VehiclePosition.VehicleStopStatus): VehiclePosition

    getTimestamp(): number
    setTimestamp(value: number): VehiclePosition

    getCongestionLevel(): VehiclePosition.CongestionLevel
    setCongestionLevel(value: VehiclePosition.CongestionLevel): VehiclePosition

    getOccupancyStatus(): VehiclePosition.OccupancyStatus
    setOccupancyStatus(value: VehiclePosition.OccupancyStatus): VehiclePosition

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): VehiclePosition.AsObject
    static toObject(
        includeInstance: boolean,
        msg: VehiclePosition,
    ): VehiclePosition.AsObject
    static serializeBinaryToWriter(
        message: VehiclePosition,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): VehiclePosition
    static deserializeBinaryFromReader(
        message: VehiclePosition,
        reader: jspb.BinaryReader,
    ): VehiclePosition
}

export namespace VehiclePosition {
    export type AsObject = {
        trip?: TripDescriptor.AsObject
        vehicle?: VehicleDescriptor.AsObject
        position?: Position.AsObject
        currentStopSequence: number
        stopId: string
        currentStatus: VehiclePosition.VehicleStopStatus
        timestamp: number
        congestionLevel: VehiclePosition.CongestionLevel
        occupancyStatus: VehiclePosition.OccupancyStatus
    }

    export enum VehicleStopStatus {
        INCOMING_AT = 0,
        STOPPED_AT = 1,
        IN_TRANSIT_TO = 2,
    }

    export enum CongestionLevel {
        UNKNOWN_CONGESTION_LEVEL = 0,
        RUNNING_SMOOTHLY = 1,
        STOP_AND_GO = 2,
        CONGESTION = 3,
        SEVERE_CONGESTION = 4,
    }

    export enum OccupancyStatus {
        EMPTY = 0,
        MANY_SEATS_AVAILABLE = 1,
        FEW_SEATS_AVAILABLE = 2,
        STANDING_ROOM_ONLY = 3,
        CRUSHED_STANDING_ROOM_ONLY = 4,
        FULL = 5,
        NOT_ACCEPTING_PASSENGERS = 6,
    }
}

export class Alert extends jspb.Message {
    getActivePeriodList(): Array<TimeRange>
    setActivePeriodList(value: Array<TimeRange>): Alert
    clearActivePeriodList(): Alert
    addActivePeriod(value?: TimeRange, index?: number): TimeRange

    getInformedEntityList(): Array<EntitySelector>
    setInformedEntityList(value: Array<EntitySelector>): Alert
    clearInformedEntityList(): Alert
    addInformedEntity(value?: EntitySelector, index?: number): EntitySelector

    getCause(): Alert.Cause
    setCause(value: Alert.Cause): Alert

    getEffect(): Alert.Effect
    setEffect(value: Alert.Effect): Alert

    getUrl(): TranslatedString | undefined
    setUrl(value?: TranslatedString): Alert
    hasUrl(): boolean
    clearUrl(): Alert

    getHeaderText(): TranslatedString | undefined
    setHeaderText(value?: TranslatedString): Alert
    hasHeaderText(): boolean
    clearHeaderText(): Alert

    getDescriptionText(): TranslatedString | undefined
    setDescriptionText(value?: TranslatedString): Alert
    hasDescriptionText(): boolean
    clearDescriptionText(): Alert

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): Alert.AsObject
    static toObject(includeInstance: boolean, msg: Alert): Alert.AsObject
    static serializeBinaryToWriter(
        message: Alert,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): Alert
    static deserializeBinaryFromReader(
        message: Alert,
        reader: jspb.BinaryReader,
    ): Alert
}

export namespace Alert {
    export type AsObject = {
        activePeriodList: Array<TimeRange.AsObject>
        informedEntityList: Array<EntitySelector.AsObject>
        cause: Alert.Cause
        effect: Alert.Effect
        url?: TranslatedString.AsObject
        headerText?: TranslatedString.AsObject
        descriptionText?: TranslatedString.AsObject
    }

    export enum Cause {
        UNKNOWN_CAUSE = 1,
        OTHER_CAUSE = 2,
        TECHNICAL_PROBLEM = 3,
        STRIKE = 4,
        DEMONSTRATION = 5,
        ACCIDENT = 6,
        HOLIDAY = 7,
        WEATHER = 8,
        MAINTENANCE = 9,
        CONSTRUCTION = 10,
        POLICE_ACTIVITY = 11,
        MEDICAL_EMERGENCY = 12,
    }

    export enum Effect {
        NO_SERVICE = 1,
        REDUCED_SERVICE = 2,
        SIGNIFICANT_DELAYS = 3,
        DETOUR = 4,
        ADDITIONAL_SERVICE = 5,
        MODIFIED_SERVICE = 6,
        OTHER_EFFECT = 7,
        UNKNOWN_EFFECT = 8,
        STOP_MOVED = 9,
    }
}

export class TimeRange extends jspb.Message {
    getStart(): number
    setStart(value: number): TimeRange

    getEnd(): number
    setEnd(value: number): TimeRange

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): TimeRange.AsObject
    static toObject(
        includeInstance: boolean,
        msg: TimeRange,
    ): TimeRange.AsObject
    static serializeBinaryToWriter(
        message: TimeRange,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): TimeRange
    static deserializeBinaryFromReader(
        message: TimeRange,
        reader: jspb.BinaryReader,
    ): TimeRange
}

export namespace TimeRange {
    export type AsObject = {
        start: number
        end: number
    }
}

export class Position extends jspb.Message {
    getLatitude(): number
    setLatitude(value: number): Position

    getLongitude(): number
    setLongitude(value: number): Position

    getBearing(): number
    setBearing(value: number): Position

    getOdometer(): number
    setOdometer(value: number): Position

    getSpeed(): number
    setSpeed(value: number): Position

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): Position.AsObject
    static toObject(includeInstance: boolean, msg: Position): Position.AsObject
    static serializeBinaryToWriter(
        message: Position,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): Position
    static deserializeBinaryFromReader(
        message: Position,
        reader: jspb.BinaryReader,
    ): Position
}

export namespace Position {
    export type AsObject = {
        latitude: number
        longitude: number
        bearing: number
        odometer: number
        speed: number
    }
}

export class TripDescriptor extends jspb.Message {
    getTripId(): string
    setTripId(value: string): TripDescriptor

    getRouteId(): string
    setRouteId(value: string): TripDescriptor

    getDirectionId(): number
    setDirectionId(value: number): TripDescriptor

    getStartTime(): string
    setStartTime(value: string): TripDescriptor

    getStartDate(): string
    setStartDate(value: string): TripDescriptor

    getScheduleRelationship(): TripDescriptor.ScheduleRelationship
    setScheduleRelationship(
        value: TripDescriptor.ScheduleRelationship,
    ): TripDescriptor

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): TripDescriptor.AsObject
    static toObject(
        includeInstance: boolean,
        msg: TripDescriptor,
    ): TripDescriptor.AsObject
    static serializeBinaryToWriter(
        message: TripDescriptor,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): TripDescriptor
    static deserializeBinaryFromReader(
        message: TripDescriptor,
        reader: jspb.BinaryReader,
    ): TripDescriptor
}

export namespace TripDescriptor {
    export type AsObject = {
        tripId: string
        routeId: string
        directionId: number
        startTime: string
        startDate: string
        scheduleRelationship: TripDescriptor.ScheduleRelationship
    }

    export enum ScheduleRelationship {
        SCHEDULED = 0,
        ADDED = 1,
        UNSCHEDULED = 2,
        CANCELED = 3,
    }
}

export class VehicleDescriptor extends jspb.Message {
    getId(): string
    setId(value: string): VehicleDescriptor

    getLabel(): string
    setLabel(value: string): VehicleDescriptor

    getLicensePlate(): string
    setLicensePlate(value: string): VehicleDescriptor

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): VehicleDescriptor.AsObject
    static toObject(
        includeInstance: boolean,
        msg: VehicleDescriptor,
    ): VehicleDescriptor.AsObject
    static serializeBinaryToWriter(
        message: VehicleDescriptor,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): VehicleDescriptor
    static deserializeBinaryFromReader(
        message: VehicleDescriptor,
        reader: jspb.BinaryReader,
    ): VehicleDescriptor
}

export namespace VehicleDescriptor {
    export type AsObject = {
        id: string
        label: string
        licensePlate: string
    }
}

export class EntitySelector extends jspb.Message {
    getAgencyId(): string
    setAgencyId(value: string): EntitySelector

    getRouteId(): string
    setRouteId(value: string): EntitySelector

    getRouteType(): number
    setRouteType(value: number): EntitySelector

    getTrip(): TripDescriptor | undefined
    setTrip(value?: TripDescriptor): EntitySelector
    hasTrip(): boolean
    clearTrip(): EntitySelector

    getStopId(): string
    setStopId(value: string): EntitySelector

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): EntitySelector.AsObject
    static toObject(
        includeInstance: boolean,
        msg: EntitySelector,
    ): EntitySelector.AsObject
    static serializeBinaryToWriter(
        message: EntitySelector,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): EntitySelector
    static deserializeBinaryFromReader(
        message: EntitySelector,
        reader: jspb.BinaryReader,
    ): EntitySelector
}

export namespace EntitySelector {
    export type AsObject = {
        agencyId: string
        routeId: string
        routeType: number
        trip?: TripDescriptor.AsObject
        stopId: string
    }
}

export class TranslatedString extends jspb.Message {
    getTranslationList(): Array<TranslatedString.Translation>
    setTranslationList(
        value: Array<TranslatedString.Translation>,
    ): TranslatedString
    clearTranslationList(): TranslatedString
    addTranslation(
        value?: TranslatedString.Translation,
        index?: number,
    ): TranslatedString.Translation

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): TranslatedString.AsObject
    static toObject(
        includeInstance: boolean,
        msg: TranslatedString,
    ): TranslatedString.AsObject
    static serializeBinaryToWriter(
        message: TranslatedString,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): TranslatedString
    static deserializeBinaryFromReader(
        message: TranslatedString,
        reader: jspb.BinaryReader,
    ): TranslatedString
}

export namespace TranslatedString {
    export type AsObject = {
        translationList: Array<TranslatedString.Translation.AsObject>
    }

    export class Translation extends jspb.Message {
        getText(): string
        setText(value: string): Translation

        getLanguage(): string
        setLanguage(value: string): Translation

        serializeBinary(): Uint8Array
        toObject(includeInstance?: boolean): Translation.AsObject
        static toObject(
            includeInstance: boolean,
            msg: Translation,
        ): Translation.AsObject
        static serializeBinaryToWriter(
            message: Translation,
            writer: jspb.BinaryWriter,
        ): void
        static deserializeBinary(bytes: Uint8Array): Translation
        static deserializeBinaryFromReader(
            message: Translation,
            reader: jspb.BinaryReader,
        ): Translation
    }

    export namespace Translation {
        export type AsObject = {
            text: string
            language: string
        }
    }
}
