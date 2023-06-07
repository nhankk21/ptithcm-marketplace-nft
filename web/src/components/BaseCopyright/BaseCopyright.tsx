import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

/**
 *
 * @param {any} props
 * @return {JSX.Element}
 */
function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link to="/">Home</Link> {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default Copyright;
