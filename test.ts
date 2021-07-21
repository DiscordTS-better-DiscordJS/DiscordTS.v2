import { TOKEN } from './token.ts';

import {
    Client, Message, Embed
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', (m: Message) => {

    if (/@test/gmi.test(m.content)) {

        const args = m.args({ prefix: '@', regexp: new RegExp('[&]', 'gmi') });
        m.reply(args.join(' | '));

    }

});

client.connect(TOKEN);