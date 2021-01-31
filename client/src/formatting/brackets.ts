interface Bracket {
    start: string
    end: string
}

const brackets: Bracket[] = [
    { start: '{', end: '}' },
    { start: '[', end: ']' },
    { start: '(', end: ')' },
]

export function getBracketsToFormatIndices(str: string, selectionIndex: number) {
    const bracketsIndex = {
        start: -1,
        end: -1,
    }
    let bracketType: Bracket | undefined
    const char = str[selectionIndex]
    const adjacentChar = str[selectionIndex - 1]

    brackets.forEach((b) => {
        if (b.start === char) {
            bracketsIndex.start = selectionIndex
            bracketType = b
        } else if (b.start === adjacentChar) {
            bracketsIndex.start = selectionIndex - 1
            bracketType = b
        }

        if (b.end === char) {
            bracketsIndex.end = selectionIndex
            bracketType = b
        } else if (b.end === adjacentChar) {
            bracketsIndex.end = selectionIndex - 1
            bracketType = b
        }
    })

    if (bracketType === undefined) {
        return
    }

    if (bracketsIndex.end === -1) {
        for (let i = bracketsIndex.start + 1; i < str.length; i++) {
            let other = 0
            if (str[i] === bracketType.start) {
                other++
            }

            if (str[i] === bracketType.end) {
                if (other > 0) {
                    other--
                } else {
                    bracketsIndex.end = i
                }
            }
        }
    } else {
        for (let i = bracketsIndex.end; i > 0; i--) {
            let other = 0
            if (str[i] === bracketType.end) {
                other++
            }

            if (str[i] === bracketType.start) {
                if (other > 0) {
                    other--
                } else {
                    bracketsIndex.end = i
                }
            }
        }
    }

    return bracketsIndex
}
