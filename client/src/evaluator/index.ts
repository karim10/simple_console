export function evaluate(script: string): string {
    var consoleOutput = ''
    var newScript = script + `console.log(' ')`
    try {
        const console = {
            log: function (m: any) {
                consoleOutput = consoleOutput + m + '\n'
                return consoleOutput
            },
        }
        return eval(newScript)
    } catch (e) {
        return e.toString()
    }
}
