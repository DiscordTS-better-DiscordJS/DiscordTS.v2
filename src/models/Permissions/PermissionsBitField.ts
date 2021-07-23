import { BitFieldResolvable } from '../../types/permissions/permissions.ts';

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

    public static resolve (bit: BitFieldResolvable = 0, flags: any): number {
        if (typeof bit === 'string' && !isNaN(parseInt(bit))) return parseInt(bit);
        if (typeof bit === 'number' && bit >= 0) return bit;
        // if (bit instanceof PermissionsBitField) return this.bitfield;
        if (typeof bit === 'string' && typeof flags[bit] !== 'undefined') return flags[bit];
        else throw new Error('[PermissionsBitField]: Invalid BitField.');
    }

}