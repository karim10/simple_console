import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, File } from '../redux/types'
import { addFile, setActiveFile } from '../redux/actions'
import styled from 'styled-components'

export function Sidebar() {
    const state = useSelector<AppState, AppState>((state) => state)
    const dispatch = useDispatch()
    const inputEl = React.useRef<HTMLInputElement>(null)

    const [adding, setAdding] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')

    React.useEffect(() => {
        if (adding && inputEl.current) {
            inputEl.current.focus()
        }
    })

    const addFileHandler = (filename: string) => {
        dispatch(addFile(filename))
    }
    const setActiveFileHandler = (filename: string) => {
        dispatch(setActiveFile(filename))
    }

    const addFileInSidebar = () => {
        const filenameToAdd = getNewFilename(state.files, inputValue)

        addFileHandler(filenameToAdd)
        setActiveFileHandler(filenameToAdd)
        setAdding(false)
    }
    const handleEnterDown = (e: any) => {
        if (e.key === 'Enter') {
            addFileInSidebar()
        }
    }

    return (
        <>
            <FilesWrapper>
                {state.files.map((file) => {
                    const isActive = file.filename === state.activeFile
                    return (
                        <FileButton
                            key={file.filename}
                            onClick={() => setActiveFileHandler(file.filename)}
                            isActive={isActive}
                        >
                            {file.filename}
                        </FileButton>
                    )
                })}
                {adding ? (
                    <AddInputWrapper>
                        <AddInput
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleEnterDown}
                            ref={inputEl}
                        />
                    </AddInputWrapper>
                ) : null}
            </FilesWrapper>
            <AddButton onClick={() => setAdding(true)}> Add </AddButton>
        </>
    )
}

function getNewFilename(files: ReadonlyArray<File>, filename: string): string {
    if (files.find((f) => f.filename === filename) || !filename) {
        return getNewFilename(files, filename.concat('_'))
    }

    return filename
}

const AddInputWrapper = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.text};
`

const FilesWrapper = styled.div`
    height: 100%;
    overflow-y: auto;
`

const FileButton = styled.button<{ isActive: boolean }>`
    height: 50px;
    width: 100%;
    border: 0;
    box-shadow: none;
    border-bottom: solid 2px black;
    background-color: ${(props) => (props.isActive ? props.theme.tertiary : props.theme.secondary)};
    color: ${(props) => props.theme.text};
    cursor: pointer;
    fontfamily: ${(props) => props.theme.fontMono};
`

const AddInput = styled.input`
    height: 50px;
    width: 100%;
    border: 0;
    box-shadow: none;
    text-align: center;
`

const AddButton = styled.button`
    bottom: 0px;
    height: 50px;
    border-radius: 0;
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.text};
    cursor: pointer;
    font-family: ${(props) => props.theme.fontMono};
    font-size: 16;
`
