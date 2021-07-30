import { Embed } from '../../models/Embed.ts';

export interface messageOptions {
    content?: string
    tts?: boolean
    embed?: Embed
}

export interface argsOptions {
    regexp?: RegExp
    prefix?: string
    includeCommandName?: boolean
}

export interface messageEdit {
    content: string
    embedes: Embed[]
    // flags
    // components: []
}