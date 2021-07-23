import { TOKEN } from './token.ts';

import {
    Client, Embed, Permissions
} from './mod.ts'

const client = new Client();

// it require heeelpp xDDDD
// client.on('ready',async () => {
//     console.log('Gotowy!')
//     const c = client.channels.get('867134821330059274');
//     await c.send('Uruchomiłem się!')
// })

client.on('message', async (m) => {

    if (/@test/gmi.test(m.content)) {

        console.log()
        
    } else if (/@ram/gmi.test(m.content)) {

        const memoryUsage = client.memoryUsage;

        return m.reply(new Embed({
            description: `${memoryUsage} MB`
        }));

    }



});

client.connect(TOKEN);