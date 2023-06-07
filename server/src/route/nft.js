import {  createNewNft, deleteNft, tradeNftHandler, updatePrice, listNFT, getNFTInfo, getNFTsBuy, delistNFT} from "../handler/nft.js";
import { verifyToken } from "../middlewares/verifytoken.js";


export function nftRouter(app) {

    // public apis
    app.get("/nft/information/:nft_address", (req, res) => {
        getNFTInfo(req,res);
    });
    app.get("/nft/:owner/bought", (req, res) => {
        getNFTsBuy(req,res);
    });
    
    

    // private apis
    app.post("/nft/create", (req, res) => {
        createNewNft(req, res);
    });
    app.delete("/nft/delete",verifyToken, (req,res)=>{
        deleteNft(req, res);
    });
    app.put("/nft/update_price", (req, res) => {
        updatePrice(req,res);
    });
    app.post("/nft/trade",(req,res) => {
        tradeNftHandler(req,res);
    });
    app.put("/nft/listing", verifyToken,(req, res) => {
        listNFT(req,res);
    });
    app.put("/nft/delist", verifyToken, (req, res) => {
        delistNFT(req,res);
    });

}
