import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client();

// it require heeelpp xDDDD
// client.on('ready',async () => {
//     console.log('Gotowy!')
//     const c = client.channels.get('867134821330059274');
//     await c.send('Uruchomiłem się!')
// })

client.on('message', async (m) => {

    if (/@test/gmi.test(m.content)) {

        const args = m.args({ prefix: '@', includeCommandName: true });

        if (!client.channels.has(args[0])) return m.channel.send('Nie mam takiego kanalu');
        else return m.reply(new Embed({
            title: 'Nazwa kanalu z ID',
            description: `${client.channels.get(args[0]).name}`
        }));

    } else if (/@ram/gmi.test(m.content)) {

        const memoryUsage = client.memoryUsage;

        return m.reply(new Embed({
            description: `${memoryUsage} MB`
        }));

    }

});

client.connect(TOKEN);