import { useState, useEffect } from 'react'
import { REFRESH_INTERVAL } from '../constants'

import Pbf from 'pbf'
import { FeedResponse } from './gtfs/sx-gtfs-rt-proxy/sx-gtfs-rt-proxy_pb.d'
import { FeedServiceClient } from './gtfs/sx-gtfs-rt-proxy/Sx-gtfs-rt-proxyServiceClientPb'

function disruptionMessagesGet(url: string): Promise<any> {
    return fetch(url, {
        method: 'GET',
    })
}

async function getDisruptionMessages(
    datasource: string,
    cachebuster,
): Promise<FeedResponse> {
    const endpoint = 'https://atb-gtfs-rt-jlmnrncfba-ew.a.run.app/'

    const feedService = new FeedServiceClient(endpoint)

    const feedResponse = feedService.getCurrentFeed

    return feedResponse
}

export default function useDisruptionMessages(
    datasource: string,
    cachebuster: string,
): FeedResponse | null {
    const [disruptionMessages, setDisruptionMessages] = useState<
        Array<FeedResponse>
    >(null)

    getDisruptionMessages('ATB', 'asd')

    useEffect(() => {
        getDisruptionMessages(datasource, cachebuster).then(
            setDisruptionMessages,
        )
        const intervalId = setInterval(() => {
            getDisruptionMessages(datasource, cachebuster).then(
                setDisruptionMessages,
            )
        }, REFRESH_INTERVAL)

        return (): void => clearInterval(intervalId)
    }, [datasource, cachebuster])

    return disruptionMessages
}
