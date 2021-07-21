import { OPTIONS } from '../models/Client.ts';
import { LINKS } from '../websocket/links.ts';
import { FetchInterface } from '../types/fetch/fetch.ts'

const API = LINKS.API;

export const FETCH = async (data: FetchInterface): Promise<any> => {

    const token = OPTIONS.isBot ? `Bot ${OPTIONS.token}` : OPTIONS.token;
    const HEADER = {
        'Authorization': token,
        'Content-Type': data.ContentType ? `${data.ContentType}` : 'application/json'
    }
    
    const res = await fetch(`${API}${data.url}`, {
        method: data.method,
        headers: HEADER,
        body: JSON.stringify(data.body)
    });

    try {
        const json = await res.json();
        return json;
    } catch (e) {
        console.log(`[DiscordTS sender API ERROR]: ${e}`);
    }

}