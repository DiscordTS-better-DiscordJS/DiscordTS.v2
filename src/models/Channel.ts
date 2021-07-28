import { CHANNEL_TYPES } from '../types/models/channel.ts';
import { CACHE } from './Client.ts';
import { Embed } from "./Embed.ts";
import { messageOptions } from "../types/models/message.ts";
import { api } from '../fetch/Api.ts';
import { Collection } from './Collection.ts';
import { Message } from './Message.ts';

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