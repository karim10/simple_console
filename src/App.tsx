import React from 'react'
import { Provider } from 'react-redux'

import { store } from './redux/store'

import { Console } from './components/Console'
import { EditorWrapper } from './components/Editor'
import { Sidebar } from './components/Sidebar'
import { theme } from './formatting'

function App() {
    return (
        <Provider store={store}>
            {/* <div style={{ background: theme.background, width: '100%', height: '100%' }}> */}
            <div style={containerStyles}>
                <div style={sideBarWrapperStyles}>
                    <Sidebar />
                </div>
                <div style={contentWrapperStyles}>
                    <EditorWrapper />
                    <Console />
                </div>
            </div>
            {/* </div> */}
        </Provider>
    )
}

// Container
const containerStyles: React.CSSProperties = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.background,
    padding: '100px',
}

// Side bar
const sideBarWrapperStyles: React.CSSProperties = {
    background: theme.background,
    height: '100%',
    flexBasis: '20%',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderLeft: 'solid',
    borderTop: 'solid',
    borderBottom: 'solid',
    borderColor: theme.border,
    borderRadius: '20px 0 0 20px',
    overflow: 'hidden',
}

// Content - right side
const contentWrapperStyles: React.CSSProperties = {
    flexGrow: 1,
    height: '100%',
    borderTop: 'solid',
    borderRight: 'solid',
    borderLeft: 'solid 2px',
    borderBottom: 'solid',
    borderRadius: '0 20px 20px 0',
    borderColor: theme.border,
    overflow: 'hidden',
}

export default App
