import { CHANNEL_TYPES } from '../types/models/channel.ts';
import { Client } from '../models/Client.ts';
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

    private client: Client

    constructor (data: any, client: Client) {

        this.client = client;
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

}