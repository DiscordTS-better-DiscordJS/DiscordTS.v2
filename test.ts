import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', async (m: Message) => {

    if (/@test/gmi.test(m.content)) {

        await m.channel.send(
            new Embed({
                description: [
                    `${m.channel.name}`,
                    `${client.channels.get('867003800673714186').name}`
                ].join('\n')
            })
        )

    } else if (/@demo/gmi.test(m.content)) {

        const args = m.args({ prefix: '@', includeCommandName: true });

        if (!client.channels.has(args[0])) return m.channel.send('Nie mam takiego kanalu');
        else return m.reply(new Embed({
            title: 'Nazwa kanalu z ID',
            description: `${client.channels.get(args[0]).name}`
        }));

    }

});

client.connect(TOKEN);