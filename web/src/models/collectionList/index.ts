import { createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// INTERNAL
import reducers, { initialState } from "./reducers";
import { readCollectionListByCategory } from "./actions";

const collectionListSlice = createSlice({
    name: "collectionList",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder
            .addCase(readCollectionListByCategory.pending, (state, _) => {
                state.pending = true;
            })
            .addCase(
                readCollectionListByCategory.fulfilled,
                (state, action) => {
                    state.pending = false;
                    if (action.payload.page === 1) {
                        state.data[action.payload.category] =
                            action.payload.data || [];
                        return;
                    }
                    state.data[action.payload.category].splice(
                        (action.payload.page - 1) * 4,
                        action.payload.data.length,
                        ...action.payload.data
                    );
                    // state.data[action.payload.category] = action.payload.data;
                }
            )
            .addCase(readCollectionListByCategory.rejected, (state, _) => {
                state.error = true;
            });
    },
});

export { readCollectionListByCategory };
export * from "./typings";
export default collectionListSlice.reducer;
