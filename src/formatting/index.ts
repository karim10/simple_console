import Quill from 'quill'
import {
    getDelimitedRangesOf,
    getIndicesByTypeInGlobal,
    getIndicesOf,
    getIndicesOfAfterKeyword,
} from './rangeHelpers'
import { blueWords, greenWords, purpleWords, redChars } from './specialWords'

export const theme = {
    blue: '#569CD6', //const var let,
    yellow: '#D5DCAA', //function
    lightBlue: '#4FC1FF',
    purple: '#C586C0',
    orange: '#E19577',
    grey: '#D4D4D4',
    background: '#1E1E1E',
    green: '#629155',
    border: '#A89492',
}

export const handleFormating = (
    source: string,
    quillRef: React.MutableRefObject<Quill | undefined>
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
        getDelimitedRangesOf(pw, text, quill, theme.green)
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
