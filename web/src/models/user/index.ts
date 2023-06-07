import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// INTERNAL EXPORT
import reducers, { initialState } from "./reducers";
import { getUserCollection, login, register, resetPassword } from "./actions";

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, _) => {
                toast.loading("Loading...");
                state.pending = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                toast.dismiss();
                localStorage.setItem("address", action.payload.address);
                state.data = action.payload;
            })
            .addCase(login.rejected, (state, _) => {
                state.error = true;
                toast.dismiss();
                toast.error("Login failed 😥\nPlease try again!");
            })
            .addCase(register.pending, (state, _) => {
                toast.loading("Register inprogress...");
                state.pending = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                toast.dismiss();
                toast.success(
                    `Welcome ${
                        action.payload.username || action.payload.address
                    }!`
                );
                localStorage.setItem("address", action.payload.address);
                state.data = action.payload;
            })
            .addCase(register.rejected, (state, _) => {
                state.error = true;
                toast.dismiss();
                toast.error("Register failed 😥\nPlease try again!");
            })
            .addCase(getUserCollection.pending, (state, _) => {
                state.pending = true;
            })
            .addCase(getUserCollection.fulfilled, (state, action) => {
                state.created = action.payload;
            })
            .addCase(getUserCollection.rejected, (state, _) => {
                state.error = true;
            });
    },
});

export const { logout } = userSlice.actions;
export { login, register, getUserCollection, resetPassword };
export * from "./typings";
export default userSlice.reducer;
