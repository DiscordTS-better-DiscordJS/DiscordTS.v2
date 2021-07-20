import EventEmitter from 'https://deno.land/std@0.84.0/node/events.ts';
import { WebSocketClient, StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.2/mod.ts';

import { LINKS } from './links.ts';
import { OPCODES } from "./opcodes.ts";
import { EVENTS } from "./websocketEvents.ts";
import {heartBeat, identify} from "./payloads.ts";

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
    private heart: any

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
            const packet = JSON.parse(incoming.data);
            const { op, s, t, d } = packet;

            s ? this.sequence = s : 0;

            switch (op) {

                case OPCODES.INVALID_SESSION:
                        throw new Error('[WS]: OPCODE 9, Gateway invalid session.');

                case OPCODES.HELLO:

                        this.debugMode && console.log(`[WS]: WebSocket send 'HELLO'`);
                        this.debugMode && console.log(packet);

                        this.heartbeat(d.heartbeat_interval, s, d);

                        this.socket.on('close', () => {
                            clearInterval(this.heart);
                            new WebSocketManager(false, this.token);
                        });

                        this.socket.on('error', (e: any) => {
                            this.debugMode && console.log(`[WS ERROR]: ${e}`)
                        });

                        this.identifyClient(this.token);

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

    /**
     * Creates heatbeat.
     * @param {number} interval - Heart interval from Discord gateway.
     * @param {*} s - S from Discord gateway.
     * @param {*} d - D from Discord gateway.
     */
    heartbeat (interval: number, s: any, d: any): void {
        this.heart = setInterval(() => {
            heartBeat.s = s;
            heartBeat.d = d;
            this.socket.send(JSON.stringify(heartBeat));
        })
    }

    /**
     * Identify to Discord gateway.
     * @param {string} token - Bot's token.
     */
    identifyClient (token: string) {
        switch (this.isReconnect) {
            case true:
                    this.socket.send(JSON.stringify({
                        op: 6, d: {
                            token, session_id: this.sessionID
                        }
                    }));
                break;
            case false:
                    identify.d.token = token;
                    this.socket.send(JSON.stringify(identify));
                break;
        }
    }

}

new WebSocketManager(false, 'NjcxNzk3NjA4NzUwMjUyMDQw.XjCKRw.-6e4D666d8W3wJnFzcGVIMu1s4o');