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
                    &#xf185; light theme
                </option>
                <option
                    style={{ borderRadius: 10 }}
                    value={Theme.dark}
                    onSelect={() => setTheme(Theme.dark)}
                >
                    &#xf186; dark theme
                </option>
            </ThemeSelect>
        </ThemeSelectorWrapper>
    )
}

const ThemeSelect = styled.select`
    border: none;
    width: 150px;
    height: 30px;
    outline: none;
    padding: 0px 10px 0px 10px;
    font-size: 14px;
    background-color: ${(props) => props.theme.otherPrimary};
    font-family: ${(props) => props.theme.fontMono};
    border-radius: 10px;
    color: ${(props) => props.theme.otherText};
    cursor: pointer;
`

const ThemeSelectorWrapper = styled.div`
    position: absolute;
    right: 30px;
    top: 10px;
`
