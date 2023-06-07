import React from "react";
import { Container, Grid, Typography, useTheme } from "@mui/material";

// INTERNAL
import CardCollection from "../CardCollection";
import useSectionListCollection from "./useSectionListCollection";
import styles from "./SectionListCollection.scss";

type Props = {
    category: string;
    limit?: number;
};
/**
 * @CollectionListSection
 * @param {sring} category
 * @return {JSX.Element}
 */
function SectionListCollection({ category, limit }: Props) {
    const { collectionList } = useSectionListCollection(category);
    const theme = useTheme();

    return (
        <section className={styles.collections}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h3"
                            sx={{
                                textAlign: { xs: "center", md: "start" },
                                color: theme.palette.text.primary,
                                textTransform: "capitalize",
                            }}
                        >
                            {category}
                        </Typography>
                    </Grid>
                    {limit
                        ? collectionList.slice(0, limit).map((item) => (
                              <Grid
                                  item
                                  lg={3}
                                  md={4}
                                  sm={6}
                                  xs={12}
                                  key={item._id}
                              >
                                  <CardCollection collection={item} />
                              </Grid>
                          ))
                        : collectionList.map((item) => (
                              <Grid
                                  item
                                  lg={3}
                                  md={4}
                                  sm={6}
                                  xs={12}
                                  key={item._id}
                              >
                                  <CardCollection collection={item} />
                              </Grid>
                          ))}
                </Grid>
                {/* {isLoading && <CircularProgress />} */}
            </Container>
        </section>
    );
}

export default SectionListCollection;
