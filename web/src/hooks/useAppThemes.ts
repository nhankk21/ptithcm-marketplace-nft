import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";

const useAppThemes = () => {
    const [mode, setMode] = useState<"light" | "dark">("dark");
    const [prim, setPrim] = useState<number>(210);
    const [sec, setSec] = useState<number>(210);
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    useEffect(() => {
        setPrim(259);
        setSec(298);
    }, []);

    const theme = createTheme({
        palette: {
            mode,
            primary: {
                main: `hsl(${prim},79%,46%)`,
                light: `hsl(${prim},90%,61%)`,
                dark: `hsl(${prim},80%,42%)`,
                contrastText: "#fff",
            },
            secondary: {
                main: `hsl(${sec},64%,42%)`,
                light: `hsl(${sec},46%,64%)`,
                dark: `hsl(${sec},68%,38%)`,
                contrastText: "#fff",
            },
            background: {
                default: mode === "dark" ? "#14141F" : "#FFFFFF",
                paper: mode === "dark" ? "#343444" : "#FFFFFF",
            },
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1320,
                xl: 1536,
            },
        },
        typography: {
            h1: {
                fontSize: "2rem",
            },
            h2: {
                fontSize: "1.6rem",
            },
            h3: {
                fontSize: "1.4rem",
            },
            h4: {
                fontSize: "1.2rem",
            },
            h5: {
                fontSize: "1rem",
            },
            h6: {
                fontSize: ".8rem",
            },
        },
    });

    return { mode, prim, sec, theme, colorMode, setMode, setPrim, setSec };
};

export default useAppThemes;
