import { TOKEN } from './token.ts';

import {
    Client, Embed, Permissions
} from './mod.ts'

const client = new Client();

// it require heeelpp xDDDD
// client.on('ready',async () => {
//     console.log('Gotowy!')
//     const c = client.channels.get('867134821330059274');
//     await c.send('Uruchomiłem się!')
// })

client.on('message', async (m) => {
    console.log(m);
    if (/\?test/gmi.test(m.content)) {

        m.channel?.send(m.member.nickname);
        
    } else if (/\?ram/gmi.test(m.content)) {

        const memoryUsage = client.memoryUsage;

        return m.reply(new Embed({
            description: `${memoryUsage} MB`
        }));

    } else if (/\?eval/.test(m.content)) {

        const args = m.args({ prefix: '?', includeCommandName: true });
        const devs = ['395266229436153868', '375247025643716609'];

        if (!devs.some(d => d == m.author.id)) return m.reply('Nie dla psa! To dla pana XD');

        const e = eval(args.join(" "));
        return m.channel.send(new Embed({
            description: `\`\`\`${e}\`\`\``
        }))

    }



});

client.connect(TOKEN);