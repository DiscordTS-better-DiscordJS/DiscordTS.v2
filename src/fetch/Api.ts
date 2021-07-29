import { UpdateUtilConstructor } from '../types/fetch/updateUtil.ts';
import { LINKS } from '../websocket/links.ts';
import { UpdateUtil } from './methods/updateUtil.ts';
import { FETCH } from './fetch.ts';
import { FetchInterface } from '../types/fetch/fetch.ts';

import * as message from './methods/message.ts';
import * as member from './methods/member.ts';
import * as channel from './methods/channel.ts';

/**
 * Class representing Discord API utility
 */
export class Api {

    /**
     * @static URL - Discord API url ( v9 )
     * @type string
     */
    static URL: string = LINKS.API;

    async fetchBase (data: FetchInterface): Promise<any> {
        return await FETCH(data);
    }

    /**
     * Get message methods
     */
    get message () {
        return message;
    }

    /**
     * Get member methods
     */
    get member () {
        return member;
    }

    /**
     * Get channel methods
     */
    get channels () {
        return channel;
    }

    /**
     * Update utility
     */
    async _update (options: UpdateUtilConstructor, data: any): Promise<boolean | any> {
        const u = new UpdateUtil(options)
        u.data(data);
        return u.send();
    }

}

export const api = new Api();
