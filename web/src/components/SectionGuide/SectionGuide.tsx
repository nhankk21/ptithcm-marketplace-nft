import React from "react";
import {
    AccountBalanceWalletOutlined,
    CollectionsOutlined,
    FormatListBulletedOutlined,
    GridViewOutlined,
} from "@mui/icons-material";
import { Container, Grid } from "@mui/material";

// INTERNAL
import "./SectionGuide.scss";
import { stringMinify } from "../../utils/stringMinify";

const STEP__DATA = [
    {
        title: "What is Crypto Wallet?",
        desc: "A crypto wallet is a program that helps you buy, sell, and store your cryptocurrency and (in many cases) your NFTs. Think of it as your address on the blockchain— you can send and receive items from it, it stores your items, and you want to keep it locked and safe. In this article, we’ll walk through the types of crypto wallets and how to set one up.",
        icon: AccountBalanceWalletOutlined,
        link: "https://eric-dev-blog.vercel.app/post/8",
    },

    {
        title: "What is Minting?",
        desc: "“Minting” an NFT is the process of writing a digital item to the blockchain. This establishes its immutable record of authenticity and ownership.",
        icon: GridViewOutlined,
        link: "https://eric-dev-blog.vercel.app/post/7",
    },

    {
        title: "What is NFT?",
        desc: "An NFT (non-fungible token) is a unique digital item stored on a blockchain. NFTs can represent almost anything, and serve as a digital record of ownership.",
        icon: CollectionsOutlined,
        link: "https://eric-dev-blog.vercel.app/post/6",
    },

    {
        title: "How to stay safe in Web3",
        desc: "Web3 technology is still new, and it’s constantly evolving, so while there’s no single action that guarantees protection, there are best practices that can help. Never share your wallet’s seed phrase, be careful when taking actions using your wallet, and make sure to thoroughly evaluate NFTs before buying. The best rule of thumb is that if something looks too good to be true, it probably is.",
        icon: FormatListBulletedOutlined,
        link: "https://eric-dev-blog.vercel.app/post/9",
    },
];

const GuideSection = () => {
    return (
        <section className="guide">
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item lg={12} className="mb-4">
                        <h3 className="guide__title">
                            Create and sell your NFTs
                        </h3>
                    </Grid>

                    {STEP__DATA.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Grid item lg={3} md={4} sm={6} key={index}>
                                <div className="guide__item">
                                    <span>
                                        <Icon />
                                    </span>
                                    <div className="guide__item--content">
                                        <h5>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {item.title}
                                            </a>
                                        </h5>
                                        <p>{stringMinify(item.desc, 120)}</p>
                                    </div>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </section>
    );
};

export default GuideSection;
