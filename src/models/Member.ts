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

    /**
     * Create Member
     * @param {*} data
     * @param {string} guildID
     */
    constructor (data: any, guildID: string) {

        console.log(data);

        this.nickname = data.nick || '';
        this.joinedAt = data.joined_at || '';
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.guildID = guildID;

    }

    // get roles
    // get permissions
    // get user

}