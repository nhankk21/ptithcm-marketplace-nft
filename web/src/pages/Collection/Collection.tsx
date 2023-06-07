import React from "react";
import { Container } from "@mui/material";

// INTERNAL
import "./styles/Collection.scss";
import useCollection from "./hooks/useCollection";
import CollectionOverview from "./components/CollectionOverview";
import CollectionContent from "./components/CollectionContent";

const Collection = () => {
    const { user, param, collection, floorPrice, handleBuyNftInCollection } =
        useCollection();

    return (
        <React.Fragment>
            <Container className="collection" style={{ padding: "20px 0" }}>
                <CollectionOverview
                    user={user}
                    collection={collection}
                    floorPrice={floorPrice}
                />
                <CollectionContent
                    param={param}
                    user={user}
                    collection={collection}
                    handleBuyNft={handleBuyNftInCollection}
                />
            </Container>
        </React.Fragment>
    );
};

export default Collection;
