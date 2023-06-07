import React from "react";
import { Toaster } from "react-hot-toast";

// INTERNAL
import Footer from "../Footer";
import Header from "../Header";
import ScrollToTopFab from "../ScrollToTopFab";

type Props = {
    children: JSX.Element;
};

const MainLayout = ({ children }: Props) => {
    return (
        <React.Fragment>
            <Toaster />
            <Header />
            {children}
            <Footer />
            <ScrollToTopFab />
        </React.Fragment>
    );
};

export default MainLayout;
