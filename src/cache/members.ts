import { Collection } from '../models/Collection.ts';
import { Member } from '../models/Member.ts';
import { Client } from '../models/Client.ts';

export class Memebrs {

    /**
     * string - guildID
     * any - members ws array
     * @private
     */
    private cache: Collection<string, any>
    private readonly client: Client

    constructor (client: Client) {
        this.client = client;
        this.cache = new Collection();
    }

    add (guildID: string, wsMembers: any[]) {
        this.cache.set(guildID, wsMembers);
    }

    getAll (guildID: string): any {
        return this.cache.get(guildID).map((m: any) => new Member(m, guildID, this.client));
    }

    getOne (guildID: string, userID: string): any {
        const members = this.cache.get(guildID);
        console.log(members);
        if (!members.find((m: any) => m.id == userID)) return undefined;
        else {
            const member = members.find((m: any) => m.id == userID);
            return new Member(member, guildID, this.client)
        }
    }
    
}