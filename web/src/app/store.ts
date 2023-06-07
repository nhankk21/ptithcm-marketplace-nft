import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// INTERNAL
import collectionListReducers from "../models/collectionList";
import collectionReducers from "../models/collection";
import userReducer from "../models/user";
import nftReducer from "../models/nft";

const store = configureStore({
    reducer: {
        collectionList: collectionListReducers,
        collection: collectionReducers,
        nft: nftReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
