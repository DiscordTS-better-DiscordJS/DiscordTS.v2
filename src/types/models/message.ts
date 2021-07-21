import { Embed } from '../../models/Embed.ts';

export interface messageOptions {
    content?: string
    tts?: boolean
    embed?: Embed
}