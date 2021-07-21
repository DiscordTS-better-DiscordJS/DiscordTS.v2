import { Client } from './Client.ts';
import { sendMessage } from '../fetch/methods/message.ts';
import { Guild } from '../models/Guild.ts';

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

        this.client = client
        this.guildID = data.guild_id;

        this.type = data.type
        this.tts = data.tts
        this.author = data.author
        this.id = data.id
        this.content = data.content
        this.attachments = data.attachments
        this.createdTimestamp = data.timestamp
        this.editedTimestamp = data.editedTimestamp
        this.pinned = data.pinned
        this.mentionEveryone = data.mentionEveryone
        this.channel = data.channel_id
        this.member = data.guild_id

    }

    get guild (): Guild {
        return this.client.guilds.get(this.guildID);
    }

    /**
     * Reply to message
     * @param {string} content Content of message // embed soon
     * @description Reply to member message // todo nonmention
     */
     reply (content: string | any) /* embed support when embedes was added */ {
        let msg: any = {};
        if (typeof content == 'string') msg = { content };
        else {
            delete content.clear
            msg = { embeds: [content], content: "" }
        }

        msg.message_reference = {                // wheh channel model was added there channel should be change into channel.id
            message_id: this.id, channel_id: this.channel,
            guild_id: this.guild // same as channel, into guild.id
        }

        sendMessage(msg, msg.message_reference.channel_id);
    }

}