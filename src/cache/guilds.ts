import { Collection } from '../models/Collection.ts';
import { Guild } from '../models/Guild.ts';
/**
 * Class representing Guilds cache
 */
export class Guilds {

    public cache: Collection<string, Guild> = new Collection()

    /**
     * Create a guild cahce
     */
    constructor () { }

    /**
     * Add guild model into cache
     * @param {Guild} guild
     */
    set add (guild: Guild) {
        this.cache.set(guild.id, guild);
    }

    /**
     * Get guild from cache
     * @param {string} id
     */
    get (id: string): Guild {
        return (this.cache.getOne(id));
    }

    get array (): Guild[] {
        return this.cache.array.map(e => e);
    }

}