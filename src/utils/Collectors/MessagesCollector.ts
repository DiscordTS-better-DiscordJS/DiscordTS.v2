import { EventName, Callback, Listener, MessagesCollectorEvents, MessageCollectorOptions } from '../../types/collectors/collectors.ts';
import { DiscordTSError } from '../DiscordTSError.ts';
import { Message } from '../../models/Message.ts';
import { COLLECTORS } from '../../models/Client.ts';

/**
 * Class representing MessagesCollector
 */
export class MessagesCollector <E extends MessagesCollectorEvents> {

    #cache: Map<keyof E, Set<Listener>> = new Map();

    public readonly channelID: string
    private readonly timeout: number
    private readonly max: number | undefined
    public filter: MessageCollectorOptions['filter']
    #count: number = 0;
    public readonly id: number;

    /**
     * Create MessagesCollector
     * @param {MessageCollectorOptions} options
     * @param {string} channelID
     */
    constructor (options: MessageCollectorOptions, channelID: string) {
        this.channelID = channelID;
        this.timeout = options.time;
        this.max = options.messagesCount;
        this.filter = options.filter;

        this.id = COLLECTORS.messages.array.filter(c => c.channelID == this.channelID).length + 1;

        this.setUp();

    }

    /**
     * Compare filter
     * @param {Message} m
     */
    public comapreFilter (m: Message): boolean {
        return this.filter(m);
    }

    /**
     * Check coutner
     * @private
     */
    private comapreCounter (): boolean {
        if (this.#count >= this.max) return true;
        else return false;
    }

    /**
     * Check counter and delete Collector from collection
     * @private
     */
    private checkAndDelete (): void {
        if (this.comapreCounter()) COLLECTORS.messages.find(c => c.id === this.id).delete();
    }

    /**
     * setUp collector in collection
     * @private
     */
    private setUp (): void {
        COLLECTORS.messages.set(this);
    }

    /**
     * Messages listener
     * @param {K} event
     * @param {E[K]} listener
     */
    public on <K extends keyof E> (event: K, listener: E[K]): this;
    public on (event: EventName, listener: Callback): this {
        if (!this.#cache.has(event)) this.#cache.set(event, new Set());
        this.#cache.get(event)!.add(listener);
        this.checkAndDelete();
        return this;
    }

    /**
     * Emitter
     * @param {K} event
     * @param {Promise<*>} args
     */
    public async emit <K extends keyof E> (event: K, ...args: Parameters<any>): Promise<this>;
    public async emit (event: EventName, ...args: Parameters<Callback>): Promise<this> {
        if (!this.#cache.has(event)) return this;
        const _ = this.#cache.get(event);
        for (let [, listener] of _!.entries()) {
            try {
                await listener(...args);
                if (listener.__once__) {
                    delete listener.__once__;
                    _!.delete(listener);
                }
            } catch (e) {
                throw new DiscordTSError('MessagesCollector', `${e}`);
            }
        }

        if (_!.size === 0) this.#cache.delete(event);
        return this;

    }

}