class Options {
    token: string
    isBot?: boolean
    appID?: string
    clientID!: string
    constructor() {
        this.token = '';
        this.clientID = '';
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
    public messages!: Messages
    get totalCount (): { channels: number, guilds: number, members: number, users: number, roles: number, messages: number } {
        return {
            channels: this.channels.size, guilds: this.guilds.size, members: this.members.totalSize,
            users: this.users.size, roles: this.roles.totalSize, messages: this.messages.totalSize
        }
    }
}

class Collectors {
    public messages!: Collection<string, MessagesCollector<MessagesCollectorEvents>>
}

const OPTIONS = new Options();
const CACHE = new Cache();
const COLLECTORS = new Collectors();

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
import { Messages } from '../cache/messages.ts';
import { MessagesCollector } from '../utils/Collectors/MessagesCollector.ts';
import { MessagesCollectorEvents } from '../types/collectors/collectors.ts';
import { version, DiscordTSError, Collection } from '../../mod.ts';

/**
 * Class representing a Client.
 * @extends EventsEmitter
 */
class Client extends EventsEmitter<Events> {

    public ws!: WebSocketManager
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
        CACHE.messages = new Messages();

        COLLECTORS.messages = new Collection();

        this.ready = false;
        this.ping = 0;

    }

    /**
     * Connect into discord gateway
     * @param {string} token
     */
    async connect (token: string) {
        if (!token) throw new DiscordTSError('connect', 'Token required');
        OPTIONS.token = token;
        OPTIONS.isBot = this.options.bot;
        OPTIONS.appID = this.options.appID;
        try {
            try {
                this.ws = await new WebSocketManager(false, token, this);
            } catch (er) {
                throw new DiscordTSError('connect', `${er}`)
            }

            Object.values(EVENTS).forEach((event: any) => {
                this.ws.on(event, (...args) => {
                    if (event == 'ready' && !this.ready) {
                        this.ready = true;
                        this.emit(event, ...args);
                    }
                    else if (event == 'ready' && this.ready) return;
                    else this.emit(event, ...args);
                });
            });
        } catch (e) {
            e && console.log(e);
        }
    }

    /**
     * Get client process memory usage
     * @returns {number}
     */
    get memoryUsage (): number {
        return parseFloat(((Deno.memoryUsage().rss) / 1024 / 1024).toFixed(2));
    }

    get versions (): { deno: string, typescript: string, DiscordTS: string, v8: string } {
        const v = Deno.version;
        return {
            deno: v.deno, typescript: v.typescript, v8: v.v8, DiscordTS: version
        }
    }

}

export { OPTIONS, Client, CACHE, COLLECTORS }