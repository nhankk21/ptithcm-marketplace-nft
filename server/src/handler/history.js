import { transactionCol } from "../database/mongodb.js";
import { walletCol } from "../database/mongodb.js";
import { nftCol } from "../database/mongodb.js";
import { Status, isHexAddess } from "../common/common.js";
import { getNewAddress } from "../business/address/newAddress.js";
import { historyNft } from "../business/transaction/history.js";
import { trendingCollection } from "../business/transaction/trending.js";
import { getListPrice, getNFTPrice, getPrice } from "../business/pricing/pricing.js";


export async function historyNftHandler(req,res){ 

    if (!isHexAddess(req.body.nft_address)) {
        res.send({
            status: Status.INVALID,
            message: "Invalid NFT address!",
        });
        return;
    }
    const page = parseInt(req.body.page, 10);
    if (!Number.isInteger(page)) {
        res.send({
            status: Status.INVALID,
            message: "Page must be an integer!",
        });
        return;
    }
    const limit = parseInt(req.body.limit, 10);
    if (!Number.isInteger(limit)) {
        res.send({
            status: Status.INVALID,
            message: "Limit must be an integer!",
        });
        return;
    }
    const items = await historyNft(req.body.nft_address, page, limit);
    if (items == null) {
        res.send({
            status: Status.FAILED,
            message: "Failed to get history of the NFT!",
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Get history successfully!",
        data: items
    });
    return;
}


export async function trendingCollectionHandler(req,res){ 

    const items = await trendingCollection();
    if (items == null) {
        res.send({
            status: Status.FAILED,
            message: "Failed to get trending collections!",
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Get trending collections successfully!",
        data: items
    });
    return;
}

export async function getPriceHandler(req,res){ 

    const price = await getPrice();
    if (price == null) {
        res.send({
            status: Status.FAILED,
            message: "Failed to get price!",
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Get price successfully!",
        data: price
    });
    return;
}


export async function getListPriceHandler(req,res){ 

    const list = await getListPrice();
    if (list == null) {
        res.send({
            status: Status.FAILED,
            message: "Failed to get list price!",
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Get list price successfully!",
        data: list
    });
    return;
}

export async function getNFTPriceHandler(req,res){ 
    if (!isHexAddess(req.body.nft_address)) {
        res.send({
            status: Status.INVALID,
            message: "Invalid NFT address!",
        });
        return
    }
    try {
        const list = await getNFTPrice(req.body.nft_address);
        res.send({
            status: Status.OK,
            message: "Get nft list price successfully!",
            data: list,
        });
        return;
    } catch (err) {
        res.send({
            status: Status.FAILED,
            message: "Failed to get nft list price!",
            error: err.message,
        });
        return;
    }
}
