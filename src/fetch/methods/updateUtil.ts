import { FETCH } from '../fetch.ts';
import { DiscordTSError } from '../../utils/DiscordTSError.ts';
import { UpdateUtilConstructor } from '../../types/fetch/updateUtil.ts';

/**
 * Class representing utility for updating member / channel / message / role / guild etc
 */
export class UpdateUtil {

    public url: string = '';
    public method: string = '';
    #data: any = {};

    /**
     * Create util
     * @param {UpdateUtilConstructor} d - Input data
     */
    constructor (d: UpdateUtilConstructor) {
        this.url = d.url;
        this.method = d.method || 'PATCH';
    }

    /**
     * Set data
     * @param {*} input - Set data object that be sended into api
     */
    public data (input: any) {
        this.#data = input;
    }

    /**
     * Send request into API
     */
    async send (): Promise<boolean | any> {
        try {
            const res = await FETCH({
                url: this.url, method: this.method,
                body: this.#data
            });

            if (res.error) return false;
            else return res;

        } catch (e) {
            throw new DiscordTSError (`${this.url}`, `${e}`);
        }
    }

}