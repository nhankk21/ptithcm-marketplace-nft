import React from "react";
import {
    Box,
    Button,
    Container,
    Drawer,
    FormControl,
    Divider,
    MenuItem,
    Stack,
    Select,
    Typography,
} from "@mui/material";

// INTERNAL
import useFormExchange from "./useFormExchange";

type Props = {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormExchange = ({ openDrawer, setOpenDrawer }: Props) => {
    const {
        amount,
        theme,
        type,
        handleSubmit,
        setAmount,
        setType,
        toggleDrawer,
    } = useFormExchange({ setOpenDrawer });
    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => toggleDrawer(false)}
        >
            <Container>
                <FormControl sx={{ maxWidth: "600px" }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        color={theme.palette.text.primary}
                        sx={{
                            mt: "16px",
                        }}
                    >
                        Exchange
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
                                <MenuItem value={"Token"}>
                                    USD - GOR Token
                                </MenuItem>
                                <MenuItem value={"Fiat"}>
                                    GOR - USD Fiat
                                </MenuItem>
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
                </FormControl>
            </Container>
        </Drawer>
    );
};

export default FormExchange;
