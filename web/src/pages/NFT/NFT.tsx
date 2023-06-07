import React, { Fragment, useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Skeleton,
    Stack,
    Typography,
    Divider,
    Grid,
    useTheme,
    TextField,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

// INTERNAL
import useNFT from "./useNFT";
import "./NFT.scss";
import axiosCLient from "../../utils/axiosClient";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
const labels = Array.from({ length: 24 }, (_, index) => 24 - index);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom" as const,
        },
        title: {
            display: true,
            text: "NFT Price history",
        },
    },
};
type Props = {
    title: string;
    data: string;
};

const CardBox = (props: Props) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.paper,
                border: "1px solid",
                borderColor: theme.palette.primary.main,
                borderRadius: "8px",
                padding: "8px",
            }}
        >
            <Typography
                variant="h3"
                component="span"
                sx={{ color: theme.palette.text.secondary, fontSize: "14px" }}
            >
                {props.title}
            </Typography>
            <Typography
                variant="subtitle2"
                component="p"
                sx={{ color: theme.palette.text.primary, fontSize: "20px" }}
            >
                {props.data}
            </Typography>
        </Box>
    );
};

const NFT = () => {
    const {
        theme,
        nft,
        user,
        newPrice,
        setNewPrice,
        handleBuyNft,
        handleToggleListing,
        handleSetNewPrice,
    } = useNFT();

    const [history, setHistory] = useState([]);
    useEffect(() => {
        (async () => {
            if (nft.data) {
                const res = await axiosCLient.post("/price/nft", {
                    nft_address: nft.data.address,
                });

                setHistory(res.data);
            }
        })();
    }, [nft.data]);
    return (
        <Container className="nft">
            <Stack
                direction={{ sx: "column", md: "row" }}
                spacing={2}
                className="nft__wrapper"
            >
                <div className="nft__image">
                    {nft.pending ? (
                        <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={"100%"}
                        />
                    ) : (
                        <img src={nft.data?.url} alt="nft" />
                    )}
                </div>
                <div className="nft__detail">
                    <div className="nft__info">
                        {nft.pending ? (
                            <Skeleton variant="rectangular" width={"100%"} />
                        ) : (
                            <Fragment>
                                <Typography
                                    variant="h1"
                                    component="h1"
                                    sx={{ color: theme.palette.text.primary }}
                                >
                                    {nft.data?.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="h2"
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    Owner by<span> </span>
                                    <Typography
                                        variant="subtitle1"
                                        component="span"
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {nft.data?.owner}
                                    </Typography>
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{ color: theme.palette.text.primary }}
                                >
                                    {nft.data?.description.toString()}
                                </Typography>
                            </Fragment>
                        )}
                    </div>
                    <Box
                        className="nft__action"
                        sx={{ backgroundColor: theme.palette.background.paper }}
                    >
                        {nft.pending ? (
                            <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={"300px"}
                            />
                        ) : (
                            <Fragment>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: theme.palette.text.secondary }}
                                    className="nft__action--title"
                                >
                                    Current price
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "20px",
                                    }}
                                    className="nft__action--price"
                                >
                                    {user.data?.address! ===
                                    nft.data?.owner! ? (
                                        <TextField
                                            id="outlined-number"
                                            label="Price"
                                            type="number"
                                            value={newPrice}
                                            onChange={(e) => {
                                                setNewPrice(
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    ) : (
                                        nft.data?.price
                                    )}
                                    <p>GOR</p>
                                </Typography>
                                {user.data?.address! === nft.data?.owner! ? (
                                    <Stack
                                        direction="row"
                                        style={{ gap: "20px" }}
                                    >
                                        <Button
                                            variant="contained"
                                            size="large"
                                            className="nft__action--btn"
                                            onClick={handleToggleListing}
                                        >
                                            {nft.data?.listed && "Cancel"}{" "}
                                            Listing
                                        </Button>
                                        {nft.data?.price! != newPrice && (
                                            <Button
                                                variant="contained"
                                                size="large"
                                                className="nft__action--btn"
                                                onClick={handleSetNewPrice}
                                            >
                                                Set new Price
                                            </Button>
                                        )}
                                    </Stack>
                                ) : (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        className="nft__action--btn"
                                        onClick={() => handleBuyNft()}
                                    >
                                        <AccountBalanceWalletIcon />{" "}
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            sx={{
                                                color: theme.palette.text
                                                    .primary,
                                                marginLeft: 1,
                                            }}
                                        >
                                            Buy
                                        </Typography>
                                    </Button>
                                )}
                                <Divider />
                                <Grid
                                    container
                                    spacing={2}
                                    className="nft__properties"
                                >
                                    {nft.data?.attributes &&
                                        Object.keys(nft.data.attributes).map(
                                            (item) => (
                                                <Grid key={item} item xs={4}>
                                                    {nft.data && (
                                                        <CardBox
                                                            title={item}
                                                            data={
                                                                nft.data
                                                                    .attributes[
                                                                    item
                                                                ]
                                                            }
                                                        />
                                                    )}
                                                </Grid>
                                            )
                                        )}
                                    {history && (
                                        <Line
                                            options={options}
                                            data={{
                                                labels: labels.slice(
                                                    -history.slice(-24).length
                                                ),
                                                datasets: [
                                                    {
                                                        label: "Market trends",
                                                        data: history.slice(
                                                            -24
                                                        ),
                                                        borderColor:
                                                            "rgb(53, 162, 235)",
                                                        backgroundColor:
                                                            "rgba(53, 162, 235, 0.5)",
                                                    },
                                                ],
                                            }}
                                        />
                                    )}
                                </Grid>
                            </Fragment>
                        )}
                    </Box>
                </div>
            </Stack>
        </Container>
    );
};

export default NFT;
