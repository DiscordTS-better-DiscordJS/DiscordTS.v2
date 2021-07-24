import { Message } from '../models/Message.ts';
import { CACHE } from  '../models/Client.ts';
import { fetchMember } from '../fetch/methods/member.ts';

export const _ = async (data: any) => {

    if (data.type == 0) {
        const message = new Message(data);
        const gID = message.guild.id;
        const uID = message.author.id;
        if (!data.webhook_id && data.author && data.member && !CACHE.members.has(gID, uID)) {
            if (uID == '671797608750252040') return;
            try {
                const member = await fetchMember(gID, uID);
                CACHE.members.addOne(gID, member);
            } catch {}

        }

        return message;
    }
    return undefined;
}