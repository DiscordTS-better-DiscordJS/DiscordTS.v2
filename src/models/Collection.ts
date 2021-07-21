/**
 * Class representing Collection
 * @extends Map
 */
export class Collection<K, V> extends Map<K, V> {
    constructor() {
        super();
    }

    /**
     * Find key in Collection (map)
     * @param {Function} method - Method to test
     * @example collection.find(e => e.num == 10);
     */
    find (method: (key: K, value: V, collection: this) => boolean): V | any {
        for (let [k, v] of this) {
            if (method(k ,v, this)) return v;
         }
    }

    /**
     * Get one value from collection
     * @param {*} value
     */
    getOne (value: K): V | any {
        return this.get(value)
    }

}