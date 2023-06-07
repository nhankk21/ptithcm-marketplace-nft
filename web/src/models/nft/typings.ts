import { Model } from "..";
interface NftAttributes {
    [x: string]: string;
}

interface NftMetadata {
    creator: string;
    collection: string;
    name: string;
    url: string;
    price: number;
    description: string;
    attributes: NftAttributes;
}

interface Nft extends NftMetadata {
    _id: string;
    address: string;
    owner: string;
    creator: string;
    created: number;
    updated: number;
    listed?: boolean;
}

interface NftModel extends Model<Nft> {}

export type { NftAttributes, NftMetadata, Nft, NftModel };
