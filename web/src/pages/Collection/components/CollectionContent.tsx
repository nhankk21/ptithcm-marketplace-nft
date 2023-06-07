import React from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// INTERNAL
import "../styles/CollectionContent.scss";
import CardNft from "../../../components/CardNft";
import CardNftActive from "../../../components/CardNftActive/CardNftActive";
import CardNftListable from "../../../components/CardNftListable";
import { CollectionModel } from "../../../models/collection/typings";
import { UserModel } from "../../../models/user/typings";
import type { Nft } from "../../../models/nft/typings";
import { useAppDispatch } from "../../../hooks/useStoreHooks";
import { readNftListDataByCollection } from "../../../models/collection";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: "top" as const,
//         },
//         title: {
//             display: true,
//             text: "Chart.js Line Chart",
//         },
//     },
// };

type Props = {
    param: any;
    user: UserModel;
    collection: CollectionModel;
    handleBuyNft: (nft: Nft) => void;
};

const CollectionContent = ({
    param,
    user,
    collection,
    handleBuyNft,
}: Props) => {
    const lastpage =
        collection.nftList.length < 4 || collection.nftList.length % 4 !== 0;
    const dispatch = useAppDispatch();
    const handleLoadmore = () => {
        collection.data &&
            dispatch(
                readNftListDataByCollection({
                    collection: collection.data.address,
                    page: Math.floor(collection.nftList.length / 4) + 1,
                })
            );
    };
    return (
        <div className="collection__content">
            {/* <Line options={options} data={data} />; */}
            <Grid container spacing={3} className="">
                {collection.nftList?.map((nft: Nft, index) => (
                    <Grid item lg={3} md={4} xs={6} key={nft._id || index}>
                        {nft.owner === user.data?.address ? (
                            <CardNftListable nft={nft} user={user} />
                        ) : nft.listed ? (
                            <CardNftActive
                                nft={nft}
                                handleBuyNftInCollection={handleBuyNft}
                            />
                        ) : (
                            <CardNft nft={nft} />
                        )}
                    </Grid>
                ))}
            </Grid>
            {!lastpage && (
                <Button onClick={handleLoadmore} disabled={collection.pending}>
                    Load more
                </Button>
            )}
            {collection.pending && <CircularProgress />}
        </div>
    );
};

export default CollectionContent;
