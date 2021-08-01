# DiscordTS.v2
![Stars](https://img.shields.io/github/stars/DiscordTS-better-DiscordJS/DiscordTS.v2)
![Licence](https://img.shields.io/github/license/DiscordTS-better-DiscordJS/DiscordTS.v2)
## _[Discord Support](https://discord.gg/dscts)_
___
<p>A deno library for interaction with Discord API, version 2.</p>

# Download
→ [Link to Deno Land](https//google.pl) ←

___
Simple import example
```typescript
// export.ts
export * from 'there link but now we dont have'; 
```
```typescript
// your project file
import { somethink } from '../export.ts';
```

___
Simple Client example
```typescript
// Import
import { TOKEN } from '../token.ts';
import { Client, ClientOptions, Embed } from '../export.ts';
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

# How to start process.
* Make sure your have downloaded deno. 
    * If no:
        > (windows): choco install deno
      
        > (linux): curl -fsSL https://deno.land/x/install/install.sh | sh
      
* Start client process
    > deno run --allow-net ./index.ts
    * If you use ShardsManager, use `--allow-read` flag.
    