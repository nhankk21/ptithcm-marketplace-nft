import type { Nft, NftMetadata } from "../models/nft";
import axiosCLient from "../utils/axiosClient";

const ENDPOINT = "/nft/";
/**
 *
 * @param {string} address
 */
async function getNftByAddress(address: string) {
    const url = ENDPOINT + "information/" + address;
    try {
        const res = await axiosCLient.get(url);
        return res.data.nft as Nft;
    } catch (e: any) {
        throw new Error("Get collection failed!", e);
    }
}

/**
 *
 * @param {string} nftAddress
 * @param {string} ownerAddress
 */
async function toggleListNft(nftAddress: string, ownerAddress: string) {
    const url = ENDPOINT + "listing";
    try {
        await axiosCLient.put(
            url,
            {
                nft_address: nftAddress,
                owner_address: ownerAddress,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );
    } catch (e: any) {
        console.log("e", e);
        throw new Error("Get collection failed!", e);
    }
}

/**
 *
 * @param {NftMetadata} nft
 */
async function mintNft(nft: NftMetadata) {
    const url = ENDPOINT + "create";
    try {
        await axiosCLient.post(
            url,
            {
                ...nft,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );
    } catch (e: any) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
}

/**
 *
 * @param {string} buyer
 * @param {string} nftAddress
 * @param {string} seller
 */
const buyNft = async (buyer: string, nftAddress: string, seller: string) => {
    const url = ENDPOINT + "trade";
    try {
        await axiosCLient.post(url, {
            buyer,
            nft_address: nftAddress,
            seller,
        });
    } catch (e: any) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
};

/**
 * change price of nft
 * @param {string} nftAddress
 * @param {string} walletAddress
 * @param {number} price
 */
const changePriceNft = async (
    nftAddress: string,
    walletAddress: string,
    price: number
) => {
    const url = ENDPOINT + "update_price";
    try {
        await axiosCLient.put(
            url,
            {
                nft_address: nftAddress,
                wallet_address: walletAddress,
                price,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );
    } catch (e: any) {
        throw new Error(e);
    }
};

export { getNftByAddress, toggleListNft, mintNft, buyNft, changePriceNft };
