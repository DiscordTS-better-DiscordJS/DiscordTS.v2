import { LINKS } from '../websocket/links.ts';

import * as message from './methods/message.ts';
import * as member from './methods/member.ts';

/**
 * Class representing Discord API utility
 */
export class Api {

    /**
     * @static URL - Discord API url ( v9 )
     * @type string
     */
    static URL: string = LINKS.API;

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

}

export const api = new Api();
