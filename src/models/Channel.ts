import { CHANNEL_TYPES } from '../types/models/channel.ts';
import { CACHE } from './Client.ts';
import {Embed} from "./Embed.ts";
import {messageOptions} from "../types/models/message.ts";
import {sendMessage} from "../fetch/methods/message.ts";
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
        this.guildID = data.guild_id;
        this.position = data.position;
        this.name = data.name;
        this.topic = data.topic;
        this.nsfw = data.nsfw;
        this.bitrare = data.bitrare;
        this.icon = data.icon;
        this.parentID = data.parent_id;


    }

    /**
     * Send message to channel
     * @async
     * @param {string} content Content of message
     * @description Send message to channel
     */
    async send (content: string | Embed | messageOptions){
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

        return sendMessage(msg, this.id);
    }

}