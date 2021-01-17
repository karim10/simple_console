import Quill from 'quill'
import { WordRange } from './types'

export function getDelimitedRangesOf(searchStr: string, str: string): WordRange[] {
    const indices = []
    let index,
        startIndex = 0
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        // Similar to regex lookahead lookbehind
        if (
            (index === 0 || !/[a-zA-Z0-9_]/.test(str[index - 1])) &&
            !/[a-zA-Z0-9_]/.test(str[index + searchStr.length])
        ) {
            indices.push({
                start: index,
                length: searchStr.length,
            })
        }

        startIndex = index + searchStr.length
    }

    return indices
}

export function getIndicesOf(searchStr: string, str: string): WordRange[] {
    const indices = []
    let index,
        startIndex = 0
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push({
            start: index,
            length: searchStr.length,
        })
        startIndex = index + searchStr.length
    }

    return indices
}

export function getIndicesOfAfterKeyword(keyword: string, str: string): WordRange[] {
    const keywordRanges = getDelimitedRangesOf(keyword, str)
    const afterKeywordIndices: WordRange[] = []
    keywordRanges.forEach((kw) => {
        const start = kw.start + keyword.length + 1
        let end = start
        while (/[a-zA-Z0-9_]/.test(str[end]) && end < str.length) {
            end++
        }

        if (end !== start) {
            afterKeywordIndices.push({
                start,
                length: end - start,
            })
        }
    })

    return afterKeywordIndices
}

// returns the indices of the given type in global scope e.g. console
export function getIndicesByTypeInGlobal(type: string, str: string): WordRange[] {
    const re = /\w+/g
    const byTypeRanges: WordRange[] = []
    let match
    while ((match = re.exec(str)) != null) {
        try {
            if (typeof eval(match.toString()) === type) {
                byTypeRanges.push({
                    start: match.index,
                    length: match.toString().length,
                })
            }
        } catch (_e) {}
    }

    return byTypeRanges
}

export function formatOnRanges(
    wordRanges: WordRange[],
    color: string,
    quillRef: React.MutableRefObject<Quill | undefined>
) {
    wordRanges.forEach((i) => {
        quillRef.current?.formatText(i.start, i.length, { color })
    })
}
