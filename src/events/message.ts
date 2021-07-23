import { Message } from '../models/Message.ts';
import { Client } from  '../models/Client.ts';
import { fetchMember } from '../fetch/methods/member.ts';

export const _ = async (data: any, client: Client) => {

    if (data.type == 0) {
        const message = new Message(data, client);
        const gID = message.guild.id;
        const uID = message.author.id;
        if (!client._memebrs.has(gID, uID)) {
            if (uID == '671797608750252040') return;
            const member = await fetchMember(gID, uID);
            client._memebrs.addOne(gID, member);
        }

        return message;
    }
    return undefined;
}