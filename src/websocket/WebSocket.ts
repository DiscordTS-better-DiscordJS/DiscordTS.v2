import EventEmitter from 'https://deno.land/std@0.84.0/node/events.ts'
import { WebSocketClient, StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.2/mod.ts'

import { LINKS } from './links.ts'

/**
 * @name WebSocketManager - Class to manage discord ws
 */
export default class WebSocketManager extends EventEmitter {

    private readonly debugMode: boolean
    private token: string
    private isReconnect: boolean
    public socket: WebSocketClient
    private sequence: number
    private sessionID: number

    constructor(isReconnect: boolean, token: string) {
        super();
        this.debugMode = true;
        this.token = token;
        this.isReconnect = isReconnect;
        this.sequence = 0;
        this.sessionID = 0;
        this.socket = new StandardWebSocketClient(LINKS.GATEWAY);

        this.socket.on('open', () => {
            this.debugMode && console.log(`[WS]: WebSocket send 'OPEN'`);
        });

    }

}