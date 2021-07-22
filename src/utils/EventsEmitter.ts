import { Events } from '../types/eventemitter/Events.ts';
import {
    Callback, EventName, Listener
} from '../types/eventemitter/types.ts';

export class EventsEmitter <E extends Events> {

    private cache: Map<keyof E, Set<Listener>> = new Map();

    public on <K extends keyof E> (event: K, listener: E[K]): this;
    public on (event: EventName, listener: Callback): this {
        if (!this.cache.has(event)) this.cache.set(event, new Set());
        this.cache.get(event)!.add(listener);
        return this;
    }

    public async emit <K extends keyof E> (event: K, ...args: Parameters<any>): Promise<this>;
    public async emit (event: EventName, ...args: Parameters<Callback>): Promise<this> {
        if (!this.cache.has(event)) return this;
        const _ = this.cache.get(event);
        for (let [, listener] of _!.entries()) {
            try {
                await listener(...args);
                if (listener.__once__) {
                    delete listener.__once__;
                    _!.delete(listener);
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (_!.size === 0) this.cache.delete(event);
        return this;
    }

}