import { CacheBaseModel } from '../utils/CacheBaseModel.ts';
import { Guild } from '../models/Guild.ts';
/**
 * Class representing Guilds cache
 */
export class Guilds extends CacheBaseModel<string, Guild>{

    /**
     * Create a guild cahce
     */
    constructor () {
        super ();
    }

    /**
     * Get guild from cache
     * @param {string} id
     */
    get (id: string): Guild {
        return (this.collection.getOne(id));
    }

}