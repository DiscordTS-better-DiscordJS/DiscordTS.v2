import { guldHashes } from '../types/models/guild.ts';
import { CACHE, OPTIONS } from './Client.ts';
import { Channel } from './Channel.ts';
import { Collection } from "./Collection.ts";
import { Member } from "./Member.ts";

import api from '../fetch/Api.ts';

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
    vanityUrlCode: string | null // idk
    presence: any[] // future
    systemChannelID: string
    verificatinLevel: number

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

        this.fetchMember(OPTIONS.clientID);

    }

    /**
     * Get Collection of guild members
     * @return {Collection<string, Member>} Collection of guild members
     */
    // get members (): Collection<string, Member> {
    //     const members = new Collection<string, Member>();
    //     CACHE.members.array.forEach((m: any) => members.set((m.id as string), new Member(m, this.id)));
    //     return members;
    // }

    /**
     * Get Collection of guild channels
     * @return {Collection<string, Channel>} Collection of guild channels
     */
    get channels (): Collection<string, Channel> {
        const channels = new Collection<string, Channel>();
        CACHE.channels.array.filter((c: any) => c.guildID == this.id).forEach((ch: any) => channels.set(ch.id, new Channel(ch)));
        return channels;
    }

    /**
     * Fetch Guild Member
     * @param {string} ID User ID
     */
    async fetchMember(ID: string) {
        if (CACHE.members.has(this.id, ID)) return CACHE.members.getOne(this.id, ID);
        else {
            const m = await CACHE.members.fetchAPI(this.id, ID);
            if (m) {
                return CACHE.members.getOne(this.id, ID);
            } else throw new Error(`[Guild Model Error]: ${m}`)
        }
    }

    /**
     * Get Client Guild Member
     * @return {Member} - Client Member
     */
    get me (): Member {
        return CACHE.members.getOne(this.id, OPTIONS.clientID);
    }

    /**
     * Change client guild member nickname
     * @param {string} newNickname - New nickname
     * @return {Promise<boolean>} Returns true when success.
     */
    async setClientNick (newNickname: string): Promise<boolean> {
        if (this.me.permissions.has('CHANGE_NICKNAME')) {
            await api.member.modifyCurrentUserNick(this.id, newNickname);
            return true;
        } else return false;

    }

    /**
     * Clear (set) client guild member nickname to client user username
     * @return {Promise<boolean>>} Returns true when success
     */
    async clearClientNick (): Promise<boolean> {
        if (this.me.permissions.has('CHANGE_NICKNAME')) {
            await api.member.modifyCurrentUserNick(this.id, this.me.user.username);
            return true;
        } else return false;
    }


}

