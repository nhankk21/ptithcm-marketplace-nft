import { useState } from "react";
import { useTheme } from "@mui/material";
import toast from "react-hot-toast";

// INTERNAL
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { postNewCollection } from "../../services/collectionApi";
import uploadImage from "../../utils/uploadImage";
import { getUserCollection } from "../../models/user";

type Props = {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};
const useDeployCollectionForm = ({ openDrawer, setOpenDrawer }: Props) => {
    const theme = useTheme();
    const user = useAppSelector((state) => state.user);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<string>("art");

    const [sellerFeeBasisPoints, setSellerFeeBasisPoints] = useState<number>(0);
    const [primarySaleRecipient, setPrimarySaleRecipient] = useState(
        user.data?.address + ""
    );

    const [images, setImages] = useState<{ data_url: string; file: File }[]>(
        []
    );

    const toggleDrawer = (open: boolean) => {
        setOpenDrawer(open);
    };
    const handleChangeImage = (imageList: any) => {
        setImages(imageList);
    };

    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        const thumbnail = await uploadImage(images[0].file, "collections");
        if (user.data && thumbnail) {
            toast.promise(
                postNewCollection(
                    user.data.address,
                    name,
                    description,
                    category,
                    thumbnail,
                    sellerFeeBasisPoints
                ),
                {
                    loading: "Deploying...",
                    success: () => {
                        toggleDrawer(false);
                        dispatch(getUserCollection(user.data?.address!));
                        return "Deploy collection success!";
                    },
                    error: "Deploy collection failed!",
                }
            );
        }
    };

    return {
        name,
        theme,
        images,
        category,
        openDrawer,
        description,
        primarySaleRecipient,
        sellerFeeBasisPoints,
        setName,
        setImages,
        setCategory,
        toggleDrawer,
        handleSubmit,
        setOpenDrawer,
        setDescription,
        handleChangeImage,
        setPrimarySaleRecipient,
        setSellerFeeBasisPoints,
    };
};

export default useDeployCollectionForm;
