import { EventEmitter } from 'https://deno.land/x/event@2.0.0/mod.ts';
import { WebSocketClient, StandardWebSocketClient } from 'https://deno.land/x/websocket@v0.1.2/mod.ts';

import { LINKS } from './links.ts';
import { OPCODES } from "./opcodes.ts";
import { EVENTS as e } from "./websocketEvents.ts";
import { heartBeat, identify } from "./payloads.ts";
import * as events from '../events/export.ts';
import { Packet } from '../types/websocket/packet.ts';
const EVENTS: any = e;

import { Client } from '../models/Client.ts';
import { Guild } from '../models/Guild.ts';

/**
 * @name WebSocketManager - Class to manage discord ws
 */
export class WebSocketManager extends EventEmitter<any> {

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
     * @param {Client} client - Client
     */
    constructor(isReconnect: boolean, token: string, client: Client) {
        super();
        this.debugMode = false;
        this.token = token;
        this.isReconnect = isReconnect;
        this.sequence = 0;
        this.sessionID = 0;
        this.socket = new StandardWebSocketClient(LINKS.GATEWAY);

        this.socket.on('open', () => {
            this.debugMode && console.log(`[WS]: WebSocket send 'OPEN'`);
        });

        this.socket.on('message', async (incoming: any) => {
            const packet: Packet = JSON.parse(incoming.data);
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
                            new WebSocketManager(false, this.token, client);
                        });

                        this.socket.on('error', (e: any) => {
                            this.debugMode && console.log(`[WS ERROR]: ${e}`)
                        });

                        this.identifyClient(this.token);

                    break;

                case OPCODES.HEARTBEAT_ACK:

                        this.debugMode && console.log('heartbeat_act')

                    break;

            }

            this.debugMode && console.log(packet);
            this.emit('raw', packet);
            this.module(EVENTS[t], d, client).then(() => {})

            switch (t) {

                case 'READY':
                        this.debugMode && console.log('[WS]: Connected to gateway!');
                        this.emit('ready');
                        // there create new User object as client ( when client and user model was done )
                    break;

                case 'GUILD_CREATE':
                        client.guilds.add = new Guild(d, client);
                        d.channels.forEach((c: any) => client.channels.add = c);
                    break;

            }

        });

    }


    private async module (name: string, d: any, client: Client) {
        if (events && (events as any)[name]) {
            const res = await (events as any)[name](d, client);
            if (typeof res !== 'undefined') this.emit(name, res);
            else return;
        }
    }

    /**
     * Creates heatbeat.
     * @param {number} interval - Heart interval from Discord gateway.
     * @param {*} s - S from Discord gateway.
     * @param {*} d - D from Discord gateway.
     */
    heartbeat (interval: number, s: any, d: any) {
        this.heart = setInterval(() => {
            heartBeat.s = s;
            heartBeat.d = d;
            this.socket?.send(JSON.stringify(heartBeat));
        }, interval);
    }

    /**
     * Identify to Discord gateway.
     * @param {string} token - Bot's token.
     */
    identifyClient (token: string) {
        switch (this.isReconnect) {
            case true:
                    this.socket?.send(JSON.stringify({
                        op: 6,
                        d: {
                            token: token,
                            session_id: this.sessionID
                        }
                    }));
                break;

            case false:
                identify.d.token = token;
                    this.socket?.send(JSON.stringify(identify));
                break;
        }
    }

}