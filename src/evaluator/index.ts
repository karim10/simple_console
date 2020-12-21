export function evaluate(script: string): string {
    console.log('script: ', script);
    var consoleOutput = '';
    try {
        const console = {
            log: function (m: any) {
                consoleOutput = consoleOutput + '\n' + JSON.stringify(m);
                return consoleOutput;
            },
        };
        return eval(script);
    } catch (e) {
        return e.toString();
    }
}
