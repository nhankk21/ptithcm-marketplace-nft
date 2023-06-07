import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

// INTERNAL
import { Nft } from "../../models/nft/typings";
import CardNft from "../../components/CardNft";
import { useAppDispatch } from "../../hooks/useStoreHooks";

export type NFTCartProps = {
    nft: Nft;
    handleBuyNftInCollection: (nft: Nft) => void;
};

const CardNftActive = ({ nft, handleBuyNftInCollection }: NFTCartProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleNavigate = () => {
        dispatch({ type: "nfts/setNft", payload: nft });
        navigate(`/nft/${nft.address}`);
    };

    return (
        <CardNft
            nft={nft}
            action={
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    sx={{
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <Button
                        sx={{
                            width: "100%",
                            height: "100%",
                            minWidth: 0,
                            paddingLeft: 0,
                            paddingRight: 0,
                            overflow: "hidden",
                            borderRadius: 0,
                        }}
                        onClick={handleNavigate}
                    >
                        Detail
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            flex: "0 0 60px",
                            borderRadius: 0,
                            borderLeft: "1px solid #fff",
                            transition: "ease .5s",
                            "&:hover": {
                                flex: "1 0 100%",
                                borderLeft: "none",
                            },
                        }}
                        onClick={() => handleBuyNftInCollection(nft)}
                    >
                        Buy
                    </Button>
                </Stack>
            }
        />
    );
};

export default CardNftActive;
