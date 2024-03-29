import { BetterCommands, Message, Embed, CACHE, api, Snowflake } from '../mod.ts';
import { User } from '../src/models/User.ts';

import { client } from './test.ts';

interface cmd {
    run: (m: Message, args: string[]) => Promise<any>
}

class commands extends BetterCommands<cmd> {

    constructor() {
        super();

        CACHE;
        api;
        new Snowflake()

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
                run: async (m, args) => {

                    const devs = ['395266229436153868', '375247025643716609', '493119070032363541'];

                    if (!devs.some(d => d == m.author.id)) return m.reply('Nie dla psa! To dla pana XD');

                    try {
                        const ev = await eval(args.join(" "));
                        return m.channel.send(new Embed({
                            description: `\`\`\`js\n${Deno.inspect(ev)}\`\`\``
                        }))

                    } catch (e) {
                        return m.channel.send(new Embed({
                            description: `\`\`\`${e}\`\`\``
                        }))
                    }

                }
            }
        }

        this.add = {
            name: 'perms',
            command: {
                run: async (m, args) => {

                    await m.reply(new Embed({
                        color: 0x696969,
                        fields: [
                            { name: 'Kickable', value: `${m.member.kickable}` },
                            { name: 'Bannable', value: `${m.member.bannable}` },
                            { name: 'Admin', value: `${m.member.permissions.has('ADMINISTRATOR')}` },
                            { name: 'rolesCount', value: `${m.member.roles.size}` }
                        ]
                    }))

                }
            }
        }

        this.add = {
            name: 'delete',
            command: {
                run: async (m, args) => {

                    if (!m.member.permissions.has('ADMINISTRATOR') || !m.member.permissions.has('BAN_MEMBERS') || !m.member.permissions.has("MANAGE_MESSAGES")) return m.reply('Nie masz uprawnien.');

                    const message = m.channel.messages.get(args[0]);
                    if (!message) return m.reply('Nie ma takiej wiadomosci.');

                    await message.delete();
                    m.channel.send('Pomyslnie usunieto.');

                }
            }
        }

        this.add = {
            name: 'kolektor',
            command: {
                run: async (m, args) => {

                    const filter = (msg) => {
                        return msg.author.id === m.author.id;
                    }
                    const collector = await m.channel.createMessagesCollector({ filter, messagesCount: 2 });

                    collector.on('collect', message => {
                        message.reply('Wo');
                        await message.delete();
                    })

                }
            }
        }

    }
}

export default new commands();