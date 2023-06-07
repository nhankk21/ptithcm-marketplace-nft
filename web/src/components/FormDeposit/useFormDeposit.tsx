import { useTheme } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

import { deposit } from "../../services/transactionApi";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { login } from "../../models/user";

type Props = {
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};
const useFormDeposit = ({ openDrawer, setOpenDrawer }: Props) => {
    const [amount, setAmount] = useState<number>(50);
    const theme = useTheme();
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        if (user.data && amount > 0) {
            await deposit(user.data.address, amount);
            toast.success("Deposit " + amount + " USD successfully!");
            dispatch(
                login({
                    address: user.data.address,
                    password: user.data.password!,
                })
            );
        } else {
            toast.success("Deposit failed!");
        }
    };
    const toggleDrawer = (open: boolean) => {
        setOpenDrawer(open);
    };
    return { amount, openDrawer, theme, handleSubmit, setAmount, toggleDrawer };
};

export default useFormDeposit;
