import { CHANNEL_TYPES, channelEdit } from '../types/models/channel.ts';
import { CACHE } from './Client.ts';
import { Embed } from "./Embed.ts";
import { messageOptions } from "../types/models/message.ts";
import { api } from '../fetch/Api.ts';
import { Collection } from './Collection.ts';
import { Message } from './Message.ts';
import { DiscordTSError } from '../utils/DiscordTSError.ts';

const channeltypes: any = CHANNEL_TYPES

/**
 * Class representing Channel
 */
export class Channel {

    id: string
    type: string
    guildID: string
    position: number
    name: string
    topic: string
    nsfw: boolean
    // permission_overwrtes:
    bitrare: number
    icon: string
    parentID: string
    coolDown: number

    constructor (data: any) {

        this.id = data.id;
        this.type = channeltypes[data.type];
        this.guildID = data.guildID;
        this.position = data.position;
        this.name = data.name;
        this.topic = data.topic;
        this.nsfw = data.nsfw;
        this.bitrare = data.bitrare;
        this.icon = data.icon;
        this.parentID = data.parent_id;
        this.coolDown = data.rate_limit_per_user;


    }

    /**
     * Get channel messages
     * @return {Collection<string, Message>}
     */
    get messages (): Collection<string, Message> {
        const messages = new Collection<string, Message>();
        CACHE.messages.getAll(this.guildID).forEach((m: Message) => messages.set(m.id, m));
        return messages
    }


    /**
     * Change channel name
     * @param {channelEdit} editData - Channel edit data
     * @return {boolean} - If success then returns payload
     */
    async edit (editData: channelEdit): Promise<boolean | any> {

        editData.type = editData.type ? editData.type : this.type

        if (editData.name && editData.name.length > 100) throw new DiscordTSError('channelEdit', '1-100 character channel name');
        if (editData.topic && editData.topic.length > 1024) throw new DiscordTSError('channelEdit', '0-1024 character channel topic');
        if (editData.cooldown && editData.cooldown > 21600 || editData.coolDown < 0) throw new DiscordTSError('channelEdit', 'amount of seconds a user has to wait before sending another message (0-21600)');
        if (editData.cooldown && editData.type !== 'GUILD_TEXT') throw new DiscordTSError('channelEdit', 'Cooldown you can change only on Text channel');
        if (editData.voiceChannelUsersLimit && editData.voiceChannelUsersLimit > 99 || editData.voiceChannelUsersLimit < 0) throw new DiscordTSError('channelEdit', '\tthe user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit');

        const d: any = editData;
        if (editData.cooldown) d.rate_limit_per_user = editData.cooldown;
        return await api.channels.modifyChannel(this.id, d);
    }


    /**
     * Send message to channel
     * @async
     * @param {string} content Content of message
     * @description Send message to channel
     */
    async send (content: string | Embed | messageOptions) {
        let msg: any = {};
        if (typeof content == 'string') msg = { content };
        else if (content instanceof Embed) {
            msg = { embeds: [content.data], content: '' };
        } else {
            content.embed ? msg.embeds = [content.embed.data] : null;
            content.tts ? msg.tts = true : msg.tts = false;
            content.content ? msg.content = content.content : null;
        }

        msg.tts = false;

        return api.message.sendMessage(msg, this.id);
    }

}