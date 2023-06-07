import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

// INTERNAL
import { publicRoutes, userRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import useAppThemes from "./hooks/useAppThemes";
import PageNotFound from "./pages/PageNotFound";
import { useAppSelector } from "./hooks/useStoreHooks";
import BaseScrollToTop from "./components/BaseScrollToTop";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
/**
 * Component root App
 * @component
 * @return {JSX.Element}
 */
function App(): JSX.Element {
    const { colorMode, theme } = useAppThemes();
    const { data } = useAppSelector((state) => state.user);

    const renderPage = () => {
        const routes = data ? userRoutes : publicRoutes;
        if (routes && routes.length > 0) {
            return (
                <Fragment>
                    {routes.map((item) => {
                        const Page = item.element;
                        if (["/login", "/register"].includes(item.path)) {
                            return (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    element={<Page />}
                                />
                            );
                        }
                        return (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={
                                    <MainLayout>
                                        <React.Fragment>
                                            <Page />
                                            <BaseScrollToTop />
                                        </React.Fragment>
                                    </MainLayout>
                                }
                            />
                        );
                    })}
                    <Route path="*" element={<PageNotFound />} />
                </Fragment>
            );
        } else {
            return <Route path="*" element={<PageNotFound />} />;
        }
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>{renderPage()}</Routes>
                </Router>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
