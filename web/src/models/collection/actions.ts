import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCollectionMetadata,
    getNftListByCollection,
} from "../../services/collectionApi";
import { Collection } from "./typings";

// // INTERNAL
// import {
//     getCollectionMetadata,
//     getNftActiveListByContract,
//     getNftListOfCollection,
// } from "@/services/collectionApi";
// import { postNewNft, putDirectListing } from "@/services/nftsApi";
// import type { Collection } from "./typings";
// import type { MintableNftMetadata } from "@/models/nft/typings";

/**
 * @param {string} address
 */
const readCollectionData = createAsyncThunk(
    "collection/readCollectionData",
    async (address: string) => {
        const data: Collection = await getCollectionMetadata(address);
        return data;
    }
);

const readNftListDataByCollection = createAsyncThunk(
    "collection/readNftListDataByCollection",
    async ({ collection, page = 1 }: { collection: string; page?: number }) => {
        const nftList = await getNftListByCollection(collection, page);
        return { nftList, page };
    }
);

export { readCollectionData, readNftListDataByCollection };
