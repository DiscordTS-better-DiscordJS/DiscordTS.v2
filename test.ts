import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', (m: Message) => {

    if (m.content == '@test') {

        m.reply(new Embed({
            description: m.guild.name
        }));

    }

});

client.connect(TOKEN);