import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', (m: Message) => {
    if (/pseudol/gmi.test(m.content)) {

        const embed = new Embed({
            color: 'GREEN',
            description: 'Jest jebany'
        })
        m.reply(embed)

    } else if (/aleks/gmi.test(m.content)) {
        m.reply('<:DeloverOver:867146966839590942>');
    }
});

client.connect(TOKEN);