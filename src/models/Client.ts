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

class Cache {
    public guilds!: Guilds
    public channels!: Channels
    public members!: Memebrs
    public users!: Users
    public roles!: Roles
    get totalCount (): { channels: number, guilds: number, members: number, users: number } {
        return {
            channels: this.channels.size, guilds: this.guilds.size, members: this.members.size,
            users: this.users.size
        }
    }
}

const OPTIONS = new Options();
const CACHE = new Cache();

import { EventsEmitter } from '../utils/EventsEmitter.ts';
import { WebSocketManager } from '../websocket/WebSocket.ts';
import { ClientOptions } from '../types/models/ClientTypes.ts';
import { EVENTS } from '../websocket/websocketEvents.ts';
import { Events } from '../types/eventemitter/Events.ts'
import { Guilds } from '../cache/guilds.ts';
import { Channels } from '../cache/channels.ts';
import { Memebrs } from '../cache/members.ts';
import { Users } from '../cache/users.ts';
import { User } from './User.ts';
import { Roles } from '../cache/roles.ts';

/**
 * Class representing a Client.
 * @extends EventsEmitter
 */
class Client extends EventsEmitter<Events> {

    public ws!: WebSocketManager
    private token!: string
    public options: ClientOptions
    public ready: boolean
    public ping: number
    public user!: User

    /**
     * Create a Client
     * @param {ClientOptions} options
     */
    constructor(options?: ClientOptions) {
        super();

        this.options = { bot: options?.bot || true };
        this.options.appID = options?.appID || '';

        CACHE.guilds = new Guilds();
        CACHE.channels = new Channels();
        CACHE.members = new Memebrs();
        CACHE.users = new Users();
        CACHE.roles = new Roles();

        this.ready = false;
        this.ping = 0;

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
                this.ws.on(event, (...args) => {
                    if (event == 'ready' && !this.ready) {
                        this.ready = true;
                        this.emit(event, ...args)
                    }
                    else if (event == 'ready' && this.ready) return;
                    else this.emit(event, ...args)
                });
            });
        } catch (e) {
            e && console.log(e);
        }
    }

    /**
     * Get client process memory usage
     */
    get memoryUsage (): number {
        return parseFloat(((Deno.memoryUsage().rss) / 1024 / 1024).toFixed(2));
    }

    get versions (): { deno: string, typescript: string, DiscordTS: string, v8: string } {
        const v = Deno.version;
        return {
            deno: v.deno, typescript: v.typescript, v8: v.v8, DiscordTS: 'Alpha-0.0.1'
        }
    }

}

export { OPTIONS, Client, CACHE }