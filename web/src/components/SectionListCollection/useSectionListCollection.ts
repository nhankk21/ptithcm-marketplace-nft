import { useEffect } from "react";

// INTERNAL
// import { useAppSelector } from "hooks/useStoreHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { readCollectionListByCategory } from "../../models/collectionList";

/**
 * @useCollectionListSection hooks implement all logic of the component
 * @param {string} category
 * @return {any}
 */
function useCollectionListSection(category: string) {
    const dispatch = useAppDispatch();
    const collectionListModel = useAppSelector((state) => state.collectionList);
    const collectionList = collectionListModel.data[category];
    const isLoading = collectionListModel.pending;

    useEffect(() => {
        dispatch(readCollectionListByCategory({ category }));
    }, []);

    return { collectionList, isLoading };
}

export default useCollectionListSection;
