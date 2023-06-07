import { Model } from "..";
import { Collection } from "../collection";

interface CollectionList {
    [x: string]: Collection[];
}

interface CollectionListModel extends Model<CollectionList> {
    data: CollectionList;
}

export type { CollectionList, CollectionListModel };
