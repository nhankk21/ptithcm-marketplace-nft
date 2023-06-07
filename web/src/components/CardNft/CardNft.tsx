import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Skeleton,
    Typography,
    useTheme,
} from "@mui/material";

// INTERNAL
import { Nft } from "../../models/nft/typings";
import { stringMinify } from "../../utils/stringMinify";
import "./CardNft.scss";

export type NFTCartProps = {
    nft: Nft;
    action?: JSX.Element;
};

const CardNft = ({ nft, action }: NFTCartProps) => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                maxWidth: 278,
                backgroundColor: theme.palette.background.paper,
                borderRadius: "8px",
            }}
            className="nft-list__card"
        >
            {!nft ? (
                <Skeleton variant="rectangular" width={278} height={278} />
            ) : (
                <CardMedia
                    sx={{
                        height: 278,
                        cursor: "pointer",
                        transition: "ease .5s",
                        "&:hover": {
                            transform: "scale(1.1) translateY(-4%) !important",
                        },
                    }}
                    image={
                        nft.url ||
                        "https://mekalegends.com/opensea/images/469.png"
                    }
                    title={nft.name}
                    className="nft-list__card--img"
                />
            )}
            {!nft ? (
                <Skeleton />
            ) : (
                <CardContent
                    sx={{
                        paddingBottom: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            fontSize: ".8rem",
                            fontWeight: 600,
                        }}
                    >
                        {stringMinify(nft.name)}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="p"
                        sx={{
                            fontSize: ".8rem",
                            fontWeight: 400,
                        }}
                    >
                        {nft.price} GOR
                    </Typography>
                </CardContent>
            )}
            {action && <CardActions sx={{ padding: 0 }}>{action}</CardActions>}
        </Card>
    );
};

export default CardNft;
