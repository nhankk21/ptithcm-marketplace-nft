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
import useFormDeposit from "./useFormDeposit";

type Props = {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormDeposit = ({ openDrawer, setOpenDrawer }: Props) => {
    const { amount, theme, handleSubmit, toggleDrawer, setAmount } =
        useFormDeposit({ openDrawer, setOpenDrawer });

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
                        Deposit
                    </Typography>
                    <Divider />
                    <Stack
                        direction={"row"}
                        spacing={2}
                        sx={{
                            mt: "16px",
                        }}
                    >
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
                        <Button
                            variant="contained"
                            onClick={() => handleSubmit()}
                        >
                            Confirm
                        </Button>
                    </Stack>
                </FormControl>
            </Container>
        </Drawer>
    );
};

export default FormDeposit;
