import { PermissionsBitField } from './PermissionsBitField.ts';
import { PermissionsFlags } from '../../types/permissions/permissionsFlags.ts';
import { PermissionResolvable } from '../../types/permissions/permissions.ts';

export class Permissions extends PermissionsBitField {

    static DEFAULT = 104324673;
    static ALL = Object.values(PermissionsFlags).reduce((all, p) => all | p, 0);

    constructor(bits: any) {
        super(bits, PermissionsFlags);
    }

    /**
     * Check member / roles permissions
     * @param {PermissionResolvable} permissions
     * @param {boolean} checkAdmin
     */
    has (permissions: PermissionResolvable, checkAdmin: boolean = true): boolean {
        return ( (checkAdmin && this.hasByBit(this.flags.ADMINISTRATOR)) || this.hasByBit(permissions as any));
    }

    /**
     * Check member or role are kickable
     * @param {boolean} checkAdmin
     */
    kickable (checkAdmin: boolean = false): boolean {
        return !( (checkAdmin && this.hasByBit(this.flags.KICK_MEMBERS)) || this.has('KICK_MEMBERS') )
    }

    /**
     * Check member or role are bannable
     * @param {boolean} checkAdmin
     */
    bannable (checkAdmin: boolean = false): boolean {
        return !( (checkAdmin && this.hasByBit(this.flags.BAN_MEMBERS)) || this.has('BAN_MEMBERS') )
    }

}