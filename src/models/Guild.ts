import { guldHashes } from '../types/models/guild.ts';
import { CACHE } from './Client.ts';
import { Channel } from './Channel.ts';
import { Collection } from "./Collection.ts";
import {Member} from "./Member.ts";

/**
 * Class representing Guild
 */
export class Guild {

    description: string | null
    guildHashes: guldHashes
    maxMembers: number
    publicUpdateChannelID: string | null
    voiceStates: any[]
    systemChannelFlag: number
    defaultMessageNotifications: string
    splash: any
    futures: any[]
    rulesChannelID: string | null
    afkTimeout: number | undefined |  null
    name: string
    premiumSubscriptions: number
    premiumTier: number
    mfaLevel: number
    discoverySplash: any
    unvailable: boolean
    explicitContentFilter: number
    ownerID: string
    banner: string
    afkChannelID: string | null
    applicationID: string  | null
    large: boolean
    memberCount: number
    joinedAt: string
    lazdy: boolean
    maxVideoChannelUsers: number
    icon: string | null
    threads: any[] // idk how threads model will works, future
    preferredLocale: string
    region: string
    id: string
    vanityUrlCode: any // idk
    presence: any[] // future
    systemChannelID: string
    verificatinLevel: number
    // me: Member model from Client

    /**
     * Create Guild model
     * @param {*} data
     */
    constructor (data: any) {

        this.mfaLevel = data.mfa_level;
        this.presence = data.presence;
        this.systemChannelID = data.system_channel_id;
        this.description = data.description;
        this.ownerID = data.owner_id;
        this.discoverySplash = data.discovery_splash;
        this.afkChannelID = data.afk_channel_id;
        this.unvailable = data.unvailable;
        this.systemChannelFlag = data.system_channel_flags;
        this.guildHashes = data.guild_hashes;
        this.futures = data.futures;
        this.voiceStates = data.voice_states;
        this.applicationID = data.application_id;
        this.rulesChannelID = data.rules_channel_id;
        this.premiumSubscriptions = data.premium_subscriptions_count;
        this.splash = data.splash;
        this.large = data.large;
        this.name = data.name;
        this.region = data.region;
        this.verificatinLevel = data.verificatin_level;
        this.banner = data.banner;
        this.maxMembers = data.max_members;
        this.memberCount = data.member_count;
        this.joinedAt = data.joined_at;
        this.afkTimeout = data.afk_timeout;
        this.lazdy = data.lazdy;
        this.publicUpdateChannelID = data.public_update_channel_id;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.explicitContentFilter = data.explicit_content_filter;
        this.icon = data.icon;
        this.premiumTier = data.premium_tier;
        this.preferredLocale = data.preferred_locale;
        this.id = data.id;
        this.vanityUrlCode = data.vanity_url_code;
        this.threads = data.threads;

        // this.channels = new Collection();
        // data.channels.forEach((e: any) => this.channels.set(`${e.id}`, new Channel(e, client)))
        // this.roles
        // this.members
        // this.emojis
    }

    // get members (): Member[] {
    //     return this.client._memebrs.getAll(this.id);
    // }
}

