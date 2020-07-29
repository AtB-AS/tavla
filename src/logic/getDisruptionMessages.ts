import { StopPlaceWithDepartures, LineData } from '../types'

// Extract situation messages from an array of departures
function getDepartureMessages(departures: LineData[]): Set<string> {
    const messages: Set<string> = new Set()

    departures.forEach((departure) => {
        if (departure.situations)
            departure.situations.forEach((situation) => messages.add(situation))
    })

    return messages
}

export function getDisruptionMessagesForStop(
    stop: StopPlaceWithDepartures,
): string[] {
    const disruptionMessages: Set<string> = new Set()

    // Collect all situation messages from every quay
    stop?.quays?.forEach((quay) => {
        quay.situations.forEach((situation) => {
            disruptionMessages.add(situation.description[0]?.value)
        })
    })

    // Use messages that occur on every line
    const departureMessages = getDepartureMessages(stop.departures)
    const commonMessages = [...departureMessages].filter((departureMessage) =>
        stop.departures.every((departure) =>
            departure.situations.includes(departureMessage),
        ),
    )
    commonMessages.forEach((message) => disruptionMessages.add(message))

    return disruptionMessages.size > 0 ? [...disruptionMessages] : null
}

export function getDisruptionMessagesForRoute(
    departures: LineData[],
    stopDisruptionMessages?: string[],
): string[] | null {
    const disruptionMessages = getDepartureMessages(departures)

    // Filter out messages that are already on the parent stop
    stopDisruptionMessages?.forEach((stopDisruptionMessage) => {
        disruptionMessages.delete(stopDisruptionMessage)
    })

    return disruptionMessages.size > 0 ? [...disruptionMessages] : null
}
