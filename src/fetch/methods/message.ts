import { FETCH } from '../fetch.ts';

export const sendMessage = async (content: any, channelID: string) => {
    return await FETCH({
        method: 'POST',
        url: `/channels/${channelID}/messages`,
        body: content
    });
}