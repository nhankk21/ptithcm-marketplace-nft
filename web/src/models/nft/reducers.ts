// INTERNAL
import { Nft, NftModel } from "./typings";

export const initialState: NftModel = {
    data: null,
    pending: false,
    error: false,
};

const reducers = {
    setNft: (state: NftModel, action: { payload: Nft }) => {
        return { ...state, data: action.payload };
    },
};

export default reducers;
