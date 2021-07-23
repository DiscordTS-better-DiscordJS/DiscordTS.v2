import { BitFieldResolvable } from '../../types/permissions/permissions.ts';

export class PermissionsBitField {

    public flags: { [name: string]: number } = {}
    private temp: number
    public bitfield: number

    constructor (bit: number, flags: { [name: string]: number }) {

        this.temp = 0;
        this.flags = flags;
        this.bitfield = PermissionsBitField.resolve(bit, this.flags);

    }

    public hasByBit (bit: BitFieldResolvable, ...args: any[]): boolean {
        if (Array.isArray(bit)) return bit.every((p) => this.hasByBit(P));
        else return (this.bitfield & PermissionsBitField.resolve(bit, this.flags)) === bit;
    }

    public static resolve (bit: BitFieldResolvable = 0, flags: any): number {
        if (typeof bit === 'string' && !isNaN(parseInt(bit))) return parseInt(bit);
        if (typeof bit === 'number' && bit >= 0) return bit;
        if (bit instanceof PermissionsBitField) return this.bitfield;
        if (Array.isArray(bit)) return bit.map((p) => this.resolve((p, flags)).reduce((prev, p) => prev | p, 0));
        if (typeof bit === 'string' && typeof flags[bit] !== 'undefined') return flags[bit];
        else throw new Error('[PermissionsBitField]: Invalid BitField.');
    }

}