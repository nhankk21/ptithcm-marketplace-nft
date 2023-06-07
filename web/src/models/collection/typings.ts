import { Model } from "..";
import { Nft } from "../nft";
// import { User } from "../user";

interface Collection {
    _id: string;
    title: string;
    address: string;
    creator: string;
    rate: number;
    category?: string;
    thumbnail?: string;
    description?: string;
    txn_history?: any;
    username?: string;
    created: number;
    updated: number;
}

interface CollectionModel extends Model<Collection> {
    nftList: Nft[];
}

export type { Collection, CollectionModel };
