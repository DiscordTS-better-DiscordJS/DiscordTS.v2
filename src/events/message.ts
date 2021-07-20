import { Message } from '../models/Message.ts';
import { Client } from  '../models/Client.ts';

export const _ = async (data: any, client: Client) => {

    const message = new Message(data, client);

    return message;

}