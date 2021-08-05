import { Message } from '../../models/Message.ts';

export type Events = {
    message (message: Message): void,
    ready (): void,
    messageUpdate (d: { oldMessage: Message, newMessage: Message }): void
    messageDelete (message: Message): void
}