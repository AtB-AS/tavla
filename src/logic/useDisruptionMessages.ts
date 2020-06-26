import { useState, useEffect } from 'react'
import { REFRESH_INTERVAL } from '../constants'

import Pbf from 'pbf'
import { FeedMessage, IFeedMessage, IFeedEntity } from './gtfsRealtime'

function disruptionMessagesGet(url: string): Promise<any> {
    return fetch(url, {
        method: 'GET',
    })
}

async function getDisruptionMessages(
    datasource: string,
    cachebuster,
): Promise<IFeedEntity[]> {
    const endpoint = 'https://api.entur.io/realtime/v1/gtfs-rt/trip-updates'

    const response = await disruptionMessagesGet(
        `${endpoint}?datasource=${datasource}&cachebuster=${cachebuster}`,
    )

    if (response.ok) {
        const bufferRes = await response.arrayBuffer()
        const pbf = new Pbf(new Uint8Array(bufferRes))
        const obj = FeedMessage.read(pbf)
        return obj.entity
    } else {
        console.error('error:', response.status)
        return null
    }
}

export default function useDisruptionMessages(
    datasource: string,
    cachebuster: string,
): Array<IFeedEntity> | null {
    const [disruptionMessages, setDisruptionMessages] = useState<
        Array<IFeedEntity>
    >(null)

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
