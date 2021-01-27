import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { runScriptForActiveFile } from '../redux/actions'
import { AppState } from '../redux/types'

export function Console() {
    const consoleOutput = useSelector<AppState, string>((state) => state.consoleOutput)
    const dispatch = useDispatch()
    React.useEffect(() => {
        document.addEventListener('keydown', (ev) => {
            if (ev.key.toUpperCase() === 'S' && ev.ctrlKey) {
                ev.preventDefault()
                dispatch(runScriptForActiveFile())
            }
        })
    }, [dispatch])

    return (
        <ConsoleOutputWrapper>
            <Button
                variant="contained"
                onClick={() => dispatch(runScriptForActiveFile())}
                style={runButtonStyles}
                title={'Ctrl+S'}
            >
                Run
            </Button>
            <ConsoleOutput>{consoleOutput}</ConsoleOutput>
        </ConsoleOutputWrapper>
    )
}

const ConsoleOutputWrapper = styled.div`
    background: ${(props) => props.theme.primary};
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: solid 2px ${(props) => props.theme.seconday};
    position: relative;
    font-size: large;
    font-family: Comic Sans MS;
`

const runButtonStyles: React.CSSProperties = {
    position: 'absolute',
    right: '80px',
    top: '25px',
}

const ConsoleOutput = styled.div`
    background: ${(props) => props.theme.primary};
    height: 90%;
    width: 90%;
    border: solid 2px ${(props) => props.theme.secondary};
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    color: ${(props) => props.theme.text};
    white-space: pre-line;
`
