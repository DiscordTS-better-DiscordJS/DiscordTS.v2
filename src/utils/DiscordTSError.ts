/**
 * Class representing DiscordTSError
 */
export class DiscordTSError extends Error {

    /**
     * Create Error
     * @param {string} errorName
     * @param {string} errorMessage
     */
    constructor (errorName: string, errorMessage: string) {
        super ();
        this.name = `${errorName} Error: `;
        this.message = errorMessage;

    }

}