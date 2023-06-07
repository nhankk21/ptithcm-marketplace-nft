import { useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import isHexAddress from "../../utils/isHexAddress";
import { login } from "../../models/user";
import { transfer } from "../../services/transactionApi";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";

type Props = {
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};
const useFormTransfer = ({ setOpenDrawer }: Props) => {
    const theme = useTheme();

    const address = useRef<HTMLInputElement>(null);
    const [amount, setAmount] = useState<number>(50);
    const [type, setType] = useState<"Token" | "Fiat">("Token");
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (address.current) {
            address.current.focus();
            address.current.value = "";
        }
    }, []);

    const toggleDrawer = (open: boolean) => {
        setOpenDrawer(open);
    };

    const handleSubmit = () => {
        if (user.data && address.current) {
            if (
                (type == "Token" && amount > user.data.fiat_balance) ||
                (type == "Fiat" && amount > user.data.token_balance)
            ) {
                toast.error("Amount exchange must be lower than balance");
                return;
            }
            if (!isHexAddress(address.current.value)) {
                toast.error("Please enter valid address!!!");
                return;
            }
            toast.promise(
                transfer(
                    user.data.address,
                    address.current.value,
                    type,
                    amount
                ),
                {
                    loading: "Transfering...",
                    success: () => {
                        dispatch(
                            login({
                                address: user.data?.address!,
                                password: user.data?.password!,
                            })
                        );
                        return `Transfer ${amount} ${type} successfully!`;
                    },
                    error: "Transfer failed! Somethings when wrong!\n Please try again later!",
                }
            );
            setOpenDrawer(false);
        }
    };

    return {
        address,
        amount,
        theme,
        type,
        handleSubmit,
        setAmount,
        toggleDrawer,
        setType,
    };
};

export default useFormTransfer;
