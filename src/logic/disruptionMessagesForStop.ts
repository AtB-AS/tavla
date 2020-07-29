import { StopPlaceWithDepartures, LineData } from '../types'

export function disruptionMessagesForStop(
    stop: StopPlaceWithDepartures,
): string[] {
    const disruptionMessages: Set<string> = new Set()

    stop?.quays?.forEach((quay) => {
        quay.situations.forEach((situation) => {
            disruptionMessages.add(situation.description[0]?.value)
        })
    })

    return disruptionMessages.size > 0 ? [...disruptionMessages] : null
}

export function disruptionMessagesForRoute(
    routes: LineData[],
    stop?: StopPlaceWithDepartures,
): string[] | null {
    const disruptionMessages: Set<string> = new Set()

    routes.forEach((route) => {
        if (route.situations)
            route.situations.forEach((situation) =>
                disruptionMessages.add(situation),
            )
    })

    // Filter out messages that are already an alert for the parent stop
    if (stop) {
        const stopDisruptionMessages = disruptionMessagesForStop(stop)

        stopDisruptionMessages?.forEach((stopDisruptionMessage) => {
            disruptionMessages.delete(stopDisruptionMessage)
        })
    }

    return disruptionMessages.size > 0 ? [...disruptionMessages] : null
}
