import React from 'react'
import Quill from 'quill'
import { AppState } from '../redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { setScript } from '../redux/actions'
import './custom-quill.css'
import { handleFormating, theme } from '../formatting'
import Delta from 'quill-delta'

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
        quillRef.current?.on('text-change', (delta, oldDelta, source) => {
            console.log('Delta: ', delta)

            const changeOps = []
            let changeIndex = 0
            for (let i = 0; i < delta.ops.length; i++) {
                if (delta.ops[i].retain) {
                    changeIndex = changeIndex + delta.ops[i].retain!
                }

                if (delta.ops[i].insert) {
                    if (i > 0) {
                        changeOps.push(delta.ops[i - 1])
                    } else {
                        changeOps.push(null)
                    }
                    changeOps.push(delta.ops[i])
                    if (i < delta.ops.length - 1) {
                        changeOps.push(delta.ops[i + 1])
                    } else {
                        changeOps.push(null)
                    }

                    break
                }
            }

            let changeText = ''

            if (!changeOps[1] || changeOps[1].insert === undefined) {
                return
            }

            if (changeOps[0]) {
                if (changeOps[0].retain) {
                    changeText =
                        changeText +
                        quillRef.current?.getText(
                            changeIndex - changeOps[0].retain,
                            changeOps[0].retain
                        )
                }
            }

            if (changeOps[1]?.insert) {
                changeText = changeText + changeOps[1].insert
            }

            if (changeOps[2]?.retain) {
                changeText =
                    changeText +
                    quillRef.current?.getText(
                        changeIndex - changeOps[1].insert?.toString().length,
                        changeOps[2].retain
                    )
            }

            if (changeOps[0] && changeOps[0].retain) {
                changeIndex = changeIndex - changeOps[0].retain
            }

            console.log('changeText', changeText)

            // console.log('delta: ', delta ? oldDelta.diff(delta) : 'delta not defined')
            handleFormating(source, quillRef, changeText, changeIndex)
        })
    }, [])

    React.useEffect(() => {
        if (quillRef.current && fileContent !== undefined) {
            quillRef.current.setText(fileContent, 'user')
            // handleFormating('user', quillRef)
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

// const selectionChangeHandler = () => {
//     const text = quillRef.current?.getText()
//     const selection = quillRef.current?.getSelection()
//     if (!text) {
//         return
//     }

//     quillRef.current?.formatText(0, text.length, { background: 'white' }, 'silent')

//     if (selection && selection.length === 0) {
//         const bracketIndices = getBracketsToFormatIndices(text, selection.index)
//         if (!bracketIndices) {
//             return
//         }

//         const { start, end } = bracketIndices
//         if (end !== -1) {
//             quillRef.current?.formatText(start, 1, { background: 'grey' }, 'silent')
//             quillRef.current?.formatText(end, 1, { background: 'grey' }, 'silent')
//         }
//     }
// }

const editorWrapperStyles: React.CSSProperties = {
    background: '#b3d5fc',
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
