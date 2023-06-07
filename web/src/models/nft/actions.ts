import { createAsyncThunk } from "@reduxjs/toolkit";

// INTERNAL
import {
    getNftByAddress,
    buyNft as buyNftService,
    changePriceNft as changePriceNftService,
    toggleListNft,
} from "../../services/nftsApi";
import { Nft } from "./typings";
import toast from "react-hot-toast";

const readNFTData = createAsyncThunk(
    "nft/readNFTData",
    async ({ address }: { address: string }) => {
        const nft: Nft = await getNftByAddress(address);
        return nft;
    }
);

type TypeBuyNft = {
    buyer: string;
    nftAddress: string;
    seller: string;
};
const buyNft = createAsyncThunk(
    "nft/buyNft",
    async ({ buyer, nftAddress, seller }: TypeBuyNft) => {
        toast.promise(buyNftService(buyer, nftAddress, seller), {
            loading: "Buying...",
            success: "Buy NFT success",
            error: "Buy NFT failed!",
        });
    }
);

const toggleListingNft = createAsyncThunk(
    "nft/toggleListingNft",
    async ({ address, owner }: { address: string; owner: string }) => {
        toast.promise(toggleListNft(address, owner), {
            loading: "Listing status changing...",
            success: () => {
                return "NFT listing status is changed!";
            },
            error: "Changed status NFT failed!",
        });
    }
);

const changePriceNft = createAsyncThunk(
    "nft/changePriceNft",
    async (
        {
            nftAddress,
            walletAddress,
            price,
        }: {
            nftAddress: string;
            walletAddress: string;
            price: number;
        },
        thunkApi
    ) => {
        toast.promise(changePriceNftService(nftAddress, walletAddress, price), {
            loading: "NFT's Price is changing...",
            success: "NFT's Price is changed!",
            error: "Changed Price NFT failed!",
        });
        thunkApi.dispatch({
            type: "collection/setPriceNft",
            payload: { address: nftAddress, price },
        });
        return price;
    }
);

export { readNFTData, buyNft, toggleListingNft, changePriceNft };
