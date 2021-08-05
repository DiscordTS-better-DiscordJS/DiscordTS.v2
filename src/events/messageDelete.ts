import { Message } from '../models/Message.ts';
import { CACHE } from  '../models/Client.ts';

export const _ = async (data: any) => {

    let message: Message | unknown;

    try {
        message = CACHE.messages.getOne(data.guild_id, data.id);
    } catch {
        message = undefined;
    }

    return message;
}