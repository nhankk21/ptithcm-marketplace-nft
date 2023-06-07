import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

// INTERNAL
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { NftModel } from "../../models/nft/typings";
import {
    buyNft,
    changePriceNft,
    readNFTData,
    toggleListingNft,
} from "../../models/nft";

/**
 * implement logic and handle every side-effect of the component here
 * @return {any}
 */
export default function useNFT() {
    const { address } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const nft: NftModel = useAppSelector((state) => state.nft);
    const user = useAppSelector((state) => state.user);

    const [newPrice, setNewPrice] = useState(nft.data ? nft.data.price : 0);

    const handleBuyNft = () => {
        if (address && nft.data && user.data) {
            dispatch(
                buyNft({
                    buyer: user.data.address,
                    nftAddress: address,
                    seller: nft.data.owner,
                })
            );
            navigate(-1);
        } else {
            toast.error("You cannot buy this NFT!");
        }
    };

    const handleToggleListing = () => {
        if (nft.data && user.data) {
            dispatch(
                toggleListingNft({
                    address: nft.data.address,
                    owner: nft.data.owner,
                })
            );
        }
    };

    const handleSetNewPrice = () => {
        if (nft.data && nft.data.price != newPrice) {
            dispatch(
                changePriceNft({
                    nftAddress: nft.data.address,
                    walletAddress: nft.data.owner,
                    price: newPrice,
                })
            );
        }
    };

    useEffect(() => {
        if (address && !nft.data) {
            dispatch(readNFTData({ address }));
        }
    }, [address]);

    return {
        theme,
        nft,
        user,
        newPrice,
        setNewPrice,
        handleBuyNft,
        handleToggleListing,
        handleSetNewPrice,
    };
}
