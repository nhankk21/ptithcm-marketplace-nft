import React from "react";
import { Link } from "react-router-dom";
import { RocketOutlined } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";

// INTERNAL
import "./HeroSection.scss";
import { BANNER_COLLECTION } from "../../../../constants/data";

const HeroSection = () => {
    return (
        <section className="hero__section">
            <Container>
                <Grid container>
                    <Grid item lg={6} md={6}>
                        <div className="hero__content">
                            <h2>
                                Discover rare digital art and collect sell
                                <span>{BANNER_COLLECTION.title}</span>
                            </h2>
                            <p>{BANNER_COLLECTION.description}</p>

                            <div className="hero__btns">
                                <Button className="explore__btn">
                                    <RocketOutlined />
                                    <Link
                                        to={`/collection/${BANNER_COLLECTION.address}`}
                                    >
                                        Explore
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={6} md={6}>
                        <div className="hero__img">
                            <img
                                src={BANNER_COLLECTION.thumbnail}
                                alt={BANNER_COLLECTION.title}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default HeroSection;
