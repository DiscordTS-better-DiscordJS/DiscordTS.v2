export const getFile = (): { version: string } => {
    const file = Deno.readTextFileSync('./update/version.json');
    return JSON.parse(file);
}

class Update {

    private version: string

    constructor () {
        this.version = '';
    }

    async init (): Promise<void> {
        this.version = getFile().version;
        this.version = await this.getNewVersionString();
        await this.writeFile();
    }

    async writeFile (): Promise<void> {
        try {
            await Deno.writeTextFileSync('./update/version.json', JSON.stringify({ version: this.version }));
        } catch (e) {
            throw new Error(e);
        }
    }

    async parseArg (): Promise<string> {
        const currentVersionArray = this.version.split(/\./gmi);
        const updateVersionArray = Deno.args[0] ? Deno.args[0].split(/\./gmi) : [currentVersionArray[0], currentVersionArray[1], 'x'];
        const afterUpdateVersionArray = ['', '', ''];

        updateVersionArray.forEach((e, i) => {
            if (/x/i.test(e)) afterUpdateVersionArray[i] = currentVersionArray[i];
            else afterUpdateVersionArray[i] = (parseInt(currentVersionArray[i]) + 1).toString();
        });

        return afterUpdateVersionArray.join('.');
    }

    async getNewVersionString (): Promise<string> {
        return await this.parseArg();
    }
    
}

await new Update().init();
console.log('Done');