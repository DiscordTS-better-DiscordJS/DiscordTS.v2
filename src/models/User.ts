import { avatarURLOptions } from '../types/models/user.ts';
import { Snowflake } from '../utils/ConvertSnwoflake.ts';

/**
 * Class representing User
 */
export class User {

    username: string
    discriminator: string
    tag: string
    avatar: string
    id: string
    bot: boolean
    system: boolean
    mfa: boolean

    /**
     * Create a User
     * @param {*} data
     */
    constructor(data: any) {

        
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.id = data.id;
        this.tag = `${data.username}#${data.discriminator}`;
        this.avatar = data.avatar;
        this.bot = data.bot ? true : false;
        this.system = data.system ? true:  false;
        this.mfa = data.mfa ? true : false;

    }

    /**
     * getter baseAvatarURL
     * @description Get base url as webp with size 2048
     * @returns {string} avatarURL
     */
    get baseAvatarURL (): string {
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.webp?size=2048`

    }

    /**
     * @description Return Date of account creation
     * @returns {Date}
     */
    get createdAt (): Date {
        return new Snowflake().decode(this.id).createdAt;
    }

    /**
     * @description Returns timestamp of account creation
     * @returns {number}
     */
    get createdTimestamp(): number {
        return new Date(new Snowflake().decode(this.id).createdAt).getTime();
    }

    get mention (): string {
        return `<@!${this.id}>`;
    }

    /**
     * Get User avatar with custom url options
     * @param {avatarURLOptions} options
     * @return {string} avatarURL
     */
    avatarURL (options?: avatarURLOptions): string {
        if (!options) return this.baseAvatarURL;

        if (options.dynamic && this.avatar.startsWith('a_')) {
            return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.gif?size=${options.size ? `${options.size}` : '2048'}`;
        } else return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${options.type ? options.type : 'webp'}?size=${options.size ? `${options.size}` : '2048'}`
    }

}