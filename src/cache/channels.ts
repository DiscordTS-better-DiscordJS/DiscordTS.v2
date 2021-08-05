import { CacheBaseModel } from '../utils/CacheBaseModel.ts';
import { Channel } from '../models/Channel.ts';
import { DiscordTSError } from '../utils/DiscordTSError.ts';
import { Collection } from '../models/Collection.ts';

/**
 * Class representing Channels cache
 */
export class Channels extends CacheBaseModel<string, any> {

    /**
     * Create a guild cahce
     */
    constructor () {
        super ();
    }

    /**
     * Get channel ws data from cache
     * @param {string} id
     * @return {Channel} Channel - Returns channel model
     */
    get (id: string): Channel {
        const data = this.collection.getOne(id);
        if (data?.id) return new Channel(data);
        else throw new DiscordTSError('channels cache', `No channel data in cache of id: ${id}`)
    }

    /**
     * Check channel in cache
     * @param {string} id
     * @return {boolean}
     */
    has (id: string): boolean {
        if (this.collection.has(id)) return true;
        else return false;
    }


}