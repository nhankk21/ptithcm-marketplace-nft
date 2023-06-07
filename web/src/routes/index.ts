import Home from "../pages/Home";
import Category from "../pages/Category";
import Profile from "../pages/Profile";
import Collection from "../pages/Collection";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NFT from "../pages/NFT";
import ChangePassword from "../pages/ChangePassword";
import { RoutesProps } from "./typings";

export const publicRoutes: RoutesProps[] = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "/category/:category",
        element: Category,
    },
    {
        path: "/collection/:address",
        element: Collection,
    },
    {
        path: "/login",
        element: Login,
    },
    {
        path: "/register",
        element: Register,
    },
    {
        path: "/nft/:address",
        element: NFT,
    },
    {
        path: "/change-password",
        element: ChangePassword,
    },
];

export const userRoutes = [
    ...publicRoutes,
    {
        path: "/profile",
        element: Profile,
    },
];
