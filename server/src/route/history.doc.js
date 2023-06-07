const historyNft = {
    tags: ["History"],
    summary: "Trading history of NFT",
    description: "API trading history of NFT",
    security: [
        {
            bearerAuth: [],
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        nft_address: {
                            type: "string",
                            description: "Address of NFT",
                            example: "0x1e8059750abf96786127a213961618fc017c2f68",
                        },
                        page: {
                            type: "number",
                            description: "Number of page",
                            example: 1,
                        },
                        limit: {
                            type: "number",
                            description: "Limit item of page",
                            example: 10,
                        },
                    },
                },
            },
        },
    },
    responses: {
        "OK": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "OK",
                            message: "Get history successfully!",
                            data: [
                                {
                                    "_id": "string",
                                    "txn_type": "Purchase",
                                    "buyer": "string",
                                    "seller": "string",
                                    "time": 1684824540516,
                                    "details": {
                                        "at_price": 0,
                                        "nft_address": "string",
                                    },
                                    "txn_hash": "string",
                                },
                            ],
                        },
                    },
                },
            },
        },
        "INVALID": {
            description: "INVALID",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "INVALID",
                            message: "string",
                        },
                    },
                },
            },
        },
        "FAILED": {
            description: "FAILED",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "FAILED",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const trendingCollection = {
    tags: ["History"],
    summary: "Trending collection",
    description: "API get trending collection",
    responses: {
        "OK": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "OK",
                            message: "Get trending collections successfully!",
                            data: [
                                {
                                    "_id": "string",
                                    "address": "string",
                                    "creator": "string",
                                    "created": 1683976114853,
                                    "updated": 1683976114853,
                                    "title": "string",
                                    "thumbnail": "urlstring",
                                    "description": "string",
                                    "category": "string",
                                    "rate": 0,
                                    "txn_history": [
                                        "string",
                                        "string",
                                        "string",
                                    ],
                                    "username": "string",
                                },
                            ],
                        },
                    },
                },
            },
        },
        "FAILED": {
            description: "FAILED",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "FAILED",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const historyRouteDoc = {
    "/history/nft": {
        post: historyNft,
    },
    "/trending/collection": {
        get: trendingCollection,
    },
}

export default historyRouteDoc;