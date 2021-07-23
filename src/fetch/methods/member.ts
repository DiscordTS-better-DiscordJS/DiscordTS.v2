import { FETCH } from '../fetch.ts';

export const fetchMember = async (guildID: string, userID: string): Promise<any> => {

    const res = await FETCH({
        method: 'GET',
        url: `/guilds/${guildID}/members/${userID}`
    });

    if (res.user) return res;
    else throw new Error(`[fetchMember]: Invalid member ID ${userID} in guild id ${guildID}`);

}