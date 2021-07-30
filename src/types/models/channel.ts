export const CHANNEL_TYPES = {
    0: 'GUILD_TEXT',
    1: 'DM',
    2: 'GUILD_VOICE',
    3: 'GROUP_DM',
    4: 'GUILD_CATEGORY',
    5: 'GUILD_NEWS',
    6: 'GUILD_STORE'
}

export enum ChannelTypesEnum {
    'GUILD_TEXT' = 0,
    'DM' = 1,
    'GUILD_VOICE' = 2,
    'GROUP_DM' = 3,
    'GUILD_CATEGORY' = 4,
    'GUILD_NEWS' = 5,
    'GUILD_STORE' = 6
}

export interface channelEdit {
    name: string
    type: 'Text' | 'News' | string
    postions: number
    topic: string
    nsfw: boolean
    cooldown: number
    voiceChannelUsersLimit: number
    parentID: string
    rtcRegion: string
    channelVideoQuality: number
    defaultAutoArchiveThreadDuration: number
}