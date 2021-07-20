import { TOKEN } from './token.ts';

import {
    Client, Message
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', (m: Message) => {
    if (m.content == 'pseudol') {
        m.reply('Jest jebany');
    }
});

client.connect(TOKEN);