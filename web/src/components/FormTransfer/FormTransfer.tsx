import React from "react";
import {
    Box,
    Button,
    Container,
    Drawer,
    Divider,
    MenuItem,
    Stack,
    Select,
    Typography,
    TextField,
} from "@mui/material";

// INTERNAL
import useFormTransfer from "./useFormTransfer";

type Props = {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormTransfer = ({ openDrawer, setOpenDrawer }: Props) => {
    const {
        address,
        amount,
        theme,
        type,
        handleSubmit,
        setAmount,
        setType,
        toggleDrawer,
    } = useFormTransfer({
        setOpenDrawer,
    });
    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => toggleDrawer(false)}
        >
            <Container>
                <Box sx={{ maxWidth: "600px" }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        color={theme.palette.text.primary}
                        sx={{
                            mt: "16px",
                        }}
                    >
                        Transfer
                    </Typography>
                    <Divider />
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{
                            mt: "16px",
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Select
                                id="type"
                                label="Option"
                                value={type}
                                onChange={(e: any) => setType(e.target.value)}
                                style={{ width: "360px" }}
                            >
                                <MenuItem value={"Token"}>GOR Token</MenuItem>
                                <MenuItem value={"Fiat"}>USD Fiat</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Select
                                id="amount"
                                label="Amount"
                                value={amount}
                                onChange={(e: any) => setAmount(e.target.value)}
                                style={{ width: "360px" }}
                            >
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={200}>200</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                                <MenuItem value={1000}>1000</MenuItem>
                                <MenuItem value={5000}>5000</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                inputRef={address}
                                label="Address"
                                variant="outlined"
                                style={{ width: "360px" }}
                            />
                        </Box>
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenDrawer(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Confirm
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Drawer>
    );
};

export default FormTransfer;
