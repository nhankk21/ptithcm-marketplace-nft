import React from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    FormControl,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import ImageUploading from "react-images-uploading";

// // INTERNAL
import useFormNftMint from "./useFormNftMint";

type Props = {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormNftMint = (props: Props) => {
    const {
        atb,
        name,
        theme,
        images,
        collection,
        openDrawer,
        attributes,
        description,
        setAtb,
        setName,
        handleSubmit,
        handleAddAtb,
        toggleDrawer,
        setDescription,
        handleRemoveAtb,
        handleChangeImage,
    } = useFormNftMint(props);
    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => toggleDrawer(false)}
        >
            <Container sx={{ height: "100%" }}>
                <FormControl
                    sx={{
                        maxWidth: "600px",
                        height: "100%",
                        position: "relative",
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h2"
                        color={theme.palette.text.primary}
                        sx={{
                            mt: "16px",
                        }}
                    >
                        Mint NFT
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="span"
                        color={theme.palette.text.secondary}
                    >
                        Metadata
                    </Typography>
                    <Divider />
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
                                label="Name"
                                variant="outlined"
                                value={name}
                                helperText={false}
                                onChange={(e) => setName(e.target.value)}
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: "8px",
                                    width: "100%",
                                }}
                            />
                            <TextField
                                label="Description"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    width: "100%",
                                    borderRadius: "8px",
                                    mt: "16px",
                                }}
                            />
                        </Box>
                    </Stack>
                    <Stack
                        direction={"row"}
                        alignItems="flex-start"
                        justifyContent="space-between"
                        sx={{
                            mt: "16px",
                        }}
                    >
                        <Typography
                            variant="h3"
                            color={theme.palette.text.primary}
                        >
                            Properties
                        </Typography>
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleAddAtb}
                        >
                            Add row
                        </Button>
                    </Stack>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mt: "8px",
                        }}
                    >
                        <Grid item xs={6}>
                            <TextField
                                label="Attribute"
                                variant="outlined"
                                value={atb.key}
                                helperText={false}
                                onChange={(e) =>
                                    setAtb((prev) => ({
                                        key: e.target.value,
                                        value: prev.value,
                                    }))
                                }
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: "8px",
                                    width: "100%",
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Value"
                                variant="outlined"
                                value={atb.value}
                                helperText={false}
                                onChange={(e) =>
                                    setAtb((prev) => ({
                                        key: prev.key,
                                        value: e.target.value,
                                    }))
                                }
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: "8px",
                                    width: "100%",
                                }}
                            />
                        </Grid>
                    </Grid>
                    <List
                        dense={true}
                        sx={{
                            width: "100%",
                            height: "100%",
                            marginTop: "16px",
                            marginBottom: "60px",
                            overflowY: "scroll",
                            "::-webkit-scrollbar": {
                                background: "transparent",
                            },
                        }}
                    >
                        {Object.keys(attributes).map((item) => (
                            <ListItem
                                key={item}
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    margin: "4px 0",
                                    borderRadius: "8px",
                                }}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleRemoveAtb(item)}
                                    >
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={item}
                                    secondary={attributes[item]}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    {collection.data && (
                        <Button onClick={handleSubmit}>Mint</Button>
                    )}
                </FormControl>
            </Container>
        </Drawer>
    );
};

export default FormNftMint;
