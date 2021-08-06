import { CacheBaseModel } from '../utils/CacheBaseModel.ts';
import { Message } from '../models/Message.ts';
import { api } from '../fetch/Api.ts';
import { Collection } from '../models/Collection.ts';

/**
 * Class representing Message cache model
 */
export class Messages extends CacheBaseModel<string, Collection<string, any>> {

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
        const d = this.collection.get(guildID) || new Collection<string, any>();
        d.set(apiMessage.id, apiMessage);
        this.collection.set(guildID, d);
        return true;
    }

    /**
     * Check message in cache
     * @param {string} guildID
     * @param {string} messageID
     * @return {boolean}
     */
    has (guildID: string, messageID: string): boolean {
        if (this.collection.has(guildID) && this.collection.get(guildID)?.has(messageID)) return true;
        else return false;
    }

    /**
     * Get all messages from guild
     * @param {string} guildID
     */
    getAll (guildID: string): any {
        return this.collection.get(guildID);
    }

    /**
     * Get message from cache
     * @param {string} guildID
     * @param {string} messageID
     */
    getOne (guildID: string, messageID: string): Message | any {
        const messages = this.collection.get(guildID);
        if (!messages?.has(messageID)) return undefined;
        else {
            const message = messages.get(messageID);
            return new Message(message);
        }
    }

    /**
     * Update message payload in cache
     * @param {string} guildID
     * @param {string} messageID
     * @param {string} updateData
     */
    updateOnePayload (guildID: string, messageID: string, updateData: any): unknown | boolean {
        const messages = this.collection.get(guildID);
        if (!messages?.has(messageID)) return false;
        else {
            const targetMessage = messages.get(messageID);
            Object.keys(updateData).forEach((k: any) => {
                if (targetMessage[k]) targetMessage[k] = updateData[k];
            });
            return targetMessage;
        }
    }

    /**
     * Update message in cache
     * @param {*} newData
     */
    updateOne (newData: any): boolean {
        try {
            this.addOne(newData.guild_id, newData);
            return true;
        } catch {
            return false;
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
            await this.addOne(message.guild_id, message);
            return message;
        } catch (e) {
            return e;
        }

    }

    get totalSize (): number {
        let count: number = 0;
        this.collection.array.forEach((e => e.array.forEach(i => ++count)));
        return count;
    }

}