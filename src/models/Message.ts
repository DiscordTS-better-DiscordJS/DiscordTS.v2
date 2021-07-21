import { Client } from './Client.ts';
import { sendMessage } from '../fetch/methods/message.ts';
import { Guild } from '../models/Guild.ts';
import { Embed } from '../models/Embed.ts';
import { messageOptions, argsOptions } from '../types/models/message.ts';

/**
 * Message model
 */
export class Message {

    tts: boolean
    type: number
    author: any // --
    channel!: any // --
    id: string
    content: string
    attachments: any[] // --
    createdTimestamp: Date
    editedTimestamp: Date | null
    pinned: boolean
    member: any // --
    mentionEveryone: boolean

    private client: Client
    private readonly guildID: string

    /**
     *
     * @param {*} data Data from discord gateway
     * @param {Client} client Client model
     */
    constructor(data: any, client: Client) {

        this.client = client;
        this.guildID = data.guild_id;

        this.type = data.type;
        this.tts = data.tts;
        this.author = data.author;
        this.id = data.id;
        this.content = data.content;
        this.attachments = data.attachments;
        this.createdTimestamp = data.timestamp;
        this.editedTimestamp = data.editedTimestamp;
        this.pinned = data.pinned;
        this.mentionEveryone = data.mentionEveryone;
        this.channel = client.guilds.get(this.guildID).channels.array.find(c => c.id == this.id);
        this.member = data.guild_id;

    }

    get guild (): Guild {
        return this.client.guilds.get(this.guildID);
    }

    /**
     * Reply to message
     * @async
     * @param {string} content Content of message // embed soon
     * @description Reply to member message // todo nonmention
     */
     async reply (content: string | Embed | messageOptions) /* embed support when embedes was added */ {
        let msg: any = {};
        if (typeof content == 'string') msg = { content };
        else if (content instanceof Embed) {
            msg = { embeds: [content.data], content: "" };
        } else {
            content.embed ? msg.embeds = [content.embed.data] : null;
            content.tts ? msg.tts = true : msg.tts = false;
            content.content ? msg.content = content.content : null;
        }

        msg.tts = false;

        msg.message_reference = {                // wheh channel model was added there channel should be change into channel.id
            message_id: this.id, channel_id: this.channel,
            guild_id: this.guild.id // same as channel, into guild.id
        };

        return sendMessage(msg, msg.message_reference.channel_id);
    }

    /**
     * Create arguments array from message content
     * @param {argsOptions} options - Options that be used in method.
     * @return string[] - Array of arguments created from message content.
     */
    args (options?: argsOptions): string[] {
        let args: string[] = [];
        let content: string = this.content;
        options?.prefix ? content = content.slice(options?.prefix.length) : null;
        if (options?.regexp) {
            args = content.split(options.regexp);
        } else args = content.split(/ +/gmi);
        if (options?.includeCommandName) delete args[0];
        return args;
    }

}