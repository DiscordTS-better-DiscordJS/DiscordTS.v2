import { eventsInterface } from './events.ts'

export interface Packet {
    op: number
    d: any
    t: string | any
    s: any
}