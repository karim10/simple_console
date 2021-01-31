import Quill from 'quill'
import Delta from 'quill-delta'
import {
    getDelimitedRangesOf,
    getIndicesByTypeInGlobal,
    getIndicesOf,
    getIndicesOfAfterKeyword,
} from './rangeHelpers'
import { blueWords, bracketPairs, greenWords, purpleWords, redChars } from './specialWords'

export const handleFormating = (
    source: string,
    quillRef: React.MutableRefObject<Quill | undefined>,
    theme: any
) => {
    if (source !== 'user') {
        return
    }

    const quill = quillRef.current
    if (!quill) {
        return
    }

    const text = quill.getText()
    if (!text) {
        return
    }

    quillRef.current?.removeFormat(0, quillRef.current?.getLength() - 1)

    // globals
    getIndicesByTypeInGlobal('object', text, quill, theme.blue)
    getIndicesByTypeInGlobal('function', text, quill, theme.blue)

    // declarations
    const functions = getIndicesOfAfterKeyword('function', text, quill, theme.yellow)
    functions.forEach((f) => getIndicesOf(f, text, quill, theme.yellow))
    const consts = getIndicesOfAfterKeyword('const', text, quill, theme.lightBlue)
    const vars = getIndicesOfAfterKeyword('var', text, quill, theme.lightBlue)
    const lets = getIndicesOfAfterKeyword('let', text, quill, theme.lightBlue)
    consts
        .concat(vars)
        .concat(lets)
        .forEach((c) => getIndicesOf(c, text, quill, theme.lightBlue))

    // reserved words
    purpleWords.forEach((pw) => {
        getDelimitedRangesOf(pw, text, quill, theme.purple)
    })

    blueWords.forEach((bw) => {
        getDelimitedRangesOf(bw, text, quill, theme.blue)
    })

    greenWords.forEach((gw) => {
        getDelimitedRangesOf(gw, text, quill, theme.green)
    })

    redChars.forEach((rc) => {
        getIndicesOf(rc, text, quill, theme.orange)
    })
}

export function handleBracketsDuplication(
    delta: Delta,
    quill: React.MutableRefObject<Quill | undefined>
) {
    if (!quill.current) return

    const insertOp = delta.ops.find((op) => op.insert)
    if (!insertOp?.insert) return

    const insertedChar = insertOp.insert
    const bracketPair = bracketPairs.find((bp) => bp[1] === insertedChar)
    if (!bracketPair) return

    quill.current?.insertText(quill.current.getSelection()?.index || 0, bracketPair[2])
    quill.current?.setSelection((quill.current.getSelection()?.index || 1) - 1, 0)
}
