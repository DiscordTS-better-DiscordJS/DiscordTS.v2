const EPOCH = 1420070400000;

/**
 * Class representing Snowflake utils
 */
export class Snowflake {

    get epoch (): number {
        return EPOCH;
    }

    constructor() {}

    /**
     * Deocde snowflake
     * @param snowflake
     */
    decode (snowflake: string): {
        timestamp: number, workerID: number, processID: number, increment: number, binary: string, createdAt: Date
    } {
        const bin = this.convertToBinary(snowflake);
        return {
            timestamp: (parseInt(bin.slice(0, 42), 2) + this.epoch),
            workerID: parseInt(bin.slice(42, 47), 2),
            processID: parseInt(bin.slice(47, 52), 2),
            increment: parseInt(bin.slice(52, 64), 2),
            binary: bin,
            createdAt: new Date((parseInt(bin.slice(0, 42), 2) + this.epoch))
        }

    }


    /**
     * Convert ID into binary
     * @param {number} x - id
     */
    private convertToBinary (x: any): string {
        return parseInt(x).toString(2).padStart(64, "0");
    }

}