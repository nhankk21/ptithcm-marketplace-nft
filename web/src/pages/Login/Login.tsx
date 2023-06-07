import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { login } from "../../models/user";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";

/**
 *
 * @return {JSX.Element}
 */
export default function Login() {
    const address = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        const userAddress = localStorage.getItem("address");

        if (user.data) {
            toast.success(`Welcome back ${user.data.username}!`);
            navigate("/");
        } else {
            if (address.current) {
                address.current.focus();
                address.current.value = userAddress || "";
            }
        }
    }, [user]);

    const handleSubmit = () => {
        if (address.current && password.current) {
            dispatch(
                login({
                    address: address.current.value,
                    password: password.current.value,
                })
            );
        } else {
            toast.error("Please enter address and password to login!");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Toaster />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={address}
                                name="address"
                                required
                                fullWidth
                                id="address"
                                label="Wallet Address"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={password}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/change-password">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
