import { Model } from "..";
import { Collection } from "../collection";
import { Nft } from "../nft";

interface User {
    address: string;
    jwt: string;
    username: string;
    fiat_balance: number;
    token_balance: number;
    password?: string;
    avatar?: string;
    private_key?: string;
}

interface UserModel extends Model<User> {
    collected: Nft[];
    created: Collection[];
}

export type { User, UserModel };
