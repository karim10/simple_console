import React from 'react'
import Quill from 'quill'
import { AppState } from '../redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { setScript } from '../redux/actions'
import './custom-quill.css'
import { handleBracketsDuplication, handleFormating } from '../formatting'
import styled, { withTheme } from 'styled-components'

export function ActiveEditor() {
    const activeFile = useSelector<AppState, string>((state) => state.activeFile)

    return <WithThemeEditor activeFile={activeFile} />
}

const WithThemeEditor = withTheme(Editor)

function Editor(props: { activeFile: string; theme: any }) {
    const quillRef = React.useRef<Quill>()
    const dispatch = useDispatch()
    const fileContent = useSelector<AppState, string>(
        (state) => state.files.find((f) => f.filename === props.activeFile)?.editorContent ?? ''
    )

    React.useEffect(() => {
        quillRef.current = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: false,
            },
        })
        quillRef.current.root.setAttribute('spellcheck', 'false')
        quillRef.current.focus()
    }, [props.activeFile])

    React.useEffect(() => {
        const textChangeHandler = () =>
            dispatch(setScript(props.activeFile, quillRef.current?.getText() ?? ''))
        quillRef.current?.on('text-change', textChangeHandler)
        return () => {
            quillRef.current?.off('text-change', textChangeHandler)
        }
    }, [dispatch, props.activeFile])

    React.useEffect(() => {
        quillRef.current?.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                handleBracketsDuplication(delta, quillRef)
                handleFormating(source, quillRef, props.theme)
            }
        })
    }, [props.activeFile])

    React.useEffect(() => {
        if (quillRef.current && fileContent !== undefined) {
            quillRef.current.setText(fileContent, 'user')
            handleFormating('user', quillRef, props.theme)
        }
        // needed to avoid extra rendering
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeFile])

    return (
        <EditorWrapper>
            <EditorContainer id={'editor'} />
        </EditorWrapper>
    )
}

const EditorWrapper = styled.div`
    background: ${(props) => props.theme.primary};
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const EditorContainer = styled.div`
    height: 90%;
    width: 90%;
    background: ${(props) => props.theme.primary};
    border: solid 2px ${(props) => props.theme.secondary} !important;
    border-radius: 10px;
    caret-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
`
