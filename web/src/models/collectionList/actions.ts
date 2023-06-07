import { createAsyncThunk } from "@reduxjs/toolkit";

// INTERNAL
import type { Collection } from "../../models/collection/typings";
import { getCollectionListByCategory } from "../../services/collectionApi";

type ReadCollectionListByCategoryPayload = {
    category: string;
    page?: number;
};
/**
 * @readCollectionListByCategory action get list of collection from service by category
 * @param {ReadCollectionListByCategoryPayload} payload
 * @return {Promise<{ category: string, data: Collection[], page: number }>}
 */
const readCollectionListByCategory = createAsyncThunk(
    "collectionList/readCollectionListByCategory",
    async ({
        category,
        page = 1,
    }: ReadCollectionListByCategoryPayload): Promise<{
        category: string;
        data: Collection[];
        page: number;
    }> => {
        const data = await getCollectionListByCategory(category, page);
        return { category, data, page };
    }
);

export { readCollectionListByCategory };
