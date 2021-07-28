import { FETCH } from '../fetch.ts';

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
    else throw new Error(`[fetchMessage]: Invalid message ID ${messageID} in channel ID ${channelID}`);

}