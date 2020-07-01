/* eslint-disable @typescript-eslint/camelcase */
import * as jspb from 'google-protobuf'

import * as gtfs$rt_gtfs$realtime_pb from '../gtfs-rt/gtfs-realtime_pb.d'

export class GetCurrentFeedRequest extends jspb.Message {
    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): GetCurrentFeedRequest.AsObject
    static toObject(
        includeInstance: boolean,
        msg: GetCurrentFeedRequest,
    ): GetCurrentFeedRequest.AsObject
    static serializeBinaryToWriter(
        message: GetCurrentFeedRequest,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): GetCurrentFeedRequest
    static deserializeBinaryFromReader(
        message: GetCurrentFeedRequest,
        reader: jspb.BinaryReader,
    ): GetCurrentFeedRequest
}

export namespace GetCurrentFeedRequest {
    export type AsObject = {}
}

export class FeedResponse extends jspb.Message {
    getMsg(): gtfs$rt_gtfs$realtime_pb.FeedMessage | undefined
    setMsg(value?: gtfs$rt_gtfs$realtime_pb.FeedMessage): FeedResponse
    hasMsg(): boolean
    clearMsg(): FeedResponse

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): FeedResponse.AsObject
    static toObject(
        includeInstance: boolean,
        msg: FeedResponse,
    ): FeedResponse.AsObject
    static serializeBinaryToWriter(
        message: FeedResponse,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): FeedResponse
    static deserializeBinaryFromReader(
        message: FeedResponse,
        reader: jspb.BinaryReader,
    ): FeedResponse
}

export namespace FeedResponse {
    export type AsObject = {
        msg?: gtfs$rt_gtfs$realtime_pb.FeedMessage.AsObject
    }
}

export class StreamFeedRequest extends jspb.Message {
    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): StreamFeedRequest.AsObject
    static toObject(
        includeInstance: boolean,
        msg: StreamFeedRequest,
    ): StreamFeedRequest.AsObject
    static serializeBinaryToWriter(
        message: StreamFeedRequest,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): StreamFeedRequest
    static deserializeBinaryFromReader(
        message: StreamFeedRequest,
        reader: jspb.BinaryReader,
    ): StreamFeedRequest
}

export namespace StreamFeedRequest {
    export type AsObject = {}
}

export class PublishRequest extends jspb.Message {
    getMsg(): gtfs$rt_gtfs$realtime_pb.FeedMessage | undefined
    setMsg(value?: gtfs$rt_gtfs$realtime_pb.FeedMessage): PublishRequest
    hasMsg(): boolean
    clearMsg(): PublishRequest

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): PublishRequest.AsObject
    static toObject(
        includeInstance: boolean,
        msg: PublishRequest,
    ): PublishRequest.AsObject
    static serializeBinaryToWriter(
        message: PublishRequest,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): PublishRequest
    static deserializeBinaryFromReader(
        message: PublishRequest,
        reader: jspb.BinaryReader,
    ): PublishRequest
}

export namespace PublishRequest {
    export type AsObject = {
        msg?: gtfs$rt_gtfs$realtime_pb.FeedMessage.AsObject
    }
}

export class PublishResponse extends jspb.Message {
    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): PublishResponse.AsObject
    static toObject(
        includeInstance: boolean,
        msg: PublishResponse,
    ): PublishResponse.AsObject
    static serializeBinaryToWriter(
        message: PublishResponse,
        writer: jspb.BinaryWriter,
    ): void
    static deserializeBinary(bytes: Uint8Array): PublishResponse
    static deserializeBinaryFromReader(
        message: PublishResponse,
        reader: jspb.BinaryReader,
    ): PublishResponse
}

export namespace PublishResponse {
    export type AsObject = {}
}
