import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

// INTERNAL
import "./CardCollection.scss";
import { Collection } from "../../models/collection/typings";
import { stringMinify } from "../../utils/stringMinify";

type CardCollectionProps = {
    collection: Collection;
};
const CardCollection = ({ collection }: CardCollectionProps) => {
    const theme = useTheme();

    return (
        <Link to={`/collection/${collection.address}`}>
            <Card
                sx={{
                    maxWidth: 345,
                    backgroundColor: theme.palette.background.paper,
                    margin: { md: 0, xs: "auto" },
                }}
                className="collection-card"
            >
                <CardMedia
                    sx={{
                        height: 236,
                        transition: "ease .5s",
                        "&:hover": {
                            transform: "scale(1.1) translateY(-4%) !important",
                        },
                    }}
                    component="img"
                    loading="lazy"
                    image={
                        collection.thumbnail ||
                        "https://i.seadn.io/gcs/files/7d3fbe390f32f32d7dd63132ca390f61.jpg?auto=format&h=500"
                    }
                    title={collection.title}
                    className="collection-card__img"
                />
                <CardContent className="collection-card--content">
                    <Typography gutterBottom variant="h5" component="div">
                        {stringMinify(collection.title, 28)}
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <div>
                            {/* {collection.floor ? (
                                <React.Fragment>
                                    <Typography variant="body1" component="h4">
                                        Floor
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="p"
                                    >
                                        {collection.floor} GOR
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <></>
                            )} */}
                        </div>
                        <div>
                            {/* {collection.volume ? (
                                <React.Fragment>
                                    <Typography variant="body1" component="h4">
                                        Total Volume
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="p"
                                    >
                                        {collection.volume} GOR
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <></>
                            )} */}
                        </div>
                    </Stack>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CardCollection;
