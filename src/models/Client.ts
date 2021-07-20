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
import { EventEmitter } from 'https://deno.land/x/event@2.0.0/mod.ts'
import { WebSocketManager } from '../websocket/WebSocket.ts';
import { ClientOptions } from '../types/models/ClientTypes.ts';
import { EVENTS } from '../websocket/websocketEvents.ts';
import { Events } from '../types/eventemitter/Events.ts'

/**
 * Class representing a Client.
 * @extends EventEmitter
 */
export class Client extends EventEmitter<Events> {

    ws!: WebSocketManager
    token!: string
    options: ClientOptions

    /**
     * Create a Client
     * @param {ClientOptions} options
     */
    constructor(options?: ClientOptions) {
        super();

        this.options = { bot: options?.bot || true };
        this.options.appID = options?.appID || '';
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
            this.ws = await new WebSocketManager(false, token, this);
            Object.values(EVENTS).forEach((event: any) => {
                this.ws.on(event, (...args) => this.emit(event, ...args));
            });
        } catch (e) {
            e && console.log(e);
        }
    }

}

export { OPTIONS }