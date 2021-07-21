import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', (m: Message) => {

    if (m.content == '@test') {
        m.reply(client.guilds.get(m.guild.id).name)
    }

});

client.connect(TOKEN);