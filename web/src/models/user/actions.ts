import { createAsyncThunk } from "@reduxjs/toolkit";

import { changePassword, loginApi, registerApi } from "../../services/authApi";
import { getCollectionListByUserAddress } from "../../services/collectionApi";
import { APP_STATUS } from "../../constants/status";
import toast from "react-hot-toast";

// READ ACTIONS
type LoginPayload = {
    address: string;
    password: string;
};
const login = createAsyncThunk(
    "user/login",
    async ({ address, password }: LoginPayload) => {
        try {
            const res = await loginApi(address, password);
            if (res.status === APP_STATUS.FAILED) {
                throw new Error(res.message);
            }
            localStorage.setItem("address", res.data.address);
            localStorage.setItem("jwt", res.data.jwt);
            return { ...res.data, password };
        } catch (e: any) {
            throw new Error("Error!", e.message);
        }
    }
);

type RegisterPayload = {
    username: string;
    password: string;
};
const register = createAsyncThunk(
    "user/register",
    async ({ username, password }: RegisterPayload) => {
        try {
            const res = await registerApi(username, password);
            return res.data;
        } catch (e: any) {
            throw new Error("Error!", e.message);
        }
    }
);

const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async ({
        privateKey,
        newPassword,
    }: {
        privateKey: string;
        newPassword: string;
    }) => {
        toast.promise(changePassword(privateKey, newPassword), {
            loading: "Checking...",
            success: "Your password is changed!\n Please login again!",
            error: "Change password failed!\n Please check private key again!",
        });
    }
);

const getUserCollection = createAsyncThunk(
    "user/getUserCollection",
    async (address: string) => {
        try {
            const res = await getCollectionListByUserAddress(address);
            return res;
        } catch (e: any) {
            throw new Error("Error!", e.message);
        }
    }
);

export { login, register, resetPassword, getUserCollection };
