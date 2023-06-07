// import { useEffect, useState } from "react";
// import { useTheme } from "@mui/material";
// import { useContract, useMintNFT } from "@thirdweb-dev/react";
// import toast from "react-hot-toast";

// // INTERNAL
// import useHandleMintNft from "./useHandleMintNft";
// import { useAppSelector } from "hooks/useStoreHooks";

// type Props = {
//     openDrawer: boolean;
//     setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const useMintNFTForm = ({ openDrawer, setOpenDrawer }: Props) => {
//     const theme = useTheme();
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const user = useAppSelector((state) => state.user);
//     const collection = useAppSelector((state) => state.collection);
//     const handleMintNft = useHandleMintNft(
//         collection.data?.contractAddress + ""
//     );
//     const [attributes, setAttributes] = useState<{ [x: string]: unknown }[]>(
//         []
//     );
//     const [atb, setAtb] = useState<{ [x: string]: unknown }>({
//         trait_type: "",
//         value: "",
//     });
//     const [images, setImages] = useState<{ data_url: string; file: File }[]>(
//         []
//     );

//     const { contract } = useContract(collection.data?.contractAddress);
//     const {
//         mutate: mintNft,
//         isLoading,
//         isSuccess,
//         error,
//     } = useMintNFT(contract);

//     useEffect(() => {
//         if (error) {
//             toast.error("Mint Failed!", { duration: 1500 });
//         }
//         if (isLoading && !error) {
//             toast.loading("Minting...", { duration: 1500 });
//         }
//         if (isSuccess) {
//             toast.success("Minting Success!", { duration: 1500 });
//             resetForm();
//         }
//     }, [error, isLoading, isSuccess]);

//     const toggleDrawer = (open: boolean) => {
//         setOpenDrawer(open);
//     };

//     const handleChangeImage = (imageList: any) => {
//         setImages(imageList);
//     };

//     const handleAddAtb = () => {
//         if (atb.trait_type !== "" && atb.value !== "") {
//             setAttributes((prev) => [...prev, atb]);
//             setAtb({
//                 trait_type: "",
//                 value: "",
//             });
//         }
//     };

//     const handleRemoveAtb = (index: number) => {
//         setAttributes((prev) => prev.filter((_item, i) => index !== i));
//     };

//     const resetForm = () => {
//         setName("");
//         setDescription("");
//         setImages([]);
//         setAttributes([]);
//     };

//     const handleSubmit = async () => {
//         try {
//             if (user.data && collection.data) {
//                 mintNft({
//                     metadata: {
//                         name: name,
//                         description: description,
//                         image: images[0].file, // Accepts any URL or File type
//                         attributes,
//                     },
//                     to: user.data.address, // Use useAddress hook to get current wallet address
//                 });
//             }
//         } catch (e) {
//             toast.error("Submit failed!");
//         }
//     };

//     return {
//         atb,
//         name,
//         theme,
//         images,
//         collection,
//         openDrawer,
//         attributes,
//         description,
//         setAtb,
//         setName,
//         handleAddAtb,
//         handleMintNft,
//         handleSubmit,
//         toggleDrawer,
//         setAttributes,
//         setDescription,
//         handleRemoveAtb,
//         handleChangeImage,
//     };
// };

// export default useMintNFTForm;
export {};
