import Quill from 'quill'
import { WordRange } from './types'

export function getDelimitedRangesOf(
    searchStr: string,
    str: string,
    quill: Quill,
    color: string,
    withFormat: boolean = true
): WordRange[] {
    const indices = []
    let index,
        startIndex = 0
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        // Similar to regex lookahead lookbehind
        if (
            (index === 0 || !/[a-zA-Z0-9_]/.test(str[index - 1])) &&
            !/[a-zA-Z0-9_]/.test(str[index + searchStr.length])
        ) {
            if (withFormat) {
                quill.formatText(index, searchStr.length, { color })
            }
            indices.push({
                start: index,
                length: searchStr.length,
            })
        }

        startIndex = index + searchStr.length
    }

    return indices
}

export function getIndicesOf(
    searchStr: string,
    str: string,
    quill: Quill,
    color: string
): WordRange[] {
    const indices = []
    let index,
        startIndex = 0
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        quill.formatText(index, searchStr.length, { color })
        indices.push({
            start: index,
            length: searchStr.length,
        })
        startIndex = index + searchStr.length
    }

    return indices
}

export function getIndicesOfAfterKeyword(
    keyword: string,
    str: string,
    quill: Quill,
    color: string
): string[] {
    const keywordRanges = getDelimitedRangesOf(keyword, str, quill, color, false)
    const afterKeyword: string[] = []
    keywordRanges.forEach((kw) => {
        const start = kw.start + keyword.length + 1
        let end = start
        while (/[a-zA-Z0-9_]/.test(str[end]) && end < str.length) {
            end++
        }

        if (end !== start) {
            quill.formatText(start, end - start, { color })
            afterKeyword.push(quill.getText(start, end - start))
        }
    })

    return afterKeyword
}

// returns the indices of the given type in global scope e.g. console
export function getIndicesByTypeInGlobal(
    type: string,
    str: string,
    quill: Quill,
    color: string
): WordRange[] {
    const re = /\w+/g
    const byTypeRanges: WordRange[] = []
    let match
    while ((match = re.exec(str)) != null) {
        try {
            if (typeof eval(match.toString()) === type) {
                quill.formatText(match.index, match.toString().length, { color })
                byTypeRanges.push({
                    start: match.index,
                    length: match.toString().length,
                })
            }
        } catch (_e) {}
    }

    return byTypeRanges
}
