import { TOKEN } from './token.ts';

import {
    Client, Embed, Permissions, CACHE, User
} from './mod.ts'

const client = new Client();

client.on('ready',async () => {
    console.log('Gotowy!');
})

client.on('message', async (m) => {

    if (/\?test/gmi.test(m.content)) {

        m.channel.send(`${CACHE.channels.array.length}`);
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


        try {
            const ev = eval(args.join(" "));
            return m.channel.send(new Embed({
                description: `\`\`\`${JSON.stringify(ev)}\`\`\``
            }))

        } catch (e) {
            return m.channel.send(new Embed({
                description: `\`\`\`${e}\`\`\``
            }))
        }


    }



});

client.connect(TOKEN);