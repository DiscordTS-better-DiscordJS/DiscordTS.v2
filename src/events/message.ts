import { Message } from '../models/Message.ts';
import { CACHE } from  '../models/Client.ts';
import { fetchMember } from '../fetch/methods/member.ts';

export const _ = async (data: any) => {

    if (data.type == 0) {
        const message = new Message(data);
        const gID = message.guild.id;
        const uID = message.author.id;
        if (!data.webhook_id && data.author && data.member && !CACHE._memebrs.has(gID, uID)) {
            if (uID == '671797608750252040') return;
            const member = await fetchMember(gID, uID);
            CACHE._memebrs.addOne(gID, member);
        }

        return message;
    }
    return undefined;
}