import { FeedServiceClient } from './gtfs/sx-gtfs-rt-proxy/Sx-gtfs-rt-proxyServiceClientPb'

export default function useDisruptionMessages(): null {
    const feedService = new FeedServiceClient(
        'https://atb-gtfs-rt-jlmnrncfba-ew.a.run.app:433/',
    )

    console.log(feedService)

    return null
}
