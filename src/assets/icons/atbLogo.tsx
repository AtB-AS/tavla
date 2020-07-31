import React from 'react'

import AtbWhite from './../logos/Atblogo_white.svg'
import AtbBlack from './../logos/Atblogo_black.svg'
import AtbDark from './../logos/Atblogo_dark.svg'

function AtbLogo({ className, style, height }: Props): JSX.Element {
    let atbLogo = null

    switch (style) {
        case 'black':
            atbLogo = AtbBlack
            break
        case 'dark':
            atbLogo = AtbDark
            break
        default:
            atbLogo = AtbWhite
            break
    }

    return <img src={atbLogo} height={height} className={className} />
}

interface Props {
    className?: string
    style?: 'white' | 'black' | 'dark'
    height?: string
}

export default AtbLogo
