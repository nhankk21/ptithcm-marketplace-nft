import { createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// INTERNAL
import reducers, { initialState } from "./reducers";
import { readCollectionData, readNftListDataByCollection } from "./actions";

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder
            .addCase(readCollectionData.pending, (state, _) => {
                state.pending = true;
            })
            .addCase(readCollectionData.fulfilled, (state, action) => {
                state.pending = false;
                state.data = { ...state.data, ...action.payload };
            })
            .addCase(readCollectionData.rejected, (state, _) => {
                state.pending = false;
                state.error = true;
            })
            .addCase(readNftListDataByCollection.pending, (state, _) => {
                state.pending = true;
            })
            .addCase(readNftListDataByCollection.fulfilled, (state, action) => {
                state.pending = false;
                if (action.payload.page === 1) {
                    state.nftList = action.payload.nftList || [];
                    return;
                }
                state.nftList.splice(
                    (action.payload.page - 1) * 4,
                    action.payload.nftList.length,
                    ...action.payload.nftList
                );
            })
            .addCase(readNftListDataByCollection.rejected, (state, _) => {
                state.pending = false;
                state.error = true;
            });
    },
});

export { readCollectionData, readNftListDataByCollection };
export * from "./typings";
export default collectionSlice.reducer;
