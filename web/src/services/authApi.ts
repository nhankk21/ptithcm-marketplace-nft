import delay from "../utils/delay";
import { User } from "../models/user";
import axiosCLient from "../utils/axiosClient";

type LoginResponse = {
    status: string;
    message: string;
    data: User;
};
/**
 * @loginApi login to user account by address and password
 * @param {string} address
 * @param {string} password
 * @return {Promise<LoginResponse>}
 */
function loginApi(address: string, password: string): Promise<LoginResponse> {
    const url = "/wallet/login";
    return axiosCLient.post(url, {
        address,
        password,
    });
}

/**
 * @registerApi
 * @param {string} username
 * @param {string} password
 * @return {Promise<LoginResponse>}
 */
function registerApi(
    username: string,
    password: string
): Promise<LoginResponse> {
    const url = "/wallet/create";
    return axiosCLient.post(url, {
        username,
        password,
    });
}

/**
 * reset password with private key
 * @param {string} privateKey
 * @param {string} newPassword
 * @return {any}
 */
async function changePassword(privateKey: string, newPassword: string) {
    const url = "/wallet/forgot_password";
    delay(1000);
    const res: any = await axiosCLient.post(url, {
        private_key: privateKey,
        new_password: newPassword,
    });
    if (res.status === "FAILED") {
        throw new Error(res.data.message);
    }
    return res;
}

export type RefreshTokenReturnType = {
    refreshToken: string;
};

export const refreshToken = async (): Promise<RefreshTokenReturnType> => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const JWTToken = user.refreshToken;
    const url = "/auth/refreshToken";
    const res = await axiosCLient.post(url, { token: JWTToken });
    return res.data;
};

export { loginApi, registerApi, changePassword };
