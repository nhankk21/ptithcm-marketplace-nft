import { UserModel } from "./typings";

export const initialState: UserModel = {
    data: null,
    pending: false,
    error: false,
    created: [],
    collected: [],
};

const reducers = {
    logout: () => {
        return initialState;
    },
};

export default reducers;
