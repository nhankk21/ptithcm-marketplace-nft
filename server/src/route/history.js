import { historyNftHandler, trendingCollectionHandler } from "../handler/history.js";
import { verifyToken } from "../middlewares/verifytoken.js";

export function historyRouter(app) {


    // public apis
    app.post("/history/nft", (req,res) => {
        historyNftHandler(req,res);
    });

    app.get("/trending/collection", (req,res) => {
        trendingCollectionHandler(req,res);
    });

}
