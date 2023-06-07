import React from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
// import useCategory from "./useCategory";
import SectionListCollection from "../../components/SectionListCollection";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { readCollectionListByCategory } from "../../models/collectionList";

const Category = () => {
    const { category } = useParams();
    const collectionList = useAppSelector((state) => state.collectionList);
    const dispatch = useAppDispatch();
    const lastpage =
        collectionList.data[category!].length < 4 ||
        collectionList.data[category!].length % 4 !== 0;
    const handleLoadmore = () => {
        dispatch(
            readCollectionListByCategory({
                category: category!,
                page: Math.floor(collectionList.data[category!].length / 4) + 1,
            })
        );
    };
    return (
        <>
            {category && <SectionListCollection category={category} />}
            {!lastpage && (
                <Button
                    onClick={handleLoadmore}
                    disabled={collectionList.pending}
                >
                    Load more
                </Button>
            )}
            {collectionList.pending && <CircularProgress />}
        </>
    );
};

export default Category;
