import React from 'react'
import Quill from 'quill'
import { AppState } from '../redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { setScript } from '../redux/actions'
import './custom-quill.css'
import { handleFormating, theme } from '../formatting'

export function EditorWrapper() {
    const activeFile = useSelector<AppState, string>((state) => state.activeFile)

    return <Editor activeFile={activeFile} />
}

function Editor(props: { activeFile: string }) {
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
    }, [])

    React.useEffect(() => {
        const textChangeHandler = () =>
            dispatch(setScript(props.activeFile, quillRef.current?.getText() ?? ''))
        quillRef.current?.on('text-change', textChangeHandler)
        // quillRef.current?.on('selection-change', selectionChangeHandler)
        return () => {
            quillRef.current?.off('text-change', textChangeHandler)
        }
    }, [dispatch, props.activeFile])

    React.useEffect(() => {
        quillRef.current?.on('text-change', (oldDelta, delta, source) =>
            handleFormating(source, quillRef)
        )
    }, [])

    React.useEffect(() => {
        if (quillRef.current && fileContent !== undefined) {
            quillRef.current.setText(fileContent, 'user')
            handleFormating('user', quillRef)
        }
        // needed to avoid extra rendering
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeFile])

    return (
        <div style={editorWrapperStyles}>
            <div style={editorStyles} id={'editor'}></div>
        </div>
    )
}

const editorWrapperStyles: React.CSSProperties = {
    background: theme.background,
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const editorStyles: React.CSSProperties = {
    height: '90%',
    width: '90%',
    background: theme.background,
    border: 'solid 2px',
    borderRadius: '10px',
    caretColor: 'white',
    color: 'white',
}
