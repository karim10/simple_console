export interface File {
    filename: string
    editorContent: string
}

export interface AppState {
    readonly files: ReadonlyArray<File>
    readonly activeFile: string
    readonly consoleOutput: string
}

export const initialState: AppState = {
    files: [
        {
            filename: 'index.js',
            editorContent: '',
        },
    ],
    activeFile: 'index.js',
    consoleOutput: '',
}
