import { CACHE } from '../../models/Client.ts';
import { UpdateUtil } from './updateUtil.ts'
import { DiscordTSError } from '../../utils/DiscordTSError.ts';
import { FETCH } from '../fetch.ts';

export const modifyChannel = async (channelID: string, updateData: any) => {

    if (!CACHE.channels.collection.get(channelID)) throw new DiscordTSError('modifyChannel', `Invalid channel id ${channelID}.`);

    const util = new UpdateUtil({ url: `/channels/${channelID}` });
    util.data(updateData);

    const update = await util.send();

    if (!update) return false;
    else return update;

}

export const deleteChannel = async (channelID: string) => {
    return await FETCH({
        url: `/channels/${channelID}`,
        method: 'DELETE'
    })
};