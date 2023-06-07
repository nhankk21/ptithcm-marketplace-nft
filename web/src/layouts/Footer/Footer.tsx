import React from "react";
import {
    Facebook,
    Instagram,
    Phone,
    Pinterest,
    Twitter,
} from "@mui/icons-material";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { Container, Grid, List, ListItem, Typography } from "@mui/material";

const MY__ACCOUNT = [
    {
        display: "Profile",
        url: "/profile",
    },
    {
        display: "Login",
        url: "/login",
    },
    {
        display: "Register",
        url: "/register",
    },
];

const RESOURCES = [
    {
        display: "What is Crypto Wallet?",
        url: "https://eric-dev-blog.vercel.app/post/8",
    },
    {
        display: "What is Minting?",
        url: "https://eric-dev-blog.vercel.app/post/7",
    },
    {
        display: "What is NFT?",
        url: "https://eric-dev-blog.vercel.app/post/6",
    },
    {
        display: "How to stay safe in Web3",
        url: "https://eric-dev-blog.vercel.app/post/8",
    },
];

const CATEGORY = [
    {
        display: "Art",
        url: "/category/art",
    },
    {
        display: "Gaming",
        url: "/category/gaming",
    },
    {
        display: "Membership",
        url: "/category/memberships",
    },
    {
        display: "Photography",
        url: "/category/photography",
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Grid container spacing={3}>
                    <Grid item sm={6} md={6} lg={3} style={{ marginBottom: 4 }}>
                        <div className="logo">
                            <Typography
                                variant="h2"
                                component="h2"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                }}
                            >
                                NFTs Marketplace
                            </Typography>
                            <p>
                                The world&apos;s first and largest digital
                                marketplace for crypto collectibles and
                                non-fungible tokens (NFTs). Buy, sell, and
                                discover exclusive digital items.
                            </p>
                        </div>
                    </Grid>

                    <Grid item sm={6} md={6} lg={2} style={{ marginBottom: 4 }}>
                        <h5>My Account</h5>
                        <List className="list__group">
                            {MY__ACCOUNT.map((item, index) => (
                                <ListItem key={index} className="list__item">
                                    <Link to={item.url}> {item.display} </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item sm={6} md={6} lg={2} style={{ marginBottom: 4 }}>
                        <h5>Resources</h5>
                        <List className="list__group">
                            {RESOURCES.map((item, index) => (
                                <ListItem key={index} className="list__item">
                                    <Link to={item.url}> {item.display} </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item sm={6} md={6} lg={2} style={{ marginBottom: 4 }}>
                        <h5>Category</h5>
                        <List className="list__group">
                            {CATEGORY.map((item, index) => (
                                <ListItem key={index} className="list__item">
                                    <Link to={item.url}> {item.display} </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item sm={6} md={6} lg={3} style={{ marginBottom: 4 }}>
                        <h5>Newsletter</h5>
                        <input
                            type="text"
                            className="newsletter"
                            placeholder="Email"
                        />
                        <div className="social__links" style={{}}>
                            <span>
                                <Link to="#">
                                    <Facebook />
                                </Link>
                            </span>
                            <span>
                                <Link to="#">
                                    <Instagram />
                                </Link>
                            </span>
                            <span>
                                <Link to="#">
                                    <Twitter />
                                </Link>
                            </span>
                            <span>
                                <Link to="#">
                                    <Pinterest />
                                </Link>
                            </span>
                            <span>
                                <Link to="#">
                                    <Phone />
                                </Link>
                            </span>
                        </div>
                    </Grid>

                    <Grid
                        item
                        lg={12}
                        style={{ marginTop: 4, textAlign: "center" }}
                    >
                        <p className="copyright">
                            {" "}
                            Copyrights 2023, Developed by Eric Nguyen & team.
                            All Rights Reserved.
                        </p>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
