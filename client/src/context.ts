import { noop } from 'lodash'
import React from 'react'

export enum Theme {
    dark = 'dark',
    light = 'light',
}

interface AppContextInterface {
    theme: Theme
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
}

export const AppContext = React.createContext<AppContextInterface>({
    theme: Theme.light,
    setAppState: noop,
})

export interface AppState {
    theme: Theme
}
