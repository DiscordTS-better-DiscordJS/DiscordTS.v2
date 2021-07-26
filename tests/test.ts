import { TOKEN } from '../token.ts';
import { Client, ClientOptions } from '../mod.ts';

import commands from './test.commands.ts';

class bot extends Client {

    constructor(options?: ClientOptions) {

        super(options);

        this.on('ready', () => console.log('Ready!'));

        this.on('message', async (m) => {
            if (!m.content.startsWith('d@')) return;
            if (!m.guild || m.author.bot) return;

            const args = m.args({ prefix: 'd@' });

            if (commands.get(args[0]))  await commands.get(args[0])?.run(m, args.slice(1));
            
        })

        this.connect(TOKEN);

    }

}

const client = new bot();
export { client  };
