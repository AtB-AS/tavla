import React from 'react'

import TrondelagDark from './../logos/Trondelag-dark.svg'

function TrondelagLogo({ className, height }: Props): JSX.Element {
    const trondelagLogo = TrondelagDark

    return <img src={trondelagLogo} height={height} className={className} />
}

interface Props {
    className?: string
    height?: string
}

export default TrondelagLogo
