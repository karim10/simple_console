import Quill from 'quill'
import {
    getDelimitedRangesOf,
    getIndicesByTypeInGlobal,
    getIndicesOf,
    getIndicesOfAfterKeyword,
} from './rangeHelpers'
import { blueWords, greenWords, purpleWords, redChars } from './specialWords'

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
    getIndicesOfAfterKeyword('function', text, quill, theme.yellow)
    getIndicesOfAfterKeyword('const', text, quill, theme.lightBlue)
    getIndicesOfAfterKeyword('var', text, quill, theme.lightBlue)
    getIndicesOfAfterKeyword('let', text, quill, theme.lightBlue)

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
