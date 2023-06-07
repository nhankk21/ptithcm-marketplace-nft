// import { useContract } from "@thirdweb-dev/react";

// // INTERNAL
// import { useAppDispatch } from "hooks/useStoreHooks";
// import { createNewNftOfCollection } from "@/models/collection";
// import type { MintableNftMetadata } from "@/models/nft/typings";
// import toast from "react-hot-toast";

// type Props = {
//     data: MintableNftMetadata;
//     collectionAddress: string;
//     walletAddress: string;
// };

// const useHandleMintNft = (collectionAddress: string) => {
//     const dispatch: any = useAppDispatch();
//     const { contract } = useContract(collectionAddress, "nft-collection");
//     const handleMintNft = ({ data, walletAddress }: Props) => {
//         if (contract) {
//             dispatch(
//                 createNewNftOfCollection({ contract, walletAddress, data })
//             );
//         } else {
//             toast.error("This contract invalid to mint NFT!");
//         }
//     };

//     return handleMintNft;
// };

// export default useHandleMintNft;
export {};
