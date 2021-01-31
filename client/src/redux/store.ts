import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import { AppState, initialState } from './types'
import { ADD_FILE, RUN_SCRIPT_FOR_ACTIVE_FILE, SET_ACTIVE_FILE, SET_SCRIPT } from './actions'
import { evaluate } from '../evaluator'

function reducer(state = initialState, action: any): AppState {
    switch (action.type) {
        case ADD_FILE:
            return {
                ...state,
                files: state.files.concat({
                    filename: action.filename,
                    editorContent: '',
                }),
            }
        case SET_ACTIVE_FILE:
            return {
                ...state,
                activeFile: action.filename,
            }
        case SET_SCRIPT: {
            return {
                ...state,
                files: state.files.map((file) =>
                    file.filename === action.filename
                        ? { ...file, editorContent: action.script }
                        : file
                ),
            }
        }
        case RUN_SCRIPT_FOR_ACTIVE_FILE:
            return {
                ...state,
                consoleOutput: evaluate(
                    state.files.find((file) => file.filename === state.activeFile)?.editorContent!
                ),
            }
        default:
            return state
    }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(reducer /* , applyMiddleware(logger) */)
