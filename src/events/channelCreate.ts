import { Channel } from '../models/Channel.ts';
import { CACHE } from  '../models/Client.ts';

export const _ = async (data: any) => {
    const channel = new Channel(data);

    //TODO: dodawanie do cache

    return channel;
}