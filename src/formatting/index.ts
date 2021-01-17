import Quill from 'quill'
import {
    formatOnRanges,
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
}

export const handleFormating = (
    source: string,
    quillRef: React.MutableRefObject<Quill | undefined>
) => {
    if (source !== 'user') {
        return
    }

    const text = quillRef.current?.getText()
    if (!text) {
        return
    }

    quillRef.current?.removeFormat(0, quillRef.current?.getLength() - 1)

    // globals
    formatOnRanges(getIndicesByTypeInGlobal('object', text), theme.lightBlue, quillRef)
    formatOnRanges(getIndicesByTypeInGlobal('function', text), theme.yellow, quillRef)

    console.log(getIndicesOfAfterKeyword('const', text))

    // declarations
    formatOnRanges(getIndicesOfAfterKeyword('function', text), theme.yellow, quillRef)
    formatOnRanges(getIndicesOfAfterKeyword('const', text), theme.lightBlue, quillRef)
    formatOnRanges(getIndicesOfAfterKeyword('var', text), theme.lightBlue, quillRef)
    formatOnRanges(getIndicesOfAfterKeyword('let', text), theme.lightBlue, quillRef)

    // reserved words
    purpleWords.forEach((pw) => {
        formatOnRanges(getDelimitedRangesOf(pw, text), theme.purple, quillRef)
    })

    blueWords.forEach((bw) => {
        formatOnRanges(getDelimitedRangesOf(bw, text), theme.blue, quillRef)
    })

    greenWords.forEach((gw) => {
        formatOnRanges(getDelimitedRangesOf(gw, text), theme.green, quillRef)
    })

    redChars.forEach((rc) => {
        formatOnRanges(getIndicesOf(rc, text), theme.orange, quillRef)
    })
}
