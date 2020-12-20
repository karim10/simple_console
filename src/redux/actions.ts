/*
 * action types
 */

export const ADD_FILE = 'ADD_FILE';
export const RUN_SCRIPT_FOR_ACTIVE_FILE = 'RUN_SCRIPT_IN_FILE';
export const SET_ACTIVE_FILE = 'SET_ACTIVE_FILE';
export const SET_SCRIPT = 'SET_SCRIPT';

/*
 * action creators
 */

export function addFile(filename: string) {
    return { type: ADD_FILE, filename };
}

export function runScriptForActiveFile() {
    return { type: RUN_SCRIPT_FOR_ACTIVE_FILE };
}

export function setScript(filename: string, script: string) {
    return { type: SET_SCRIPT, filename, script };
}

export function setActiveFile(filename: string) {
    return { type: SET_ACTIVE_FILE, filename };
}
