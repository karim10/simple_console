import React from 'react'
import { Provider } from 'react-redux'

import { store } from './redux/store'

import { Console } from './components/Console'
import { ActiveEditor } from './components/Editor'
import { Sidebar } from './components/Sidebar'
import { theme } from './theme'
import styled, { ThemeProvider } from 'styled-components'

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <IDEContainer>
                        <SidebarWrapper>
                            <Sidebar />
                        </SidebarWrapper>
                        <ContentWrapper>
                            <ActiveEditor />
                            <Console />
                        </ContentWrapper>
                    </IDEContainer>
                </AppWrapper>
            </ThemeProvider>
        </Provider>
    )
}

const AppWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.primary};
`

const IDEContainer = styled.div`
    height: 90%;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const SidebarWrapper = styled.div`
    background: ${(props) => props.theme.primary};
    height: 100%;
    flex-basis: 20%;
    align-content: center;
    display: flex;
    flex-direction: column;
    border-left: solid;
    border-top: solid;
    border-bottom: solid;
    border-color: ${(props) => props.theme.secondary};
    border-radius: 20px 0 0 20px;
    overflow: hidden;
`
const ContentWrapper = styled.div`
    flex-grow: 1;
    height: 100%;
    border-top: solid;
    border-right: solid;
    border-left: solid 2px;
    border-bottom: solid;
    border-radius: 0 20px 20px 0;
    border-color: ${(props) => props.theme.secondary};
    overflow: hidden;
`
export default App
