import EventEmitter from 'https://deno.land/std@0.84.0/node/events.ts'
import WebSocket from 'https://deno.land/x/websocket@v0.0.6/mod.ts'

import { LINKS } from './links.ts'

/**
 * @name WebSocketManager - Class to manage discord ws
 */
export default class WebSocketManager extends EventEmitter {

    private debugMode: boolean
    private token: string
    private isReconnect: boolean
    public socket: WebSocket
    private sequence: number
    private sessionID: number

    constructor(isReconnect: boolean, token: string) {
        super();
        this.debugMode = true;
        this.token = token;
        this.isReconnect = isReconnect;
        this.sequence = 0;
        this.sessionID = 0;
        this.socket = new WebSocket(LINKS.GATEWAY);

        this.socket?.addEventListener('open', () => {
            this.debugMode && console.log(`[WS]: WebSocket send 'OPEN'`);
        });

    }

}