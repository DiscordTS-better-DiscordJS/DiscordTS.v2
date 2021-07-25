import { CacheBaseModel } from '../utils/CacheBaseModel.ts';
import { Role } from '../models/Role.ts';

/**
 * Class representing Role cache
 */
export class Roles extends CacheBaseModel<string, any[]> {

    /**
     * Create roles cache
     */
    constructor () {
        super ();
    }

    /**
     * Add guilds roles into collection
     * @param {{ guildID: string, guildRoles: *[] }} data
     */
    set addRoles (data: { guildID: string, guildRoles: any[] }) {
        this.collection.set(data.guildID, data.guildRoles);
    }

    get (guildID: string): any {
        return this.collection.get(guildID);
    }

    getOne (guildID: string, roleID: string): Role {
        try {
            const roles = this.collection.get(guildID);
            const role = roles?.find(r => r.id == roleID);
            return new Role(role);
        } catch (e) {
            throw new Error(`[Roles cache Error]: ${e}`);
        }
    }

    get totalSize (): number {
        let count: number = 0;
        this.collection.array.forEach((e: any) => e.forEach((x: any) => ++count));
        return count;
    }

}