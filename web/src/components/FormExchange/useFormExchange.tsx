import { useTheme } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

import { exchange } from "../../services/transactionApi";
import { login } from "../../models/user";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";

type Props = {
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};
const useFormExchange = ({ setOpenDrawer }: Props) => {
    const [amount, setAmount] = useState<number>(50);
    const [type, setType] = useState<"Token" | "Fiat">("Token");
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const theme = useTheme();

    const toggleDrawer = (open: boolean) => {
        setOpenDrawer(open);
    };

    const handleSubmit = async () => {
        if (user.data) {
            if (
                (type == "Token" && amount > user.data.fiat_balance) ||
                (type == "Fiat" && amount > user.data.token_balance)
            ) {
                toast.error("Amount exchange must be lower than balance");
                return;
            }
            await exchange(user.data.address, amount, type);
            toast.success("Exchange currency successfully!");
            dispatch(
                login({
                    address: user.data.address,
                    password: user.data.password!,
                })
            );
            setOpenDrawer(false);
        }
    };

    return {
        amount,
        theme,
        type,
        handleSubmit,
        setAmount,
        setType,
        toggleDrawer,
    };
};

export default useFormExchange;
