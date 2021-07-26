import { BetterCommands, Message, Embed, CACHE } from '../mod.ts';
import { User } from '../src/models/User.ts';

import { client } from './test.ts';

interface cmd {
    run: (m: Message, args: string[]) => Promise<any>
}

class commands extends BetterCommands<cmd> {

    constructor() {
        super();

        CACHE;

        this.add = {
            name: 'ram',
            command: {
                run: (m, args) => {

                    const memoryUsage = client.memoryUsage;

                    return m.reply(new Embed({
                        description: `${memoryUsage} MB`
                    }));
                }
            }
        }

        this.add = {
            name: 'avatar',
            command: {
                run: (m, args) => {

                    const user = new User(CACHE.users.get(args[0]?.replace(/[<@!>]/gim, '') || m.author.id));

                    return m.reply(new Embed({image: {url: user.avatarURL({dynamic: true})}}));

                }

            }

        }

        this.add = {
            name: 'eval',
            command: {
                run: (m, args) => {

                    const devs = ['395266229436153868', '375247025643716609'];

                    if (!devs.some(d => d == m.author.id)) return m.reply('Nie dla psa! To dla pana XD');

                    try {
                        const ev = eval(args.join(" "));
                        return m.channel.send(new Embed({
                            description: `\`\`\`${JSON.stringify(ev)}\`\`\``
                        }))

                    } catch (e) {
                        return m.channel.send(new Embed({
                            description: `\`\`\`${e}\`\`\``
                        }))
                    }

                }
            }
        }

    }
}

export default new commands();