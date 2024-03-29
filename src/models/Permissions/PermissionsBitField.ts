import { BitFieldResolvable } from '../../types/permissions/permissions.ts';
import { DiscordTSError } from '../../utils/DiscordTSError.ts';

export class PermissionsBitField {

    public flags: { [name: string]: number } = {}
    private temp: number
    public bitfield: number

    constructor (bit: number, flags: { [name: string]: number }) {

        this.temp = 0;
        this.flags = flags;
        this.bitfield = 0;
        this.bitfield = PermissionsBitField.resolve(bit, this.flags);

    }

    public hasByBit (bit: BitFieldResolvable): boolean {
        if (Array.isArray(bit)) return bit.every((p) => this.hasByBit(p));
        else return (this.bitfield & PermissionsBitField.resolve(bit, this.flags)) === bit;
    }

    /**
     * Resolve bitfield to number form
     * @param {BitFieldResolvable} bit bits to resolve
     * @param {*} flags flags
     */
    public static resolve (bit: BitFieldResolvable, flags: any): number {
        if (typeof bit === 'string' && !isNaN(parseInt(bit))) return parseInt(bit);
        if (typeof bit === 'number' && bit >= 0) return bit;
        // if (bit instanceof PermissionsBitField) return this.bitfield;
        if (Array.isArray(bit)) return bit.map(p => this.resolve(p, flags)).reduce((prev, p) => prev | p, 0);
        if (typeof bit === 'string' && typeof flags[bit] !== 'undefined') return flags[bit];
        else throw new DiscordTSError('PermissionsBitField', 'Invalid BitField.');
    }

}