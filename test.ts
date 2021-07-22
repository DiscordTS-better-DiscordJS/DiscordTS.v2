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

    }

});

client.connect(TOKEN);