import { getNewAddress } from "../business/address/newAddress.js"
import { collectionCol, nftCol, transactionCol } from "../database/mongodb.js";
import { Status, TxnType, isHexAddess } from "../common/common.js";

import { buyNft } from "../business/nft/buyNft.js";
import { createTransactionHash } from "../business/transaction/transactionHash.js";

export async function createNewNft(req, res) {
    const nft = {
        address: getNewAddress(),
        owner: req.body.creator,
        creator: req.body.creator,
        collection: req.body.collection,
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        attributes: req.body.attributes,
        price: req.body.price,
        listed: false,
        created: Date.now(),
        updated: Date.now(),
    }
    try {
        const transaction = {
            "txn_type": TxnType.PRICING,
            "nft_address": nft.address,
            "time": Date.now(),
            "details": {
                "old_price": 0,
                "new_price": nft.price,
            }
        };
        const txnHash = createTransactionHash(transaction)
        transaction["txn_hash"] = txnHash
        await transactionCol.insertOne(transaction)
        await nftCol.insertOne(nft);
    } catch (err) {
        res.send({
            status: Status.ERROR,
            message: "Fail to create new nft!",
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Create new nft successfully!",
        data: nft,
    });
}

export async function deleteNft(req, res) {
    const nft_address = req.body.nft_address;
    const owner_address = req.body.owner_address;
    try {
        const nft = await nftCol.findOne({ address: nft_address });
        if (!nft) {
            res.send({
                status: Status.ERROR,
                message: "Invalid NFT Address",
            });
            return;
        }
        if (nft.owner !== owner_address) {
            res.send({
                status: Status.ERROR,
                message: "You are not the owner of this NFT",
            });
            return;
        }
        await nftCol.deleteOne({ address: nft_address });
    }
    catch {
        res.send({
            status: Status.ERROR,
            message: "Fail to delete nft!",
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Delete nft successfully!",
    });
}

export async function updatePrice(req, res) {
    const wallet_address = req.body.wallet_address;
    const nft_address = req.body.nft_address;
    const price = req.body.price;
    try {
        const nft = await nftCol.findOne({ address: nft_address });
        if (!nft) {
            res.send({
                status: Status.ERROR,
                message: "Invalid NFT Address",
            });
            return;
        }
        if (nft.owner !== wallet_address) {
            res.send({
                status: Status.ERROR,
                message: "You are not the owner of this NFT",
            });
            return;
        }
        const transaction = {
            "txn_type": TxnType.PRICING,
            "nft_address": nft.address,
            "time": Date.now(),
            "details": {
                "old_price": nft.price,
                "new_price": price,
            }
        };
        const txnHash = createTransactionHash(transaction)
        transaction["txn_hash"] = txnHash
        await transactionCol.insertOne(transaction)
        await nftCol.findOneAndUpdate(
            { address: nft_address },
            { $set: { price: price } },
            { new: true }
        );
    }
    catch {
        res.send({
            status: Status.ERROR,
            message: "Fail to update price nft!",
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Update price nft successfully!",
        data: {
            address: nft_address,
            price: price
        }
    });
}

export async function getNFTsByCollection(req, res) {
    const page = parseInt(req.query.page);
    const filter = {
        collection: req.params.collection
    }

    const limit = parseInt(req.query.limit);

    let nfts = [];
    const count = await nftCol.countDocuments(filter);
    if (count === 0) {
        res.send({
            status: Status.ERROR,
            message: "No  NFT found.",
        });
        return;
    }

    if (page) {
        nftCol.find(filter)
            .skip(page * limit - limit)
            .limit(limit)
            .forEach(nft => nfts.push(nft))
            .then(() => {
                res.send({
                    status: Status.OK,
                    message: "Get NFTs successfully!",
                    data: nfts
                })
            })
            .catch(() => {
                res.send({
                    status: Status.ERROR,
                    message: "Fail to get NFTs!"
                })
            })
    } else {
        // get all NFTs
        nftCol.find(filter)
            .forEach(nft => nfts.push(nft))
            .then(() => {
                res.send({

                    status: Status.OK,
                    message: "Get NFTs successfully!",
                    data: nfts
                })
            })
            .catch(() => {
                res.send({

                    status: Status.ERROR,
                    message: "Fail to get NFTs!"
                })
            })
    }
}



export async function tradeNftHandler(req, res) {

    if (!isHexAddess(req.body.buyer) || !isHexAddess(req.body.seller) || !isHexAddess(req.body.nft_address)) {
        res.send({
            status: Status.INVALID,
            message: "Invalid address!",
        });
        return;
    }

    try {
        await buyNft(req.body.buyer, req.body.seller, req.body.nft_address);
    } catch (err) {
        res.send({
            status: Status.FAILED,
            message: err.message,
        });
        return;
    }
    res.send({
        status: Status.OK,
        message: "Buy NFT successfully!",
    });
    return;
}

export async function listNFT(req, res) {
    const nft_address = req.body.nft_address;
    const owner_address = req.body.owner_address;

    try {
        const nft = await nftCol.findOne({ address: nft_address });
        if (!nft) {
            res.send({
                status: Status.ERROR,
                message: "Invalid NFT Address",
            });
            return;
        }
        if (nft.owner !== owner_address) {
            res.send({
                status: Status.ERROR,
                message: "You are not the owner of this NFT",
            });
            return;
        }
        await nftCol.findOneAndUpdate(
            { address: nft_address },
            { $set: { listed: true } },
            { new: true }
        );
        res.send({
            status: Status.OK,
            message: "NFT listing status updated successfully!",
            data: {
                nft_address: nft_address,
                listed: true,
            }
        });
    } catch {
        res.send({
            status: Status.ERROR,
            message: "Failed to change the NFT listing status ",
        });

    }

}
export async function delistNFT(req, res) {
    const nft_address = req.body.nft_address;
    const owner_address = req.body.owner_address;

    try {
        const nft = await nftCol.findOne({ address: nft_address });
        if (!nft) {
            res.send({
                status: Status.ERROR,
                message: "Invalid NFT Address",
            });
            return;
        }
        if (nft.owner !== owner_address) {
            res.send({
                status: Status.ERROR,
                message: "You are not the owner of this NFT",
            });
            return;
        }
        await nftCol.findOneAndUpdate(
            { address: nft_address },
            { $set: { listed: false } },
            { new: true }
        );
        res.send({
            status: Status.OK,
            message: "Delist NFT  updated successfully!",
            data: {
                nft_address: nft_address,
                listed: false,
            }
        });
    } catch {
        res.send({
            status: Status.ERROR,
            message: "Failed to delist the NFT  ",
        });

    }
}
export async function getNFTInfo(req, res) {
    const nft_address = req.params.nft_address;

    try {
        const nft = await nftCol.findOne({ address: nft_address });

        if (!nft) {
            res.send({
                status: Status.ERROR,
                message: "Invalid NFT Address",
            });
            return;
        }
        res.send({
            status: Status.OK,
            message: "Get NFT information successfully!",
            data: {
                nft: nft,
            },
        });

    }
    catch {
        res.send({
            status: Status.ERROR,
            message: "Fail to get information nft!",
        });
    }
}

export async function getNFTsBuy(req, res) {
    const page = parseInt(req.query.page);
    const filter = {
        owner: req.params.owner,
        creator: { $ne: req.params.owner }
    }
    const limit = parseInt(req.query.limit);

    let nfts = [];

    const count = await nftCol.countDocuments(filter);
    if (count === 0) {
        res.send({
            status: Status.ERROR,
            message: "No bought NFTs found.",
        });
        return;
    }

    if (page) {
        nftCol.find(filter)
            .skip(page * limit - limit)
            .limit(limit)
            .forEach(nft => nfts.push(nft))
            .then(() => {
                res.send({
                    status: Status.OK,
                    message: "Retrieve bought NFTs successfully!",
                    data: nfts
                })
            })
            .catch(() => {
                res.send({
                    status: Status.ERROR,
                    message: "Failed to fetch bought NFTs!"
                })
            })
    } else {
        // get all NFTs bought
        nftCol.find(filter)
            .forEach(nft => nfts.push(nft))
            .then(() => {
                res.send({

                    status: Status.OK,
                    message: "Retrieve bought NFTs successfully!",
                    data: nfts
                })
            })
            .catch(() => {
                res.send({

                    status: Status.ERROR,
                    message: "Failed to fetch bought NFTs!"
                })
            })
    }
}
