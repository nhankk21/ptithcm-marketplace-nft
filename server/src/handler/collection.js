import { collectionCol } from "../database/mongodb.js";
import { getNewAddress } from "../business/address/newAddress.js";
import { Status, ErrorCode } from "../common/common.js";
import { enrichCollectionData } from "../business/collection/enrichCollectionData.js";


export async function createNewCollection(req, res) {
    const collection = {
        address: getNewAddress(),
        creator: req.body.creator,
        created: Date.now(),
        updated: Date.now(),
        title: req.body.title,
        thumbnail: req.body.thumbnail,
        description: req.body.description,
        category: req.body.category,
        rate: req.body.rate,
        txn_history: []
    }

    try {
        await collectionCol.insertOne(collection);
    } catch (err) {
        res.send({
            status_code: ErrorCode.INTERNAL_SERVER,
            status: Status.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
    res.send({
        status_code: ErrorCode.OK,
        status: Status.OK,
        message: "Create new collection successfully!"
    })
}

export async function getOneCollection(req, res) {
    const query = {
        address: req.params.address
    }

    let collection;

    try {
        collection = await collectionCol.findOne(query);
        if (collection !== null) {
            res.send({
                status_code: ErrorCode.OK,
                status: Status.OK,
                message: "Get collection successfully!",
                data: await enrichCollectionData(collection),
            });
        } else {
            res.send({
                status_code: ErrorCode.BAD_REQUEST,
                status: Status.BAD_REQUEST,
                message: "Fail to get collection!",
            });
        }
    } catch (err) {
        res.send({
            status_code: ErrorCode.INTERNAL_SERVER,
            status: Status.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }

}

export async function getAllCollections(req, res) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);


    // page: 1 => end

    let collections = [];

    const cursor = collectionCol.find()
        .skip(page * limit - limit)
        .limit(limit);

    for await (const collection of cursor) {
        try {
            let c = await enrichCollectionData(collection);
            collections.push(c);
        } catch (err) {
            res.send({
                status_code: ErrorCode.INTERNAL_SERVER,
                status: Status.INTERNAL_SERVER_ERROR,
                message: err.message
            });
        }
    }

    res.send({
        status_code: ErrorCode.OK,
        status: Status.OK,
        message: "Get collections successfully!",
        data: collections
    });
}


export async function updateCollection(req, res) {
    const filter = {
        address: req.params.address
    }
    const updateCol = {
        $set: {
            updated: Date.now(),
            thumbnail: req.body.thumbnail,
            description: req.body.description,
            title: req.body.title,
            category: req.body.category,
            rate: req.body.rate,
        }
    }

    let result;

    try {
        result = await collectionCol.findOneAndUpdate(filter, updateCol);
        if (result.value !== null) {
            res.send({
                status_code: ErrorCode.OK,
                status: Status.OK,
                message: "Update collection successfully!",
            });
        } else {
            res.send({
                status_code: ErrorCode.BAD_REQUEST,
                status: Status.BAD_REQUEST,
                message: "Failed to update collection!",
            });
        }
    } catch (err) {
        res.send({
            status_code: ErrorCode.INTERNAL_SERVER,
            status: Status.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}

export async function deleteCollection(req, res) {
    const query = {
        address: req.params.address
    }

    let result;

    try {
        result = await collectionCol.deleteOne(query);
        if (result.deletedCount === 1) {
            res.send({
                status_code: ErrorCode.OK,
                status: Status.OK,
                message: "Delete collection successfully!",
            });
        } else {
            res.send({
                status_code: ErrorCode.BAD_REQUEST,
                status: Status.BAD_REQUEST,
                message: "Fail to delete collection!",
            });
        }
    } catch {
        console.log("Fail to delete collection!");
        res.send({
            status_code: ErrorCode.INTERNAL_SERVER,
            status: Status.INTERNAL_SERVER_ERROR,
            message: "Fail to delete collection!",
        });
    }
}



export async function getListCollectionByCategory(req, res) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const filter = {
        category: req.params.category
    }

    let collections = [];

    const cursor = collectionCol.find(filter)
        .skip(page * limit - limit)
        .limit(limit);

    for await (const collection of cursor) {
        try {
            let c = await enrichCollectionData(collection);
            collections.push(c);
        } catch (err) {
            res.send({
                status_code: ErrorCode.INTERNAL_SERVER,
                status: Status.INTERNAL_SERVER_ERROR,
                message: err.message
            });
        }
    }

    res.send({
        status_code: ErrorCode.OK,
        status: Status.OK,
        message: "Get collections successfully!",
        data: collections
    });
}

export async function getListCollectionByUser(req, res) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const filter = {
        creator: req.params.user
    }

    let collections = [];

    const cursor = collectionCol.find(filter)
        .skip(page * limit - limit)
        .limit(limit);

    for await (const collection of cursor) {
        try {
            let c = await enrichCollectionData(collection);
            collections.push(c);
        } catch (err) {
            res.send({
                status_code: ErrorCode.INTERNAL_SERVER,
                status: Status.INTERNAL_SERVER_ERROR,
                message: err.message
            });
        }
    }

    res.send({
        status_code: ErrorCode.OK,
        status: Status.OK,
        message: "Get collections successfully!",
        data: collections
    });
}