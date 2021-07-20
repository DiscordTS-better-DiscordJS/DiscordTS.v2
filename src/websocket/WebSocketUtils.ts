import { heartBeat, identify } from './payloads.ts'
import { WebSocketClient } from 'https://deno.land/x/websocket@v0.1.2/mod.ts'

/**
 * Create heartbeat
 * @param {number} interval - Heart interval for Discord Gateway
 * @param {*} s - S from Discord gateway data
 * @param {*} d - D from Discord gateway data
 * @param {WebSocketClient} socket - WebSocket for Discord Gateway
 */
export const heartbeat = (interval: number, s: any, d: any, socket: WebSocketClient) => {
    return setInterval(() => {
        heartBeat.s = s;
        heartBeat.d = d;
        socket.send(JSON.stringify(heartBeat));
    }, interval);
}

/**
 * Identify to Discord gateway
 * @param {boolean} reconnect - Reconnecting?
 * @param {string} token - Client token
 * @param {WebSocketClient} socket - WebSocket for Discord Gateway
 * @param {number} session_id - ID of current session
 */
export const identifyClient = (reconnect: boolean, token: string, socket: WebSocketClient, session_id: number) => {
    switch (reconnect) {
        case true:
            socket.send(JSON.stringify({
                op: 6,
                d: {
                    token, session_id
                }
            }));
            break;
        case false:
            identify.d.token = token
            socket.send(JSON.stringify(JSON.stringify(identify)))
    }
}