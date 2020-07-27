import { StopPlaceWithDepartures } from '../types'

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
