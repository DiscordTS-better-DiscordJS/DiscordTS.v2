import { CACHE } from './Client.ts';
import { api } from '../fetch/Api.ts';
import { Guild } from './Guild.ts';
import { Embed } from './Embed.ts';
import { messageOptions, argsOptions, messageEdit } from '../types/models/message.ts';
import { Channel } from './Channel.ts';
import { Member } from './Member.ts';
import { User } from './User.ts';
import { DiscordTSError } from "../utils/DiscordTSError.ts";

/**
 * Message model
 */
export class Message {

    tts: boolean
    type: number
    id: string
    content: string
    attachments: any[] // --
    createdTimestamp: number
    createAt: Date;
    editedTimestamp: Date | null
    pinned: boolean
    mentionEveryone: boolean

    private readonly guildID: string
    private readonly channelID: string
    private readonly authorID: string

    /**
     *
     * @param {*} data Data from discord gateway
     */
    constructor(data: any) {

        this.guildID = data.guild_id;
        this.channelID = data.channel_id;
        this.authorID = data.author.id;

        this.type = data.type;
        this.tts = data.tts;
        this.id = data.id;
        this.content = data.content;
        this.attachments = data.attachments;
        this.createdTimestamp = new Date(data.timestamp).getTime();
        this.editedTimestamp = data.editedTimestamp;
        this.pinned = data.pinned;
        this.mentionEveryone = data.mentionEveryone;
        this.createAt = data.timestamp;

    }

    get guild (): Guild {
        return CACHE.guilds.get(this.guildID);
    }

    get channel (): Channel {
        return CACHE.channels.get(this.channelID);
    }

    get member (): Member {
        return CACHE.members.getOne(this.guildID, this.author.id)
    }

    get author (): User {
        return CACHE.users.get(this.authorID)
    }

    /**
     * Edit message
     * @param {messageEdit} editData
     */
    async edit (editData: messageEdit): Promise<boolean | any> {

        let d: any = editData;

        return api.message.modifyMessage(this.channelID, this.id, d);

    }

    /**
     * Delete this message.
     * @return {Promise<boolean>}
     */
    async delete (): Promise<boolean | Message> {
        if (!this.guild.me.permissions.has('MANAGE_MESSAGES')) throw new DiscordTSError('deleteMessage', `Client require permission MANAGE_MESSAGES to delete message on guild ID ${this.guildID}`);
        const res = await api.message.deleteMessage(this.channelID, this.id);
        if (!res) return this
        else return true
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

        msg.message_reference = {
            message_id: this.id, channel_id: this.channel.id,
            guild_id: this.guild.id
        };

        return api.message.sendMessage(msg, msg.message_reference.channel_id);
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
        if (options?.includeCommandName) args = args.slice(1);
        return args;
    }

}