import React from 'react';
import { connect } from 'react-redux';
import { runScriptForActiveFile } from '../redux/actions';
import { AppState } from '../redux/types';

function Console(props: { consoleOutput: string, runScript: () => void }) {


    return (
        <div style={consoleOutputWrapperStyles}>
            <button onClick={() => props.runScript()}>Run</button>
            <div style={consoleOutputStyles}>
                {props.consoleOutput}
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    consoleOutput: state.consoleOutput
})

const mapDispatchToProps = (dispatch: any) => ({
    runScript: () => dispatch(runScriptForActiveFile())
})

export const ConnectedConsole = connect(mapStateToProps, mapDispatchToProps)(Console);

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
