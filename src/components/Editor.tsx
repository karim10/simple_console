import React from 'react'
import Quill from 'quill'
import { AppState } from '../redux/types'
import { useDispatch, useSelector } from 'react-redux'
import { setScript } from '../redux/actions'
import Delta from 'quill-delta'
import './custom-quill.css'
import { getBracketsToFormatIndices } from './formatting'

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
        quillRef.current?.on('selection-change', selectionChangeHandler)
        return () => {
            quillRef.current?.off('text-change', textChangeHandler)
        }
    }, [dispatch, props.activeFile])

    const selectionChangeHandler = () => {
        const text = quillRef.current?.getText()
        const selection = quillRef.current?.getSelection()
        if (!text) {
            return
        }

        quillRef.current?.formatText(0, text.length, { background: 'white' }, 'silent')

        if (selection && selection.length === 0) {
            const bracketIndices = getBracketsToFormatIndices(text, selection.index)
            if (!bracketIndices) {
                return
            }

            const { start, end } = bracketIndices
            if (end !== -1) {
                quillRef.current?.formatText(start, 1, { background: 'grey' }, 'silent')
                quillRef.current?.formatText(end, 1, { background: 'grey' }, 'silent')
            }
        }
    }

    const handleFormatSpecialWords = (delta?: Delta, oldDelta?: Delta, source?: string) => {
        if (source !== 'user') {
            return
        }

        const text = quillRef.current?.getText()
        if (!text) {
            return
        }

        quillRef.current?.removeFormat(0, quillRef.current?.getLength() - 1)

        // TODO: refactor
        getIndicesOfObject(text).forEach((i) => {
            quillRef.current?.formatText(i.start, i.end - i.start, { color: 'cyan' })
        })

        getIndicesOfFunction(text).forEach((i) => {
            quillRef.current?.formatText(i.start, i.end - i.start, { color: 'pink' })
        })

        getIndicesOfAfterKeyword(text, 'function').forEach((i) => {
            quillRef.current?.formatText(i.start, i.end - i.start, { color: 'green' })
        })

        getIndicesOfAfterKeyword(text, 'const').forEach((i) => {
            quillRef.current?.formatText(i.start, i.end - i.start, { color: 'green' })
        })

        getIndicesOfAfterKeyword(text, 'let').forEach((i) => {
            quillRef.current?.formatText(i.start, i.end - i.start, { color: 'green' })
        })

        getIndicesOfAfterKeyword(text, 'var').forEach((i) => {
            quillRef.current?.formatText(i.start, i.end - i.start, { color: 'green' })
        })

        purpleWords.forEach((pw) => {
            const indices = getDelimitedIndicesOf(pw, text)
            indices.forEach((i) => {
                quillRef.current?.formatText(i, pw.length, { color: 'purple' })
            })
        })

        blueWords.forEach((bw) => {
            const indices = getDelimitedIndicesOf(bw, text)
            indices.forEach((i) => {
                quillRef.current?.formatText(i, bw.length, { color: 'blue' })
            })
        })

        greenWords.forEach((gw) => {
            const indices = getDelimitedIndicesOf(gw, text)
            indices.forEach((i) => {
                quillRef.current?.formatText(i, gw.length, { color: 'green' })
            })
        })

        redChars.forEach((rc) => {
            const indices = getIndicesOf(rc, text)
            indices.forEach((i) => {
                quillRef.current?.formatText(i, rc.length, { color: 'orange' })
            })
        })
    }

    React.useEffect(() => {
        quillRef.current?.on('text-change', handleFormatSpecialWords)
    }, [])

    React.useEffect(() => {
        if (quillRef.current && fileContent !== undefined) {
            quillRef.current.setText(fileContent, 'user')
            handleFormatSpecialWords()
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

// function getBracketsToFormatIndices(str: string, startIndex: number) {
//     const bracketsIndex = {
//         start: startIndex,
//         end: -1
//     }

//     let start = startIndex;

//     if (str[start] === '(') {
//         for (let i = start + 1; i < str.length; i++) {
//             console.log('A');
//             let other = 0;
//             if (str[i] === '(') {
//                 console.log('B');
//                 other++;
//             }

//             if (str[i] === ')') {
//                 if (other > 0) {
//                     other--;
//                 } else {
//                     bracketsIndex.end = i;
//                 }
//             }
//         }
//     } else if (str[start - 1] === '(') {
//         bracketsIndex.start = bracketsIndex.start - 1;
//         for (let i = start; i < str.length; i++) {
//             let other = 0;
//             if (str[i] === '(') {
//                 console.log('B');
//                 other++;
//             }

//             if (str[i] === ')') {
//                 if (other > 0) {
//                     console.log('C');
//                     other--;
//                 } else {
//                     console.log('D');
//                     bracketsIndex.end = i;
//                 }
//             }
//         }
//     }

//     return bracketsIndex;
// }

function getDelimitedIndicesOf(searchStr: string, str: string): number[] {
    const indices = []
    let index,
        startIndex = 0
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        if (
            (index === 0 || !/[a-zA-Z0-9_]/.test(str[index - 1])) &&
            !/[a-zA-Z0-9_]/.test(str[index + searchStr.length])
        ) {
            indices.push(index)
        }

        startIndex = index + searchStr.length
    }

    return indices
}

function getIndicesOf(searchStr: string, str: string): number[] {
    const indices = []
    let index,
        startIndex = 0
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index)
        startIndex = index + searchStr.length
    }

    return indices
}

interface WordRange {
    start: number
    end: number
}

function getIndicesOfAfterKeyword(str: string, keyword: string): WordRange[] {
    const functionIndices = getDelimitedIndicesOf(keyword, str)
    const functionNameIndices: WordRange[] = []
    functionIndices.forEach((index) => {
        const start = index + keyword.length + 1
        let end = start
        while (/[a-zA-Z0-9_]/.test(str[end]) && end < str.length) {
            end++
        }

        if (end !== start) {
            functionNameIndices.push({
                start,
                end,
            })
        }
    })

    return functionNameIndices
}

function getIndicesOfObject(str: string): WordRange[] {
    const re = /\w+/g
    const objectIndices: WordRange[] = []
    let match
    while ((match = re.exec(str)) != null) {
        try {
            if (typeof eval(match.toString()) === 'object') {
                objectIndices.push({
                    start: match.index,
                    end: match.index + match.toString().length,
                })
            }
        } catch (_e) {}
    }

    return objectIndices
}

function getIndicesOfFunction(str: string): WordRange[] {
    const re = /\w+/g
    const functionIndices: WordRange[] = []
    let match

    while ((match = re.exec(str)) != null) {
        try {
            if (typeof eval(match.toString()) === 'function') {
                functionIndices.push({
                    start: match.index,
                    end: match.index + match.toString().length,
                })
            }
        } catch (_e) {}
    }

    return functionIndices
}

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
    background: 'white',
    border: 'solid 2px',
    borderRadius: '10px',
}

const purpleWords = [
    'await',
    'break',
    'case',
    'catch',
    'continue',
    'default',
    'do',
    'else',
    'finally',
    'goto',
    'if',
    'import',
    'package',
    'return',
    'switch',
    'throw',
    'try',
    'while',
    'with',
    'yield',
]

const blueWords = [
    'arguments',
    'const',
    'class',
    'debugger',
    'delete',
    'export',
    'false',
    'function',
    'in',
    'instanceof',
    'interface',
    'let',
    'new',
    'null',
    'private',
    'super',
    'this',
    'true',
    'var',
    'void',
    'typeof',
]

const greenWords = [
    'abstract',
    'boolean',
    'byte',
    'char',
    'double',
    'enum',
    'eval',
    'extends',
    'false',
    'final',
    'finally',
    'float',
    'for',
    'implements',
    'int',
    'long',
    'native',
    'package',
    'private',
    'protected',
    'public',
    'short',
    'static',
    'synchronized',
    'throws',
    'transient',
    'volatile',
]

const redChars = ['(', ')', '{', '}', '[', ']', "'", '"']
