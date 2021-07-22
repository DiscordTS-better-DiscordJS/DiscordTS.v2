import { Client } from '../../models/Client.ts';
import { Message } from '../../models/Message.ts';

export type Events = {
    message (message: Message): void,
    ready (): void
}