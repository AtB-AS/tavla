import React from 'react'

import AtbWhite from './../logos/Atblogo_white.svg'
import AtbBlack from './../logos/Atblogo_black.svg'

function AtbLogo({ className, style, height }: Props): JSX.Element {
    const atbLogo = style === 'black' ? AtbBlack : AtbWhite

    return <img src={atbLogo} height={height} className={className} />
}

interface Props {
    className?: string
    style?: 'white' | 'black'
    height?: string
}

export default AtbLogo
