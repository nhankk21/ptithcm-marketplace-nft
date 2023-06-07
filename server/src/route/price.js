import { getNFTPrice } from "../business/pricing/pricing.js";
import { getListPriceHandler, getNFTPriceHandler, getPriceHandler } from "../handler/history.js";


export function priceRouter(app) {

    // public apis
    app.get("/price", (req, res) => {
        getPriceHandler(req, res)
    });
    app.get("/price/list", (req, res) => {
        getListPriceHandler(req, res)
    });
    app.post("/price/nft", (req, res) => { 
        getNFTPriceHandler(req, res)
    });
}