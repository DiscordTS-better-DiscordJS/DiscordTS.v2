import { Client } from './Client.ts';

/**
 * Class representing Member
 */
export class Member {

    public nickname: string
    public joinedAt: string
    public mute: boolean
    public deaf: boolean
    public guildID: string

    private client: Client

    /**
     * Create Member
     * @param {*} data
     * @param {string} guildID
     * @param {Client} client
     */
    constructor (data: any, guildID: string, client: Client) {

        this.client = client;

        this.nickname = data.nick;
        this.joinedAt = data.member_joined_at;
        this.deaf = data.member_deaf;
        this.mute = data.member_mute;
        this.guildID = guildID;

    }

    // get roles
    // get permissions
    // get user

}