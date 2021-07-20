import EventEmitter from 'https://deno.land/std@0.84.0/node/events.ts';
import { WebSocketClient, StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.2/mod.ts';
import { identifyClient, heartbeat } from './WebSocketUtils';

import { LINKS } from './links.ts';
import { OPCODES } from "./opcodes.ts";
import { EVENTS } from "./websocketEvents.ts";

/**
 * @name WebSocketManager - Class to manage discord ws
 */
export default class WebSocketManager extends EventEmitter {

    private readonly debugMode: boolean
    private readonly token: string
    private isReconnect: boolean
    public socket: WebSocketClient
    private sequence: number
    private sessionID: number
    private heart

    /**
     * Create WebSocket Manager
     * @param {boolean} isReconnect - Reconnecting to gateway?
     * @param {string} token - Client token.
     */
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

        this.socket.on('message', async (incoming: any) => {
            const pakcet = JSON.parse(incoming.data);
            const { op, s, t, d } = pakcet;

            s ? this.sequence = s : 0;

            switch (op) {

                case OPCODES.INVALID_SESSION:
                        throw new Error('[WS]: OPCODE 9, Gateway invalid session.');

                case OPCODES.HELLO:

                        this.debugMode && console.log(`[WS]: WebSocket send 'HELLO'`);
                        this.debugMode && console.log(pakcet);

                        this.heart = heartbeat(d.heartbeat_interval, s, d);

                        this.socket.on('close', () => {
                            clearInterval(this.heart);
                            new WebSocketManager(false, this.token);
                        })

                        this.socket.on('error', (e: any) => {
                            this.debugMode && console.log(`[WS ERROR]: ${e}`)
                        })

                        identifyClient(this.isReconnect, this.tokn, this.socket, this.sessionID)

                    break;

            }

            this.debugMode && console.log(packet);
            this.emit('raw', packet);
            // this.module(EVENTS[t], d)

            switch (t) {

                case 'READY':
                        this.debugMode && console.log('[WS]: Connected to gateway!');
                        this.emit('ready');
                        // there create new User object as client ( when client and user model was done )
                    break;

                case 'GUILD_CREATE':
                        // there add guild into data when guild and client model was done
                    break;

            }

        });

    }


    // some idea for future

    // private async module (name: string, d: any) {
    //     if (events && (events as any)[name]) {
    //         const res = await (events as any)[name](d, this.client)
    //         this.emit(name, res)
    //     }
    // }

}