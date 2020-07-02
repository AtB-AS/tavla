/* eslint-disable @typescript-eslint/camelcase */
// import { FeedServiceClient } from './gtfs/sx-gtfs-rt-proxy/Sx-gtfs-rt-proxyServiceClientPb'

export function disruptionMessagesForStop(
    stop,
    disruptionMessages,
): Array<object> {
    return disruptionMessages['entity'].filter(alert =>
        alert['alert']['informed_entity'].some(
            el => el['stop_id'] == stop['id'],
        ),
    )
}

export function useDisruptionMessages(): object {

    const tempData = {
        header: {
            gtfs_realtime_version: '2.0',
            incrementality: 0,
            timestamp: 1593607999,
        },
        entity: [
            {
                id: '0xdeadbeef',
                alert: {
                    active_period: [{ start: 1593607999, end: 1593694399 }],
                    informed_entity: [
                        { stop_id: 'NSR:StopPlace:41613' },
                        { stop_id: 'NSR:StopPlace:43460' },
                    ],
                    cause: 6,
                    effect: 5,
                    header_text: {
                        translation: [
                            {
                                text: 'Veiarbeid i Prinsens Gate',
                                language: 'nob',
                            },
                        ],
                    },
                    description_text: {
                        translation: [
                            {
                                text: 'Det kan bli noen forsinkelser.',
                                language: 'nob',
                            },
                        ],
                    },
                },
            },
            {
                id: '0xdeadbeef',
                alert: {
                    active_period: [{ start: 1593607999, end: 1593694399 }],
                    informed_entity: [
                        { stop_id: 'NSR:StopPlace:43501' },
                        { stop_id: 'NSR:StopPlace:43460' },
                    ],
                    cause: 6,
                    effect: 5,
                    header_text: {
                        translation: [
                            {
                                text: 'Jordras ved Olav Tryggvasons gate',
                                language: 'nob',
                            },
                        ],
                    },
                    description_text: {
                        translation: [
                            {
                                text:
                                    'Grunnet jordraset vil avgangstidene være misvisende \
                                    inntil videre. Vi anbefaler våre reisende å ta linje 385 til \
                                    Gokk, da omkjøringen gjør at bussene ikke rekker normert \
                                    avgangstid fra sentrum.',
                                language: 'nob',
                            },
                        ],
                    },
                },
            },
        ],
    }

    return tempData
}
