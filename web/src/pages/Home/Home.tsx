import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

// INTERNAL
import CATEGORY from "../../constants/categories";
const HeroSection = React.lazy(() => import("./components/HeroSection"));
const SectionCategory = React.lazy(
    () => import("../../components/SectionCategory")
);
const SectionSeller = React.lazy(
    () => import("../../components/SectionSeller")
);

import SectionListCollection from "../../components/SectionListCollection";

const SectionGuide = React.lazy(() => import("../../components/SectionGuide"));

const Home = () => {
    return (
        <React.Fragment>
            <React.Suspense fallback={<CircularProgress />}>
                <HeroSection />
            </React.Suspense>

            {/* <React.Suspense fallback={<CircularProgress />}> */}
            <SectionListCollection category={CATEGORY.ART} limit={4} />
            {/* </React.Suspense> */}

            {/* <React.Suspense fallback={<CircularProgress />}> */}
            <SectionListCollection category={CATEGORY.GAMING} limit={4} />
            {/* </React.Suspense> */}

            {/* <React.Suspense fallback={<CircularProgress />}> */}
            <SectionListCollection category={CATEGORY.MEMBER} limit={4} />
            {/* </React.Suspense> */}

            {/* <React.Suspense fallback={<CircularProgress />}> */}
            <SectionListCollection category={CATEGORY.PHOTO} limit={4} />
            {/* </React.Suspense> */}

            <React.Suspense fallback={<CircularProgress />}>
                <SectionSeller />
            </React.Suspense>

            <React.Suspense fallback={<CircularProgress />}>
                <SectionCategory />
            </React.Suspense>

            <React.Suspense fallback={<CircularProgress />}>
                <SectionGuide />
            </React.Suspense>
        </React.Fragment>
    );
};

export default Home;
