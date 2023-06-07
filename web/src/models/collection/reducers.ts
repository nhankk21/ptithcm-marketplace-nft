import { CollectionModel } from "./typings";

export const initialState: CollectionModel = {
    data: null,
    nftList: [],
    pending: false,
    error: false,
};

type TypeSetPriceNftPayload = {
    address: string;
    price: number;
};
const reducers = {
    setPriceNft: (
        state: CollectionModel,
        action: { payload: TypeSetPriceNftPayload }
    ) => {
        state.nftList[
            state.nftList.findIndex(
                (nft) => (nft.address = action.payload.address)
            )
        ].price = action.payload.price;
    },
};

export default reducers;
