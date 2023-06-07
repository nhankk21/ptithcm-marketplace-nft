import React from "react";
import ImageUploading from "react-images-uploading";
import {
    Drawer,
    Container,
    FormControl,
    Typography,
    Divider,
    Stack,
    Box,
    Button,
    TextField,
    MenuItem,
    Select,
} from "@mui/material";

// INTERNAL
import useDeployCollectionForm from "./useFormDeployCollection";

type Props = {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeployCollectionForm = ({ openDrawer, setOpenDrawer }: Props) => {
    const {
        name,
        theme,
        images,
        category,
        description,
        primarySaleRecipient,
        sellerFeeBasisPoints,
        setName,
        setCategory,
        toggleDrawer,
        handleSubmit,
        setDescription,
        handleChangeImage,
        setPrimarySaleRecipient,
        setSellerFeeBasisPoints,
    } = useDeployCollectionForm({ openDrawer, setOpenDrawer });

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
                        NFT Collection
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="span"
                        color={theme.palette.text.secondary}
                    >
                        ERC721 mintable NFTs
                    </Typography>
                    <Divider />
                    <Typography
                        variant="h3"
                        component="h3"
                        color={theme.palette.text.primary}
                        sx={{
                            mt: "16px",
                        }}
                    >
                        Contract Metadata
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="span"
                        color={theme.palette.text.secondary}
                    >
                        Settings to organize and distinguish between your
                        different contracts.
                    </Typography>
                    <Stack
                        direction={"row"}
                        spacing={2}
                        sx={{
                            mt: "16px",
                        }}
                    >
                        <Box
                            width={"150px"}
                            height={"150px"}
                            sx={{
                                bgcolor: theme.palette.background.paper,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "12px",
                            }}
                        >
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={handleChangeImage}
                                maxNumber={1}
                                dataURLKey="data_url"
                            >
                                {({ onImageUpload, onImageUpdate }) => {
                                    return !images.length ? (
                                        <Button
                                            variant="text"
                                            onClick={onImageUpload}
                                        >
                                            Upload
                                        </Button>
                                    ) : (
                                        <a
                                            onClick={() => onImageUpdate(0)}
                                            style={{
                                                width: "150px",
                                                transform: "translateY(4px)",
                                                borderRadius: "12px",
                                            }}
                                        >
                                            <img
                                                src={images[0]["data_url"]}
                                                alt=""
                                                width={"100%"}
                                                style={{
                                                    borderRadius: "12px",
                                                }}
                                            />
                                        </a>
                                    );
                                }}
                            </ImageUploading>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                id="collection-name"
                                label="Name"
                                variant="outlined"
                                value={name}
                                helperText={false}
                                onChange={(e) => setName(e.target.value)}
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    width: "100%",
                                }}
                            />
                            <TextField
                                id="collection-description"
                                label="Description"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    width: "100%",
                                    mt: "16px",
                                }}
                            />
                        </Box>
                    </Stack>
                    <Divider
                        sx={{
                            mt: "16px",
                        }}
                    />
                    <Typography
                        variant="h3"
                        component="h3"
                        color={theme.palette.text.primary}
                        sx={{
                            mt: "16px",
                        }}
                    >
                        Payout Settings
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        color={theme.palette.text.secondary}
                    >
                        Determine the address that should receive the revenue
                        from royalties earned from secondary sales of the
                        assets.
                    </Typography>
                    <TextField
                        required
                        id="recipient-address"
                        label="Recipient Address"
                        defaultValue="Hello World"
                        variant="outlined"
                        value={primarySaleRecipient}
                        onChange={(e) =>
                            setPrimarySaleRecipient(e.target.value)
                        }
                        sx={{
                            mt: "16px",
                        }}
                    />
                    <br />
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <TextField
                            required
                            id="recipient-percent"
                            label="Percentage"
                            type="number"
                            variant="outlined"
                            value={sellerFeeBasisPoints}
                            onChange={(e) =>
                                setSellerFeeBasisPoints(
                                    parseFloat(e.target.value)
                                )
                            }
                            sx={{ flex: 1 }}
                        />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                            sx={{ flex: 1 }}
                        >
                            <MenuItem value={"art"}>Art</MenuItem>
                            <MenuItem value={"game"}>Game</MenuItem>
                            <MenuItem value={"memberships"}>
                                Membership
                            </MenuItem>
                            <MenuItem value={"photography"}>
                                Photography
                            </MenuItem>
                        </Select>
                    </Stack>
                    <br />
                    <Button variant="contained" onClick={() => handleSubmit()}>
                        Deploy
                    </Button>
                </FormControl>
            </Container>
        </Drawer>
    );
};

export default DeployCollectionForm;
