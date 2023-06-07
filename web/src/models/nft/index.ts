import { createSlice } from "@reduxjs/toolkit";

// INTERNAL IMPORT
import reducers, { initialState } from "./reducers";
import {
    readNFTData,
    buyNft,
    toggleListingNft,
    changePriceNft,
} from "./actions";

const nftsSlice = createSlice({
    name: "nfts",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder
            .addCase(readNFTData.pending, (state, _) => {
                state.pending = true;
            })
            .addCase(readNFTData.fulfilled, (state, action) => {
                state.pending = false;
                state.data = action.payload;
            })
            .addCase(toggleListingNft.pending, (state, _) => {
                state.pending = true;
            })
            .addCase(toggleListingNft.fulfilled, (state, _) => {
                state.pending = false;
                state.data!["listed"] = !state.data!["listed"];
            })
            .addCase(changePriceNft.pending, (state, _) => {
                state.pending = true;
            })
            .addCase(changePriceNft.fulfilled, (state, action) => {
                state.pending = false;
                state.data!["price"] = action.payload;
            });
    },
});

export * from "./typings";
export { readNFTData, buyNft, toggleListingNft, changePriceNft };
export default nftsSlice.reducer;
