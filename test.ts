import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', async (m: Message) => {

    if (/@test/gmi.test(m.content)) {

        console.log(
            m.guild.channels.get(m.channel.id)?.name
        )

        await m.reply(
            new Embed({
                description: `${m.guild.channels.get(m.channel.id)}`
            })
        )

    }

});

client.connect(TOKEN);