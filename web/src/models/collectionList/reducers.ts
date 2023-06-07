// import {
//     ArtCollectionList,
//     GameCollectionList,
//     PhotoCollectionList,
//     MemberCollectionList,
// } from "assets/data/collection";
import { CollectionListModel } from "./typings";

export const initialState: CollectionListModel = {
    data: {
        art: [],
        photography: [],
        gaming: [],
        memberships: [],
    },
    pending: false,
    error: false,
};

const reducers = {};

export default reducers;
