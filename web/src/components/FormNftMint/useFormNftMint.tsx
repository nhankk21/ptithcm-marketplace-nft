import { useState } from "react";
import { useTheme } from "@mui/material";
import toast from "react-hot-toast";

// INTERNAL
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { NftMetadata } from "../../models/nft";
import { mintNft } from "../../services/nftsApi";
// import getBase64 from "../../utils/getBase64";
import uploadImage from "../../utils/uploadImage";
import { readNftListDataByCollection } from "../../models/collection";

type Props = {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const useMintNFTForm = ({ openDrawer, setOpenDrawer }: Props) => {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useAppDispatch();
    const collection = useAppSelector((state) => state.collection);
    const user = useAppSelector((state) => state.user);

    const [attributes, setAttributes] = useState<{
        [x: string]: string;
    }>({});
    const [atb, setAtb] = useState<{ key: string; value: string }>({
        key: "",
        value: "",
    });
    const [images, setImages] = useState<{ data_url: string; file: File }[]>(
        []
    );

    const toggleDrawer = (open: boolean) => {
        setOpenDrawer(open);
    };

    const handleChangeImage = (imageList: any) => {
        setImages(imageList);
    };

    const handleAddAtb = () => {
        if (atb.key !== "" && atb.value !== "") {
            setAttributes((prev) => ({ ...prev, [atb.key]: atb.value }));
            setAtb({
                key: "",
                value: "",
            });
        }
    };

    const handleRemoveAtb = (key: string) => {
        const newAtrs = { ...attributes };
        delete newAtrs[key];
        setAttributes(newAtrs);
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setImages([]);
        setAttributes({});
    };
    const handleMintNft = async (
        metadata: NftMetadata,
        collectionAddress: string
    ) => {
        toast.promise(mintNft(metadata), {
            loading: "Saving...",
            success: () => {
                dispatch(
                    readNftListDataByCollection({
                        collection: collectionAddress,
                    })
                );
                resetForm();
                return "Mint nft success!";
            },
            error: "Mint nft failed!",
        });
    };
    const handleSubmit = async () => {
        if (collection.data && user.data) {
            const metadata: NftMetadata = {
                creator: user.data?.address,
                collection: collection.data.address,
                name,
                url: await uploadImage(images[0].file, "nfts"),
                price: 10,
                description,
                attributes,
            };

            handleMintNft(metadata, collection.data.address);
        }
    };

    return {
        atb,
        name,
        theme,
        images,
        collection,
        openDrawer,
        attributes,
        description,
        setAtb,
        setName,
        handleAddAtb,
        handleMintNft,
        toggleDrawer,
        setAttributes,
        setDescription,
        handleRemoveAtb,
        handleChangeImage,
        handleSubmit,
    };
};

export default useMintNFTForm;
