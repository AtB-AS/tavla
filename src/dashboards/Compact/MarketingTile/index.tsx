import React, { useState } from 'react'
import useDimensions from 'react-cool-dimensions'

import './styles.scss'
import {
    MARKETING_IMAGE_PORTRAIT,
    MARKETING_IMAGE_LANDSCAPE,
} from '../../../constants'

const LANDSCAPE_BREAKPOINT = 2

const MarketingTile = (): JSX.Element => {
    const { ref, height, width } = useDimensions<HTMLDivElement>()
    const image =
        width / height > LANDSCAPE_BREAKPOINT
            ? MARKETING_IMAGE_LANDSCAPE
            : MARKETING_IMAGE_PORTRAIT

    return (
        <div className="tile marketing-tile">
            <div
                ref={ref}
                className="marketing-tile__image"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            ></div>
        </div>
    )
}

export default MarketingTile
