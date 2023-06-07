import React from "react";
import {
    Grid,
    Stack,
    Skeleton,
    Typography,
    useTheme,
    Divider,
} from "@mui/material";

// INTERNAL
import { CollectionModel } from "../../../models/collection/typings";
import { Model } from "../../../models";
import { User } from "../../../models/user/typings";
import MintNftButton from "./MintNftButton";
import "../styles/CollectionOverview.scss";

type Props = {
    collection: CollectionModel;
    user: Model<User>;
    floorPrice: number;
};

const CollectionOverview = ({ collection, user, floorPrice }: Props) => {
    const theme = useTheme();
    return (
        <Grid container className="collection__overview" spacing={2}>
            <Grid item lg={2} md={3} xs={12} className="collection__img">
                <Stack
                    direction={{ xs: "row", md: "column" }}
                    spacing={1}
                    alignItems={{
                        xs: "flex-start",
                        md: "center",
                    }}
                    justifyContent={{
                        xs: "space-between",
                        md: "flex-start",
                    }}
                    sx={{ width: "100%", height: "fit-content" }}
                >
                    {collection.pending && !collection.data ? (
                        <Skeleton
                            variant="rectangular"
                            width={168}
                            height={168}
                        />
                    ) : (
                        <img
                            src={collection.data?.thumbnail + ""}
                            alt="collection image"
                            width={168}
                        />
                    )}
                    {user.data?.address === collection.data?.creator && (
                        <MintNftButton />
                    )}
                </Stack>
            </Grid>
            <Grid item lg={10} md={9} className="collection__info">
                {collection.pending && !collection.data ? (
                    <React.Fragment>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography
                            variant="h1"
                            component="h1"
                            className="collection__info--name"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                        >
                            {collection.data?.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="span"
                            className="collection__info--creator"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                        >
                            By{" "}
                            {collection.data?.username ||
                                collection.data?.creator}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            className="collection__info--description"
                            sx={{
                                color: theme.palette.text.primary,
                            }}
                        >
                            {collection.data?.description}
                        </Typography>
                        <Grid container className="collection__index">
                            {/* <Grid
                                item
                                md={3}
                                xs={6}
                                className="collection__index--volume"
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    6.05 GOR
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.palette.text.disabled,
                                    }}
                                >
                                    Total volume
                                </Typography>
                            </Grid> */}
                            <Grid
                                item
                                md={3}
                                xs={6}
                                className="collection__index--floor"
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {floorPrice.toString()} GOR
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.palette.text.disabled,
                                    }}
                                >
                                    Floor price
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={3}
                                xs={6}
                                className="collection__index--percent"
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {collection.data?.rate &&
                                        collection.data?.rate + " %"}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.palette.text.disabled,
                                    }}
                                >
                                    Creator earnings
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={3}
                                xs={6}
                                className="collection__index--category"
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {collection.data?.category || "Art"}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.palette.text.disabled,
                                    }}
                                >
                                    Category
                                </Typography>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )}

                <Divider light />
            </Grid>
        </Grid>
    );
};

export default CollectionOverview;
