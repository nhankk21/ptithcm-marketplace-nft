import { useEffect } from "react";
import { useTheme } from "@mui/material";

import { Collection } from "../../models/collection";
import { Nft } from "../../models/nft";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { getUserCollection } from "../../models/user";

/**
 * @useProfile
 * @return {any}
 */
function useProfile() {
    const collectionList: Collection[] = [];
    const nftList: Nft[] = [];
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const user = useAppSelector((state) => state.user);
    useEffect(() => {
        user.data && dispatch(getUserCollection(user.data.address));
    }, [user.data]);
    return { user, theme, collectionList, nftList };
}

export default useProfile;
