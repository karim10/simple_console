import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { theme } from '../formatting'
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
        <div style={consoleOutputWrapperStyles}>
            <button style={runButtonStyles} onClick={() => dispatch(runScriptForActiveFile())}>
                Run
            </button>
            <div style={consoleOutputStyles}>{consoleOutput}</div>
        </div>
    )
}

const consoleOutputWrapperStyles: React.CSSProperties = {
    background: '#b3d5fc',
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: 'solid 2px',
    position: 'relative',
    fontSize: 'large',
    fontFamily: 'Comic Sans MS',
}

const runButtonStyles: React.CSSProperties = {
    position: 'absolute',
    right: '70px',
    top: '25px',
}

const consoleOutputStyles: React.CSSProperties = {
    background: theme.background,
    height: '90%',
    width: '90%',
    border: 'solid 2px',
    borderRadius: '10px',
}
