import { CacheBaseModel } from '../utils/CacheBaseModel.ts';
import { Member } from '../models/Member.ts';
import { api } from '../fetch/Api.ts';

/**
 * Class representing Members cache
 */
export class Memebrs extends CacheBaseModel<string, any> {


    constructor () {
        super ();
    }


    addOne (guildID: string, apiMember: any) {
        const d = this.collection.get(guildID) || [];
        d.push(apiMember);
        this.collection.set(guildID, d);
        return true
    }

    has (guildID: string, userID: string): boolean {
        if (this.collection.has(guildID) && this.collection.get(guildID).find((m: any) => m.user.id == userID)) return true;
        else return false;
    }

    getAll (guildID: string): any {
        return this.collection.get(guildID).map((m: any) => new Member(m, guildID));
    }

    async fetchAPI (guildID: string, userID: string): Promise<boolean> {
        try {
            const member = await api.member.fetchMember(guildID, userID);
            await this.addOne(guildID, member);
            return true;
        } catch (e) {
            return e;
        }

    }

    getOne (guildID: string, userID: string): Member | any {
        const members = this.collection.get(guildID);
        if (!members.find((m: any) => m.user.id == userID)) return undefined
        else {
            const member = members.find((m: any) => m.user.id == userID);
            return new Member(member, guildID)
        }
    }

    get totalSize (): number {
        let count: number = 0;
        this.collection.array.forEach((e: any) => e.forEach((x: any) => ++count));
        return count;
    }
    
}