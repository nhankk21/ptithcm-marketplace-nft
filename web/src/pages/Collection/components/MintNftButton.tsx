import { Button } from "@mui/material";
import React, { useState } from "react";

// INTERNAL
import FormNftMint from "../../../components/FormNftMint";

const MintNftButton = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    return (
        <React.Fragment>
            <FormNftMint
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
            />
            <Button
                variant="contained"
                sx={{
                    width: "100%",
                }}
                onClick={() => setOpenDrawer(true)}
            >
                Mint
            </Button>
        </React.Fragment>
    );
};

export default MintNftButton;
