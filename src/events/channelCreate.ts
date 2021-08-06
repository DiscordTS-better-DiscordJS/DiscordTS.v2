import { Channel } from '../models/Channel.ts';
import { CACHE } from  '../models/Client.ts';

export const _ = async (data: any) => {

    CACHE.channels.add = { id: data.id, data };
    return new Channel(data);
}