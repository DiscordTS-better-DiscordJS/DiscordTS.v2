class Options {
    token: string
    isBot?: boolean
    appID?: string
    constructor() {
        this.token = '';
        this.appID = '';
        this.isBot = true;
    }
}

const OPTIONS = new Options();

// imports
import EventEmitter from 'https://deno.land/std@0.84.0/node/events.ts';
import { WebSocketManager } from '../websocket/WebSocket.ts';
import { ClientOptions } from '../types/models/ClientTypes.ts';
import { EVENTS } from '../websocket/websocketEvents.ts';

/**
 * Class representing a Client.
 * @extends EventEmitter
 */
export class Client extends EventEmitter {

    ws!: WebSocketManager
    token!: string
    options: ClientOptions

    /**
     * Create a Client
     * @param {ClientOptions} options
     */
    constructor(options?: ClientOptions) {
        super();

        this.options = options;
        this.options.appID = options?.appID || '';
        this.options.bot = options.bot || true;

    }

    /**
     * Connect into discord gateway
     * @param {string} token
     */
    async connect (token: string) {
        this.token = token;
        OPTIONS.token = token;
        OPTIONS.isBot = this.options.bot;
        OPTIONS.appID = this.options.appID;
        try {
            this.ws = await new WebSocketManager(false, token);
            Object.values(EVENTS).forEach((event: any) => {
                this.ws.on(event, (...args) => this.emit(event, ...args));
            });
        } catch (e) {
            e && console.log(e);
        }
    }

}

export { OPTIONS }