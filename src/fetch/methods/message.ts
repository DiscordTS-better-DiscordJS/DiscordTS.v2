import { FETCH } from '../fetch.ts';
import { DiscordTSError } from '../../utils/DiscordTSError.ts';

import { CACHE } from '../../models/Client.ts';
import { UpdateUtil } from './updateUtil.ts'

export const modifyMessage = async (channelID: string, messageID: string, editData: any) => {

    const message = await CACHE.messages.fetchAPI(channelID, messageID);
    if (!message.id) throw new DiscordTSError('modifyMessage', `Invalid message ${messageID}`);

    Object.keys(message).forEach(key => {
        editData[key] ? message[key] = editData[key] : null;
    });

    const util = new UpdateUtil({ url: `/channels/${channelID}/messages/${messageID}` });
    util.data(message);

    const update = await util.send();

    if (!update) return false;
    else return update;

}

export const sendMessage = async (content: any, channelID: string) => {
    return await FETCH({
        method: 'POST',
        url: `/channels/${channelID}/messages`,
        body: content
    });
}

export const fetchMessage = async (channelID: string, messageID: string) => {

    const res = await FETCH({
        method: 'GET',
        url: `/channels/${channelID}/messages/${messageID}`
    });

    if (res.content) return res;
    else throw new DiscordTSError('API fetchMessage', `Invalid message ID ${messageID} in channel ID ${channelID}`);

}

export const deleteMessage = async (channelID: string, messageID: string) => {
    return await FETCH({
        url: `/channels/${channelID}/messages/${messageID}`,
        method: 'DELETE'
    })
}