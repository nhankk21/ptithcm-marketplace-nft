import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

// INTERNAL
import { useAppDispatch, useAppSelector } from "../../../hooks/useStoreHooks";
import {
    readCollectionData,
    readNftListDataByCollection,
} from "../../../models/collection";
import { CollectionModel } from "../../../models/collection/typings";
import { Nft, buyNft } from "../../../models/nft";

const useCollection = () => {
    const param = useParams();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const collection: CollectionModel = useAppSelector(
        (state) => state.collection
    );

    const floorPrice = useMemo(() => {
        return collection.nftList
            ? collection.nftList.reduce(
                  (prev, cur) => Math.min(prev, cur.price),
                  Infinity
              )
            : 0;
    }, [collection.nftList]);

    useEffect(() => {
        param.address && dispatch(readCollectionData(param.address));
    }, [param.address]);

    useEffect(() => {
        param.address &&
            dispatch(
                readNftListDataByCollection({ collection: param.address })
            );
    }, [collection.data]);

    const handleBuyNftInCollection = (nft: Nft) => {
        if (!user.data) {
            toast.error("Please login before buy nft!");
            navigate("/login");
            return;
        }
        if (param.address) {
            dispatch(
                buyNft({
                    buyer: user.data.address,
                    nftAddress: nft.address,
                    seller: nft.owner,
                })
            );
            dispatch(
                readNftListDataByCollection({ collection: param.address })
            );
        } else {
            toast.error("You cannot buy this NFT!");
        }
    };

    return {
        user,
        theme,
        param,
        collection,
        floorPrice,
        openDrawer,
        setOpenDrawer,
        handleBuyNftInCollection,
    };
};

export default useCollection;
