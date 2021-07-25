import { Permissions } from './Permissions/Permissions.ts';

/**
 *  Class representing Role model
 */
export class Role {

    id: string
    name: string
    color: string
    hoist: boolean
    mentionable: boolean
    position: number
    managed: boolean


    private perms: any

    /**
     * Create Role model
     */
    constructor (data: any) {

        this.perms = data.permissions;

        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.mentionable = data.mentionable;
        this.id = data.id;
        this.managed = data.managed;
        this.position = data.position;

    }

    /**
     * Get role permissions
     * @return {Permissions} permissions of role
     */
    get permissions (): Permissions {
        return new Permissions(this.perms);
    }

}