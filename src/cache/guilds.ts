import { Collection } from '../models/Collection.ts';
import { Guild } from '../models/Guild.ts';
import { Client } from '../models/Client.ts';

/**
 * Class representing Guilds cache
 */
export class Guilds {

    #cache: Collection<string, Guild> = new Collection()
    private client: Client

    /**
     * Create a guild cahce
     * @param {Client} client
     */
    constructor (client: Client) {
        this.client = client;
    }

    /**
     * Add guild model into cache
     * @param {Guild} guild
     */
    set add (guild: Guild) {
        this.#cache.set(guild.id, guild);
    }

    /**
     * Get guild from cache
     * @param {string} id
     */
    get (id: string): Guild {
        return (this.#cache.getOne(id));
    }

}