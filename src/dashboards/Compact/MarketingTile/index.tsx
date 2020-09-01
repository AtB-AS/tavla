import React, { useState, useEffect, useRef } from 'react'
import useDimensions from 'react-cool-dimensions'

import './styles.scss'

const ORIENTATION_BREAKPOINT = 1.77

enum TileSize {
    Portrait = 'portrait',
    Landscape = 'landscape',
}

const MarketingTile = (): JSX.Element => {
    const { ref, height, width } = useDimensions<HTMLDivElement>()
    const tileOrientation =
        width / height >= ORIENTATION_BREAKPOINT
            ? TileSize.Landscape
            : TileSize.Portrait

    const [activeIndex, setActiveIndex] = useState(0)
    const images = useAvailableImages(tileOrientation)
    let fadeLength
    try {
        fadeLength = parseInt(images[activeIndex].fadeLength, 10)
    } catch (error) {
        fadeLength = 10
    }
    useInterval(() => {
        setActiveIndex(activeIndex >= images.length - 1 ? 0 : activeIndex + 1)
    }, fadeLength * 1000)
    return (
        <div ref={ref} className="tile marketing-tile">
            {images.map((img, i) => (
                <div
                    key={i}
                    className="marketing-tile__image"
                    style={{
                        zIndex: activeIndex == i ? 4 : 3,
                        opacity: activeIndex == i ? 1 : 0,
                        backgroundImage: `url(${img.url})`,
                        transition: `opacity ease-in-out 1s, z-index 0.2s 1s`,
                    }}
                ></div>
            ))}
        </div>
    )
}
interface MarketingImage {
    url: string
    fadeLength: string
}

interface MarketingImagesResponse {
    images: {
        portrait: MarketingImage[]
        landscape: MarketingImage[]
    }
}

function useAvailableImages(size: TileSize) {
    const [images, setImages] = useState<MarketingImage[]>([])
    useEffect(() => {
        let mounted = true
        const fetchImages = async () => {
            const res = await fetch(process.env['MARKETING_IMAGES_ENDPOINT']!)
            if (res.status >= 400) {
                console.error(
                    'unexcpected response from endpoint: ',
                    res.status,
                )
                return
            }
            const body = (await res.json()) as MarketingImagesResponse
            mounted && setImages(body.images[size])
        }

        fetchImages()
        return () => {
            mounted = false
        }
    }, [size])

    return images
}

function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            savedCallback.current && savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

export default MarketingTile
