import { walletCol } from "../../database/mongodb.js";

export async function enrichCollectionData(collection) {
    let wallet;
    try {
        wallet = await walletCol.findOne({ address: collection.creator });
    } catch (err) {
        throw err;
    }
    collection.username = wallet.username;
    return collection;
}