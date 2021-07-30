import { FETCH } from '../fetch.ts';
import { DiscordTSError } from '../../utils/DiscordTSError.ts';

export const fetchMember = async (guildID: string, userID: string): Promise<any> => {

    const res = await FETCH({
        method: 'GET',
        url: `/guilds/${guildID}/members/${userID}`
    });

    if (res.user) return res;
    else throw new DiscordTSError('API fetchMember', `Invalid member ID ${userID} in guild id ${guildID}`);

}

export const modifyCurrentUserNick = async (guildID: string, newNickname: string) => {

    return await FETCH({
        url: `/guilds/${guildID}/members/@me/nick`,
        method: 'PATCH',
        body: {
            nick: newNickname
        }
    });

}