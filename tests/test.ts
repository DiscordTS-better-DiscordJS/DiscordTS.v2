import { TOKEN, PREFIX } from '../token.ts';
import { Client, ClientOptions, Embed } from '../mod.ts';

import commands from './test.commands.ts';

class bot extends Client {

    constructor(options?: ClientOptions) {

        super(options);

        this.on('ready', () => console.log('Ready!'));

        this.on('message', async (m) => {
            if (!m.content.startsWith(PREFIX)) return;
            if (!m.guild || m.author.bot) return;

            const args = m.args({ prefix: PREFIX });

            if (commands.get(args[0]))  await commands.get(args[0])?.run(m, args.slice(PREFIX.length));

        })

        this.on('messageUpdate', async d => {

            if (!d.oldMessage) return;

            return d.newMessage.channel.send(new Embed({
                fields: [
                    { name: 'Przed edycją', value: d.oldMessage.content },
                    { name: 'Po edycji', value: d.newMessage.content }
                ]
            }));

        })

        this.connect(TOKEN);

    }

}

const client = new bot();
export { client  };
