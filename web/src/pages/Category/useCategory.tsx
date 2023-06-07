import { useAppSelector } from "../../hooks/useStoreHooks";

/**
 *
 * @param {string} category
 * @return {any}
 */
function useCategory(category: string | undefined) {
    const collectionList = useAppSelector((state) => state.collectionList);
    const collectionListByCategory = category
        ? collectionList.data[category]
        : [];
    return { collectionListByCategory };
}

export default useCategory;
