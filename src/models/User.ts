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
    constructor (data: any) {

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
     * todo avatarURL
     */

}