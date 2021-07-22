import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client();

client.on('message', async (m: Message) => {

    if (/@test/gmi.test(m.content)) {

        const args = m.args({ prefix: '@', includeCommandName: true });

        if (!client.channels.has(args[0])) return m.channel.send('Nie mam takiego kanalu');
        else return m.reply(new Embed({
            title: 'Nazwa kanalu z ID',
            description: `${client.channels.get(args[0]).name}`
        }));

    } else if (/@ram/gmi.test(m.content)) {

        const p = Deno.run({ cmd: ['Deno.memoryUsage().rss'] });
        const { code } = await p.status();
        const rawOutput = await p.output();

        return m.reply(new Embed({
            description: `${rawOutput} MB`
        }))

    }

});

client.connect(TOKEN);