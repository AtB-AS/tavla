import React, { memo, useCallback } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

import { Slider } from '../../../../components'

import './styles.scss'
import { Label } from '@entur/typography'
import { DEFAULT_ZOOM } from '../../../../constants'
import { useSettingsContext } from '../../../../settings'
import { Scooter } from '@entur/sdk'
import ScooterOperatorLogo from '../../../../assets/icons/scooterOperatorLogo'
import PositionPin from '../../../../assets/icons/positionPin'

function ZoomEditor(props: Props): JSX.Element {
    const [settings] = useSettingsContext()
    const { zoom, onZoomUpdated } = props

    const { latitude = 0, longitude = 0 } = settings?.coordinates || {}

    const handleSliderChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newZoom = Number(event.target.value)
            onZoomUpdated(newZoom)
        },
        [onZoomUpdated],
    )

    return (
        <div className="zoom-editor">
            <Label>Juster zoom-nivå i kartet</Label>
            <Slider
                handleChange={handleSliderChange}
                value={zoom}
                min={13.5}
                max={18}
                step={0.1}
            />
            <div style={{ marginBottom: '0.5rem' }}></div>
            <ReactMapGL
                latitude={latitude}
                longitude={longitude}
                width="auto"
                height="40vh"
                zoom={zoom || DEFAULT_ZOOM}
                mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
                mapStyle={process.env.MAPBOX_STYLE}
            >
                <Marker latitude={latitude} longitude={longitude}>
                    <PositionPin size="24px" />
                </Marker>
                {props.scooters
                    ? props.scooters.map((sctr) => (
                          <Marker
                              key={sctr.id}
                              latitude={sctr.lat}
                              longitude={sctr.lon}
                          >
                              <ScooterOperatorLogo
                                  logo={sctr.operator}
                                  size="24px"
                              />
                          </Marker>
                      ))
                    : []}
            </ReactMapGL>
        </div>
    )
}

interface Props {
    zoom: number
    onZoomUpdated: (newZoom: number) => void
    scooters: Scooter[] | null
}

export default memo<Props>(ZoomEditor)
