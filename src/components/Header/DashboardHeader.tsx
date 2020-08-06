import React from 'react'
import { Link } from 'react-router-dom'

import { useSettings } from '../../settings'

import Clock from '../Clock'
import { AtbLogo } from '../../assets/icons'
import UpgradeTavlaBanner from '../../containers/DashboardWrapper/UpgradeTavlaBanner'
import { isDarkOrDefaultTheme } from '../../utils'

export function DashboardHeader(): JSX.Element {
    const settings = useSettings()[0]
    if (!settings) return null
    const { logo, logoSize, description, theme } = settings

    const logoColor = isDarkOrDefaultTheme(theme) ? 'white' : 'black'

    const headerLogo = logo ? (
        <img src={logo} height={logoSize} />
    ) : (
        <Link to="/">
            <AtbLogo className="header__logo-wrapper__logo" style={logoColor} />
        </Link>
    )

    const logoDescription =
        logoSize === '32px' &&
        (description || 'Finn din reiserute på atb.no eller i AtB Reise-appen')
    const boardDescription = (
        <span className="header__logo-wrapper__description">
            {logo
                ? logoDescription
                : 'Finn din reiserute på atb.no eller i AtB Reise-appen'}
        </span>
    )

    return (
        <div>
            <UpgradeTavlaBanner />
            <div className="header">
                <div
                    className={`header__logo-wrapper ${
                        logo ? '' : 'header__default'
                    }`}
                >
                    {headerLogo}
                    {boardDescription}
                </div>
                <Clock className="header__clock" />
            </div>
        </div>
    )
}
