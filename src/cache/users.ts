import { Collection } from '../models/Collection.ts';
import { User } from '../models/User.ts';

/**
 * Class representing Channels cache
 */
export class Channels {

    #cache: Collection<string, any> = new Collection()

    /**
     * Create a guild cahce
     */
    constructor () {}

    /**
     * Add channel ws data into cache
     * @param {*} channel - Data from WS
     */
    set add (channel: any) {
        this.#cache.set(channel.id, channel);
    }

    /**
     * Get channel ws data from cache
     * @param {string} id
     * @return {Channel} Channel - Returns channel model
     */
    get (id: string): User {
        const data = this.#cache.getOne(id);
        if (data.id) return new User(data);
        else throw new Error(`No user data in cache of id: ${id}`)
    }

    /**
     * Check user in cache
     * @param {string} id
     * @return {boolean}
     */
    has (id: string): boolean {
        if (this.#cache.has(id)) return true;
        else return false;
    }

    get array (): User[] {
        return this.#cache.array.map(e => e);
    }

}