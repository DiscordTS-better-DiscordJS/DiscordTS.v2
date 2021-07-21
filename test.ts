import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', async (m: Message) => {

    if (/@test/gmi.test(m.content)) {

        await m.reply(
            new Embed({
                description: `${m.channel.name}`
            })
        )

    }

});

client.connect(TOKEN);