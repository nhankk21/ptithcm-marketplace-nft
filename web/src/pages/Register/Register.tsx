import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

// INTERNAL
import ConfirmDialog from "./components/ConfirmDialog";
import Copyright from "../../components/BaseCopyright";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { register } from "../../models/user/actions";

const Register = () => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confirm = useRef<HTMLInputElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState(false);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        if (
            username.current?.value &&
            password.current?.value &&
            confirm.current?.value
        ) {
            if (password.current.value !== confirm.current.value) {
                toast.error("Plese confirm your password again!");
                setError(true);
                return;
            }
            dispatch(
                register({
                    username: username.current.value,
                    password: password.current.value,
                })
            );
            return;
        }
        toast.error("Incorrect entries!");
        setError(true);
    };

    useEffect(() => {
        if (user.data) {
            setOpenDialog(true);
        }
    }, [user]);

    return (
        <Container component="main" maxWidth="xs">
            <Toaster position="top-center" reverseOrder={false} />
            <CssBaseline />
            {user.data?.private_key && (
                <ConfirmDialog
                    secreteKey={user.data.private_key}
                    open={openDialog}
                    setOpen={setOpenDialog}
                />
            )}
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
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={username}
                                error={error && !username.current?.value}
                                autoComplete="given-name"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                inputRef={password}
                                error={error && !password.current?.value}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
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
                                name="confirm"
                                label="Confirm Password"
                                type="password"
                                id="confirm"
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
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
                            <Link to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};

export default Register;
