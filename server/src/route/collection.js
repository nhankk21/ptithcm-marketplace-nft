import { createNewCollection, deleteCollection, getAllCollections, getOneCollection, updateCollection, getListCollectionByCategory, getListCollectionByUser } from "../handler/collection.js";
import { getNFTsByCollection } from "../handler/nft.js";
import { verifyToken } from "../middlewares/verifytoken.js";


export function collectionRouter(app) {

    app.get("/collection/:address", (req, res) => {
        getOneCollection(req, res);
    });
    app.get("/collection/", (req, res) => {
        getAllCollections(req, res);
    });
    app.get("/collection/category/:category", (req, res) => {
        getListCollectionByCategory(req, res);
    });
    app.get("/collection/user/:user", (req, res) => {
        getListCollectionByUser(req, res);
    });

    app.post('/collection/create', verifyToken, (req, res) => {
        createNewCollection(req, res);
    });
    app.put("/collection/:address", verifyToken, (req, res) => {
        updateCollection(req, res);
    });
    app.delete("/collection/:address", verifyToken, (req, res) => {
        deleteCollection(req, res);
    });
    app.get("/collection/:collection/list_nft"  , (req, res) => {
        getNFTsByCollection(req, res);
    });
    // app.get("/collection/list/:category", (req, res) => {
    //     getListCollectionByCategory(req, res)
    // });

    // app.get("/collection/list/:user", (req, res) => {
    //     getListCollectionByUser(req, res)
    // });

}
