import { TOKEN } from './token.ts';

import {
    Client, Message
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', (m: Message) => {
    if (/pseudol/gmi.test(m.content)) {
        m.reply('Jest jebany');
    }
});

client.connect(TOKEN);