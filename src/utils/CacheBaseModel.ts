import { Collection } from '../models/Collection.ts';

interface addData {
    id: any
    data: any
}

export class CacheBaseModel<indexType, valueType> {

    public collection: Collection<indexType, valueType>

    constructor() {
        this.collection = new Collection();
    }

    set add (data: addData) {
        this.collection.set(data.id, data.data);
    }

    get array (): valueType[] {
        return this.collection.array;
    }

}