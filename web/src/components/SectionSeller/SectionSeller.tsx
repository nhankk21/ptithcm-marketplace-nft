import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import "./SectionSeller.scss";
import axiosCLient from "../../utils/axiosClient";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
const labels = Array.from({ length: 24 }, (_, index) => 24 - index);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};
const SellerSection = () => {
    const [marketTrend, setMarketTrend] = useState<number[]>([]);
    useEffect(() => {
        (async () => {
            const res = await axiosCLient.get("/price/list");
            setMarketTrend(res.data);
        })();
    }, []);
    return (
        <section className="seller-section">
            <Container maxWidth="lg">
                <Grid container>
                    <Grid
                        item
                        lg={12}
                        style={{ marginBottom: 5 }}
                        className="seller-section__title"
                    >
                        <h3>Market trend</h3>
                    </Grid>
                    <Grid item lg={12} style={{ marginBottom: 5 }}>
                        {marketTrend && (
                            <Line
                                options={options}
                                data={{
                                    labels,
                                    datasets: [
                                        {
                                            label: "Market trends",
                                            data: marketTrend,
                                            borderColor: "rgb(255, 99, 132)",
                                            backgroundColor:
                                                "rgba(255, 99, 132, 0.5)",
                                        },
                                    ],
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default SellerSection;
