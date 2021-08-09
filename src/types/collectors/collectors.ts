import { Message } from "../../models/Message.ts";

export type Callback = (...args: any[]) => any | Promise<any>;
export type Listener = Callback & { __once__? :true };
export type EventName =  'collect' | 'stop';

export type MessagesCollectorEvents = {
    collect (message: Message): void
    stop (): void
}

export interface MessageCollectorOptions {
    filter: (message: Message) => boolean
    time: number
    messagesCount?: number
}