import { Collection } from '../models/Collection.ts';
import { Channel } from '../models/Channel.ts';
import { Client } from '../models/Client.ts';

/**
 * Class representing Channels cache
 */
export class Channels {

    #cache: Collection<string, any> = new Collection()
    private client: Client

    /**
     * Create a guild cahce
     * @param {Client} client
     */
    constructor (client: Client) {
        this.client = client;
    }

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
    get (id: string): Channel {
        const data = this.#cache.getOne(id);
        if (data.id) return new Channel(data, this.client)
        else throw new Error(`No channel data in cache of id: ${id}`)
    }

    /**
     * Check channel in cache
     * @param {string} id
     * @return {boolean}
     */
    has (id: string): boolean {
        if (this.#cache.has(id)) return true;
        else return false;
    }

    get array (): Channel[] {
        return this.#cache.array.map(e => e);
    }

}