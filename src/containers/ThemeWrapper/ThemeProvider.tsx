import React, { FC, useMemo, useEffect } from 'react'

import { Theme } from '../../types'
import { useSettingsContext } from '../../settings'

type ThemeContextType = {
    themeContext: Theme
}

const ThemeContext = React.createContext<ThemeContextType>({
    themeContext: undefined,
})

const ThemeProvider: FC = (props): JSX.Element => {
    const [settings] = useSettingsContext()

    const themeContext = settings?.theme || Theme.ATB

    useEffect(() => {
        const themes = ['dark', 'light', 'grey', 'default', 'atb']
        themes.forEach((theme) => {
            document.body.classList.remove(`${theme}-theme`)
        })

        document.body.classList.add(`${themeContext}-theme`)
    }, [settings, themeContext])

    const contextValue = useMemo((): ThemeContextType => ({ themeContext }), [
        themeContext,
    ])

    return <ThemeContext.Provider value={contextValue} {...props} />
}

export const useTheme = (): ThemeContextType => {
    return React.useContext(ThemeContext)
}

export default ThemeProvider
