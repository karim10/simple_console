export interface File {
    filename: string
    editorContent: string
}

export interface AppState {
    readonly files: ReadonlyArray<File>
    readonly activeFile: string
    readonly consoleOutput: string
}

const INITIAL_EDITOR_CONTEXT = `function helloWorld() {
	console.log('Hello World!');
}

helloWorld();`

export const initialState: AppState = {
    files: [
        {
            filename: 'index.js',
            editorContent: INITIAL_EDITOR_CONTEXT,
        },
    ],
    activeFile: 'index.js',
    consoleOutput: 'Hello World!',
}
