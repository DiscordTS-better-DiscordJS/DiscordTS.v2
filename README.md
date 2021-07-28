# DiscordTS.v2
A deno library for interaction with Discord API, version 2.


# Simple example
```typescript
// Import
import { TOKEN } from '../token.ts';
import { Client, ClientOptions, Embed } from '../mod.ts';
import commands from './test.commands.ts';

// Declare class extends Client model
class client extends Client {

    // Create client
    // options - client options
    constructor(options?: ClientOptions) {

        super(options);

        // Set ready event
        this.on('ready', () => console.log('Ready!'));

        // Set message event
        this.on('message', async (m) => {
            if (!m.content.startsWith('?')) return;
            if (!m.guild || m.author.bot) return;

            const args = m.args({ prefix: '?' });

            // Run command
            if (commands.get(args[0]))  await commands.get(args[0])?.run(m, args.slice(1));

        })

        // Connect into gateway
        this.connect(TOKEN);

    }

}

// Export as default new client
export default new client();
```