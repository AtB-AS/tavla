/**
 * @fileoverview gRPC-Web generated client stub for
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

import * as grpcWeb from 'grpc-web'

// import * as gtfs$rt_gtfs$realtime_pb from '../gtfs-rt/gtfs-realtime_pb.d'
import * as gtfs$rt_gtfs$realtime_pb from '../gtfs-rt/gtfs-realtime_pb.d'

import {
    GetCurrentFeedRequest,
    PublishRequest,
    StreamFeedRequest,
} from './sx-gtfs-rt-proxy_pb.d'

import FeedResponse from './sx-gtfs-rt-proxy_pb.d'
import PublishResponse from './sx-gtfs-rt-proxy_pb.d'

export class FeedServiceClient {
    client_: grpcWeb.AbstractClientBase
    hostname_: string
    credentials_: null | { [index: string]: string }
    options_: null | { [index: string]: string }

    constructor(
        hostname: string,
        credentials?: null | { [index: string]: string },
        options?: null | { [index: string]: string },
    ) {
        if (!options) options = {}
        if (!credentials) credentials = {}
        options['format'] = 'text'

        this.client_ = new grpcWeb.GrpcWebClientBase(options)
        this.hostname_ = hostname
        this.credentials_ = credentials
        this.options_ = options
    }

    methodInfoGetCurrentFeed = new grpcWeb.AbstractClientBase.MethodInfo(
        FeedResponse,
        (request: GetCurrentFeedRequest) => {
            return request.serializeBinary()
        },
        FeedResponse.deserializeBinary,
    )

    getCurrentFeed(
        request: GetCurrentFeedRequest,
        metadata: grpcWeb.Metadata | null,
    ): Promise<FeedResponse>

    getCurrentFeed(
        request: GetCurrentFeedRequest,
        metadata: grpcWeb.Metadata | null,
        callback: (err: grpcWeb.Error, response: FeedResponse) => void,
    ): grpcWeb.ClientReadableStream<FeedResponse>

    getCurrentFeed(
        request: GetCurrentFeedRequest,
        metadata: grpcWeb.Metadata | null,
        callback?: (err: grpcWeb.Error, response: FeedResponse) => void,
    ) {
        if (callback !== undefined) {
            return this.client_.rpcCall(
                this.hostname_ + '/FeedService/GetCurrentFeed',
                request,
                metadata || {},
                this.methodInfoGetCurrentFeed,
                callback,
            )
        }
        return this.client_.unaryCall(
            this.hostname_ + '/FeedService/GetCurrentFeed',
            request,
            metadata || {},
            this.methodInfoGetCurrentFeed,
        )
    }

    methodInfoStreamFeed = new grpcWeb.AbstractClientBase.MethodInfo(
        FeedResponse,
        (request: StreamFeedRequest) => {
            return request.serializeBinary()
        },
        FeedResponse.deserializeBinary,
    )

    streamFeed(request: StreamFeedRequest, metadata?: grpcWeb.Metadata) {
        return this.client_.serverStreaming(
            this.hostname_ + '/FeedService/StreamFeed',
            request,
            metadata || {},
            this.methodInfoStreamFeed,
        )
    }

    methodInfoPublish = new grpcWeb.AbstractClientBase.MethodInfo(
        PublishResponse,
        (request: PublishRequest) => {
            return request.serializeBinary()
        },
        PublishResponse.deserializeBinary,
    )

    publish(
        request: PublishRequest,
        metadata: grpcWeb.Metadata | null,
    ): Promise<PublishResponse>

    publish(
        request: PublishRequest,
        metadata: grpcWeb.Metadata | null,
        callback: (err: grpcWeb.Error, response: PublishResponse) => void,
    ): grpcWeb.ClientReadableStream<PublishResponse>

    publish(
        request: PublishRequest,
        metadata: grpcWeb.Metadata | null,
        callback?: (err: grpcWeb.Error, response: PublishResponse) => void,
    ) {
        if (callback !== undefined) {
            return this.client_.rpcCall(
                this.hostname_ + '/FeedService/Publish',
                request,
                metadata || {},
                this.methodInfoPublish,
                callback,
            )
        }
        return this.client_.unaryCall(
            this.hostname_ + '/FeedService/Publish',
            request,
            metadata || {},
            this.methodInfoPublish,
        )
    }
}
