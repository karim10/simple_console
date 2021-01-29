import React from 'react'
import styled from 'styled-components'
import { AppContext, Theme } from '../context'
export function ThemeSelector() {
    const appContext = React.useContext(AppContext)
    const setTheme = (theme: Theme) => {
        appContext.setAppState({ ...appContext, theme })
    }

    return (
        <ThemeSelectorWrapper>
            <ThemeSelect
                name="theme"
                defaultValue={appContext.theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
            >
                <option value={Theme.light} onSelect={() => setTheme(Theme.light)}>
                    &#xf186; dark theme
                </option>
                <option value={Theme.dark} onSelect={() => setTheme(Theme.dark)}>
                    &#xf185; light theme
                </option>
            </ThemeSelect>
        </ThemeSelectorWrapper>
    )
}

const ThemeSelect = styled.select`
    border: none;
    width: 100px;
    height: 30px;
    outline: none;
`

const ThemeSelectorWrapper = styled.div`
    position: absolute;
    right: 30px;
    top: 10px;
`
