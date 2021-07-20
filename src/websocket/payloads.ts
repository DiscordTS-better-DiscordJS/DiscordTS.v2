import { OPCODES } from './opcodes.ts'

export const heartBeat = {
    op: OPCODES.HEARTBEAT,
    d: null,
    s: 0,
    t: 'GATEWAY_EVENT_NAME'
}

export const identify = {
    op: OPCODES.IDENTIFY,
    d: {
        token: '',
        intents: 513,
        properties: {
            $os: 'linux',
            $browser: 'DiscordTS',
            $device: 'DiscordTS'
        }
    }
}