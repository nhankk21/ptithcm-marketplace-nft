import { nftRouter } from "./nft.js";
import { walletRouter } from "./wallet.js";
import { collectionRouter } from "./collection.js";
import { historyRouter } from "./history.js";
import { getPriceHandler } from "../handler/history.js";
import { priceRouter } from "./price.js";

export function initRouter(app) {
    console.log("router connected");
    app.get("/", (req, res) => {
        res.send("hello world!");
    });
    priceRouter(app);
    collectionRouter(app);
    walletRouter(app);
    nftRouter(app);
    historyRouter(app);
}

