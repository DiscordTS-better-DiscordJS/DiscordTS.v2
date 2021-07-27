import { CACHE } from './Client.ts';
import { Role } from './Role.ts';
import { Collection } from './Collection.ts';
import { Permissions } from './Permissions/Permissions.ts';
import { Guild } from './Guild.ts';
import { User } from './User.ts';

/**
 * Class representing Member
 */
export class Member {

    public nickname: string
    public joinedAt: string
    public mute: boolean
    public deaf: boolean
    public guildID: string
    public id: string

    private _roles: any

    /**
     * Create Member
     * @param {*} data
     * @param {string} guildID
     */
    constructor (data: any, guildID: string) {

        this._roles = data.roles

        this.nickname = data.nick != null ? data.nick : 'none';
        this.joinedAt = data.joined_at || '';
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.guildID = guildID;
        this.id = data.user.id;

    }

    /**
     * Get member roles
     * @return {Role[]} - Array of member roles
     */
    get roles (): Collection<string, Role> {
        const WS = CACHE.roles.get(this.guildID).filter((r: any) => this._roles.some((filter: any) => filter == r.id))
        const roles = new Collection<string, Role>();
        WS.forEach((e: any) => roles.set(e.id, new Role(e)));
        return roles;
    }

    /**
     * Get member guild model
     * @return {Guild} Member Guild model
     */
    get guild (): Guild {
        return CACHE.guilds.get(this.guildID);
    }

    /**
     * Get member permissions
     * @return {Permissions} Member permissions model
     */
    get permissions (): Permissions {
        return new Permissions(this.roles.array.map((r: Role) => r.permissions.bitfield));
    }

    /**
     * Check member kickable
     * @return {boolean}
     */
    get kickable (): boolean {
        return this.permissions.has('KICK_MEMBERS', true);
    }

    /**
     * Check member bannable
     * @return {boolean}
     */
    get bannable (): boolean {
        return this.permissions.has('BAN_MEMBERS', true)
    }

    get user (): User {
        return CACHE.users.get(this.id);
    }

}