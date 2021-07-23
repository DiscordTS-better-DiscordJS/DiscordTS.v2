import { Collection } from '../models/Collection.ts';
import { Member } from '../models/Member.ts';

export class Memebrs {

    /**
     * string - guildID
     * any - members ws array
     * @private
     */
    private cache: Collection<string, any>

    constructor () {
        this.cache = new Collection();
    }

    add (guildID: string, wsMembers: any[]) {
        this.cache.set(guildID, wsMembers);
    }

    addOne (guildID: string, apiMember: any) {
        const d = this.cache.get(guildID) || [];
        d.push(apiMember);
        this.cache.set(guildID, d);
    }

    has (guildID: string, userID: string): boolean {
        if (this.cache.has(guildID) && this.cache.get(guildID).find((m: any) => m.user.id == userID)) return true;
        else return false;
    }

    getAll (guildID: string): any {
        return this.cache.get(guildID).map((m: any) => new Member(m, guildID));
    }

    getOne (guildID: string, userID: string): Member | any {
        const members = this.cache.get(guildID);
        if (!members.find((m: any) => m.user.id == userID)) return undefined;
        else {
            const member = members.find((m: any) => m.user.id == userID);
            console.log(member)
            return new Member(member, guildID)
        }
    }
    
}