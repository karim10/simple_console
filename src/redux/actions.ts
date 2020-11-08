/*
 * action types
 */

export const ADD_FILE = 'ADD_FILE';
export const RUN_SCRIPT_FOR_ACTIVE_FILE = 'RUN_SCRIPT_IN_FILE';
export const SET_ACTIVE_FILE = 'SET_ACTIVE_FILE';
export const SET_SCRIPT_FOR_ACTIVE_FILE = 'SET_SCRIPT_FOR_ACTIVE_FILE';

/*
 * action creators
 */

export function addFile(filename: string) {
    return { type: ADD_FILE, filename };
}

export function runScriptForActiveFile() {
    return { type: RUN_SCRIPT_FOR_ACTIVE_FILE };
}

export function setScriptForActiveFile(script: string) {
    return { type: SET_SCRIPT_FOR_ACTIVE_FILE, script };
}

export function setActiveFile(filename: string) {
    return { type: SET_ACTIVE_FILE, filename };
}
