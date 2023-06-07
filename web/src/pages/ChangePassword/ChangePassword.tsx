import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

// INTERNAL
import Copyright from "../../components/BaseCopyright";
import { useAppDispatch } from "../../hooks/useStoreHooks";
import { resetPassword } from "../../models/user/actions";

const ChangePassword = () => {
    const privateKey = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confirm = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (
            privateKey.current?.value &&
            password.current?.value &&
            confirm.current?.value
        ) {
            if (password.current.value !== confirm.current.value) {
                toast.error("Plese confirm your password again!");
                setError(true);
                return;
            }
            dispatch(
                resetPassword({
                    privateKey: privateKey.current.value,
                    newPassword: password.current.value,
                })
            );
            return;
        }
        toast.error("Incorrect entries!");
        setError(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Toaster position="top-center" reverseOrder={false} />
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset password
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={privateKey}
                                error={error && !privateKey.current?.value}
                                required
                                fullWidth
                                label="Private key"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                inputRef={password}
                                error={error && !password.current?.value}
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={confirm}
                                error={
                                    (error && !confirm.current?.value) ||
                                    confirm.current?.value !==
                                        password.current?.value
                                }
                                required
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                autoComplete="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">I got my password? Sign in</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};

export default ChangePassword;
