import { CacheBaseModel } from '../utils/CacheBaseModel.ts';
import { Message } from '../models/Message.ts';
import { api } from '../fetch/Api.ts';

/**
 * Class representing Message cache model
 */
export class Messages extends CacheBaseModel<string, any> {

    /**
     * Create messages cache
     */
    constructor () {
        super ();
    }


    /**
     * Add message into cache by guild ID filter
     * @param {string} guildID
     * @param {*} apiMessage
     */
    addOne (guildID: string, apiMessage: any) {
        const d = this.collection.get(guildID) || [];
        d.push(apiMessage);
        this.collection.set(guildID, d);
        return true
    }

    /**
     * Check message in cache
     * @param {string} guildID
     * @param {string} messageID
     * @return {boolean}
     */
    has (guildID: string, messageID: string): boolean {
        if (this.collection.has(guildID) && this.collection.get(guildID).find((m: any) => m.user.id == messageID)) return true;
        else return false;
    }

    /**
     * Get all messages from guild
     * @param {string} guildID
     */
    getAll (guildID: string): any {
        return this.collection.get(guildID).map((m: any) => new Message(m));
    }

    /**
     * Get message from cache
     * @param {string} guildID
     * @param {string} messageID
     */
    getOne (guildID: string, messageID: string): Message | any {
        const messages = this.collection.get(guildID);
        if (!messages.find((m: any) => m.id == messageID)) return undefined;
        else {
            const message = messages.find((m: any) => m.id == messageID);
            return new Message(message);
        }
    }

    /**
     * Fetch api for message
     * @param {string} channelID
     * @param {string} messageID
     * @return {*}
     */
    async fetchAPI (channelID: string, messageID: string): Promise<any> {
        try {
            const message = await api.message.fetchMessage(channelID, messageID);
            await this.addOne(channelID, message);
            return message;
        } catch (e) {
            return e;
        }

    }

    get totalSize (): number {
        let count: number = 0;
        this.collection.array.forEach((e: any) => e.forEach(() => ++count));
        return count;
    }

}