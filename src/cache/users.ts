import { CacheBaseModel } from '../utils/CacheBaseModel.ts';
import { User } from '../models/User.ts';

/**
 * Class representing Users cache
 */
export class Users extends CacheBaseModel<string, any> {

    /**
     * Create a user cahce
     */
    constructor () {
        super ();
    }

    /**
     * Get user ws data from cache
     * @param {string} id
     * @return {Channel} Channel - Returns user model
     */
    get (id: string): User {
        const data = this.collection.getOne(id);
        if (data.id) return new User(data);
        else throw new Error(`No user data in cache of id: ${id}`)
    }

    /**
     * Check user in cache
     * @param {string} id
     * @return {boolean}
     */
    has (id: string): boolean {
        if (this.collection.has(id)) return true;
        else return false;
    }

}