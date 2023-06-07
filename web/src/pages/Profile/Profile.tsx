/* eslint-disable camelcase */
import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import RemoveIcon from "@mui/icons-material/Remove";
import toast from "react-hot-toast";

// INTERNAL
import bg from "../../assets/images/bg.jpg";
import CardCollection from "../../components/CardCollection";
import CardNft from "../../components/CardNft";
import FormDeployCollection from "../../components/FormDeployCollection";
import FormDeposit from "../../components/FormDeposit";
import FormExchange from "../../components/FormExchange/FormExchange";
import FormTransfer from "../../components/FormTransfer/FormTransfer";
import { Nft } from "../../models/nft/typings";
import useProfile from "./useProfile";
import "./Profile.scss";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, theme } = useProfile();
    const [openFormDeployCollection, setOpenFormDeployCollection] =
        useState<boolean>(false);
    const [openFormDeposit, setOpenFormDeposit] = useState<boolean>(false);
    const [openFormExchange, setOpenFormExchange] = useState<boolean>(false);
    const [openFormTransfer, setOpenFormTransfer] = useState<boolean>(false);

    return (
        <Container className="profile">
            <FormDeployCollection
                openDrawer={openFormDeployCollection}
                setOpenDrawer={setOpenFormDeployCollection}
            />
            <FormDeposit
                openDrawer={openFormDeposit}
                setOpenDrawer={setOpenFormDeposit}
            />
            <FormExchange
                openDrawer={openFormExchange}
                setOpenDrawer={setOpenFormExchange}
            />
            <FormTransfer
                openDrawer={openFormTransfer}
                setOpenDrawer={setOpenFormTransfer}
            />

            <section className="profile-images">
                <div className="profile-images__background">
                    <img src={bg} alt="background" />
                </div>
                <Avatar
                    alt="Remy Sharp"
                    src={user.data?.avatar}
                    className="profile-images__avatar"
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        width: 150,
                        height: 150,
                    }}
                />
            </section>

            <section className="profile-info">
                <Box>
                    <Typography
                        variant="h1"
                        component="h1"
                        className="profile-info__name"
                        sx={{ color: theme.palette.text.primary }}
                    >
                        {user.data?.username}
                    </Typography>
                    <br />
                    <Link to="/change-password">
                        <Button>Change password</Button>
                    </Link>
                    <br />
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            variant="subtitle1"
                            component="span"
                            className="profile-info__address"
                            sx={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            {user.data?.address}{" "}
                            {user.data && (
                                <IconButton
                                    color="primary"
                                    aria-label="copy to clipboard"
                                    component="label"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            user.data?.address + ""
                                        );
                                        toast.success(
                                            "The wallet address is copied to your clipboard!"
                                        );
                                    }}
                                >
                                    <ContentCopyIcon />
                                </IconButton>
                            )}
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                            style={{ height: "fit-content" }}
                            onClick={() => setOpenFormDeposit(true)}
                        >
                            <AddIcon />
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                            style={{ height: "fit-content" }}
                        >
                            <RemoveIcon />
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<CurrencyExchangeIcon />}
                            style={{ height: "fit-content" }}
                            onClick={() => setOpenFormExchange(true)}
                        >
                            Exchange
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<MoveUpIcon />}
                            style={{ height: "fit-content" }}
                            onClick={() => setOpenFormTransfer(true)}
                        >
                            Transfer
                        </Button>
                    </Stack>
                </Box>
                <Grid container spacing={2} className="nft__properties">
                    <Grid item xs={3}>
                        <Stack
                            direction="column"
                            className="profile-info__detail"
                        >
                            <Tooltip title={user.data?.token_balance!}>
                                <span
                                    className="profile-info__detail--index"
                                    style={{
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {Math.round(
                                        user.data?.token_balance! * 100
                                    ) / 100}{" "}
                                    GOR
                                </span>
                            </Tooltip>
                            <h2
                                className="profile-info__detail--script"
                                style={{ color: theme.palette.text.secondary }}
                            >
                                Token
                            </h2>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack
                            direction="column"
                            className="profile-info__detail"
                        >
                            <Tooltip title={user.data?.fiat_balance!}>
                                <span
                                    className="profile-info__detail--index"
                                    style={{
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {Math.round(
                                        user.data?.fiat_balance! * 100
                                    ) / 100}{" "}
                                    USD
                                </span>
                            </Tooltip>
                            <h2
                                className="profile-info__detail--script"
                                style={{ color: theme.palette.text.secondary }}
                            >
                                Fiat
                            </h2>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack
                            direction="column"
                            className="profile-info__detail"
                        >
                            <span
                                className="profile-info__detail--index"
                                style={{ color: theme.palette.text.primary }}
                            >
                                {user.created.length}
                            </span>
                            <h2
                                className="profile-info__detail--script"
                                style={{ color: theme.palette.text.secondary }}
                            >
                                Collections
                            </h2>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack
                            direction="column"
                            className="profile-info__detail"
                        >
                            <span
                                className="profile-info__detail--index"
                                style={{ color: theme.palette.text.primary }}
                            >
                                {user.collected.length}
                            </span>
                            <h2
                                className="profile-info__detail--script"
                                style={{ color: theme.palette.text.secondary }}
                            >
                                NFTs
                            </h2>
                        </Stack>
                    </Grid>
                </Grid>
            </section>

            <section className="profile-created">
                <Grid container spacing={3}>
                    <Grid item sm={12}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography
                                variant="h3"
                                component="h3"
                                sx={{ color: theme.palette.text.primary }}
                                className="profile-created__title"
                            >
                                Created
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() =>
                                    setOpenFormDeployCollection(true)
                                }
                            >
                                Deploy new
                            </Button>
                        </Stack>
                    </Grid>
                    {user.created.map((item) => (
                        <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            key={item._id}
                            className="profile-created__item"
                        >
                            <CardCollection collection={item} />
                        </Grid>
                    ))}
                </Grid>
            </section>

            <section className="profile-collected">
                <Grid container spacing={3}>
                    <Grid item sm={12}>
                        <Typography
                            variant="h3"
                            component="h3"
                            sx={{ color: theme.palette.text.primary }}
                            className="profile-collected__title"
                        >
                            Collected
                        </Typography>
                    </Grid>
                    {user.collected.map((nft: Nft) => (
                        <Grid item lg={3} md={4} sm={6} key={nft.address}>
                            <CardNft nft={nft} />
                        </Grid>
                    ))}
                </Grid>
            </section>
        </Container>
    );
};

export default Profile;
