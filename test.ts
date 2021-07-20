import { TOKEN } from './token.ts';

import {
    Client
} from './mod.ts'

const client = new Client({
    bot: true // optional, default this options value is true
});

client.on('message', (m) => {
    console.log(m.content);
});

client.connect(TOKEN);