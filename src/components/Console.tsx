import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runScriptForActiveFile } from '../redux/actions';
import { AppState } from '../redux/types';

export function Console() {
    const consoleOutput = useSelector<AppState, string>(state => state.consoleOutput);
    const dispatch = useDispatch();

    return (
        <div style={consoleOutputWrapperStyles}>
            <button onClick={() => dispatch(runScriptForActiveFile())}>Run</button>
            <div style={consoleOutputStyles}>
                {consoleOutput}
            </div>
        </div>
    );
}

const consoleOutputWrapperStyles: React.CSSProperties = {
    background: '#b3b2b8',
    height: '40%',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const consoleOutputStyles: React.CSSProperties = {
    background: 'red',
    height: '90%',
    width: '90%',
};
