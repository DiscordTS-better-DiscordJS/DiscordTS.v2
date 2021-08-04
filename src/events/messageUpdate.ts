import { Message } from '../models/Message.ts';
import { CACHE } from  '../models/Client.ts';

export const _ = async (data: any) => {

    let oldMessage: Message | unknown;

    try {
        oldMessage = CACHE.messages.getOne(data.guild_id, data.id);
    } catch {
        oldMessage = undefined;
    }

    CACHE.messages.updateOne(data);
    return { oldMessage, newMessage: new Message(data) }

}