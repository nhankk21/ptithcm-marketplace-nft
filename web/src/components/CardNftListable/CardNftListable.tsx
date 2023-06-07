import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import CardNft from "../../components/CardNft";
import { Nft } from "../../models/nft/typings";
import { readNftListDataByCollection } from "../../models/collection";
import { toggleListNft } from "../../services/nftsApi";
import { UserModel } from "../../models/user";
import { useAppDispatch } from "../../hooks/useStoreHooks";

type Props = {
    user: UserModel;
    nft: Nft;
};

const CardNftListable = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDetail = async (nft: Nft) => {
        dispatch({ type: "nfts/setNft", payload: nft });
        navigate(`/nft/${nft.address}`);
    };
    const handleSubmit = async () => {
        try {
            await toggleListNft(props.nft.address, props.user.data?.address!);
            dispatch(
                readNftListDataByCollection({
                    collection: props.nft.collection,
                })
            );
            toast.success("Nft listed!");
        } catch {
            toast.error("Nft list failed!");
        }
    };
    return (
        <CardNft
            nft={props.nft}
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
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            {props.nft.listed && "Cancel "}Listing
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You want to{" "}
                                {props.nft.listed ? "Cancel" : "List"} this NFT{" "}
                                {props.nft.listed ? "on" : "for"} sale!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose}>
                                No
                            </Button>
                            <Button variant="contained" onClick={handleSubmit}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
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
                        onClick={() => handleDetail(props.nft)}
                    >
                        Detail
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
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
                    >
                        {props.nft.listed ? "Cancel" : "List"}
                    </Button>
                </Stack>
            }
        />
    );
};

export default CardNftListable;
