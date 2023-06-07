const createNewNft = {
    tags: ["NFT"],
    summary: "Create new NFT",
    description: "API create new NFT",
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
                        owner: {
                            type: "string",
                            description: "Owner of NFT",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        creator: {
                            type: "string",
                            description: "Creator of NFT",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        collection: {
                            type: "string",
                            description: "Collection of NFT",
                            example: "0xe0ef8764b6a5dd02e5e6652daaa8e79b813528b9",
                        },
                        name: {
                            type: "string",
                            description: "Name of NFT",
                            example: "This is a name",
                        },
                        url: {
                            type: "string",
                            description: "URL of NFT",
                            example: "https://i.seadn.io/gcs/files/0391f595ccc00d073fc5d0d80aa5c2b6.jpg?auto=format&dpr=1&w=256",
                        },
                        description: {
                            type: "string",
                            description: "Description of NFT",
                            example: "This is description",
                        },
                        price: {
                            type: "number",
                            description: "Price of NFT",
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
                            message: "Create new nft successfully!",
                            data: {
                                "address": "string",
                                "owner": "string",
                                "creator": "string",
                                "collection": "string",
                                "name": "string",
                                "url": "urlstring",
                                "description": "string",
                                "price": 10,
                                "listed": true,
                                "created": 1683976114853,
                                "updated": 1683976114853,
                            },
                        },
                    },
                },
            },
        },
        "ERROR": {
            description: "ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const deleteNft = {
    tags: ["NFT"],
    summary: "Delete NFT",
    description: "API delete NFT",
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
                            example: "0xafkjh4j5h2ugc39f4ifjoow3fu9w0f0jf0949044",
                        },
                        owner_address: {
                            type: "string",
                            description: "Owner of NFT",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
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
                            message: "Delete nft successfully!",
                        },
                    },
                },
            },
        },
        "ERROR": {
            description: "ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const updatePrice = {
    tags: ["NFT"],
    summary: "Update NFT price",
    description: "API update NFT price",
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
                        wallet_address: {
                            type: "string",
                            description: "Wallet address of NFT",
                            example: "25d55ad283aa400af464c76d713c07ad",
                        },
                        nft_address: {
                            type: "string",
                            description: "NFT adress of NFT",
                            example: "0x1e8059750abf96786127a213961618fc017c2f68",
                        },
                        price: {
                            type: "number",
                            description: "Price of NFT",
                            example: 0,
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
                            message: "Update price nft successfully!",
                            data: {
                                "address": "string",
                                "price": 0,
                            }
                        },
                    },
                },
            },
        },
        "ERROR": {
            description: "ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const tradeNft = {
    tags: ["NFT"],
    summary: "Trade NFT",
    description: "API trade NFT",
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
                        buyer: {
                            type: "string",
                            description: "buyer of NFT",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        seller: {
                            type: "string",
                            description: "seller of NFT",
                            example: "0xe8e3648f8d5ef2ddc2a04e9e4c2874f10e4f3a74",
                        },
                        nft_address: {
                            type: "string",
                            description: "Address of NFT",
                            example: "0x1e8059750abf96786127a213961618fc017c2f68",
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
                            message: "Buy NFT successfully",
                        },
                    },
                },
            },
        },
        "ERROR": {
            description: "ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "ERROR",
                            message: "string",
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

const listNFT = {
    tags: ["NFT"],
    summary: "List NFT",
    description: "API list NFT",
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
                            description: "Wallet address of NFT",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        owner_address: {
                            type: "string",
                            description: "NFT adress of NFT",
                            example: "0x1e8059750abf96786127a213961618fc017c2f68",
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
                            message: "NFT listing status updated successfully!",
                            data: {
                                "nft_address": "string",
                                "listed": true,
                            },
                        },
                    },
                },
            },
        },
        "ERROR": {
            description: "ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const delistNFT = {
    tags: ["NFT"],
    summary: "Update NFT price",
    description: "API update NFT price",
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
                            description: "Wallet address of NFT",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        owner_address: {
                            type: "string",
                            description: "NFT adress of NFT",
                            example: "0x1e8059750abf96786127a213961618fc017c2f68",
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
                            message: "Delist NFT updated successfully!",
                            data: {
                                "nft_address": "string",
                                "listed": false,
                            },
                        },
                    },
                },
            },
        },
        "ERROR": {
            description: "ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const getNFTInfo = {
    tags: ["NFT"],
    summary: "Get NFT information",
    description: "API get NFT information",
    parameters: [
        {
            name: "nft_address",
            in: "path",
            description: "address of NFT",
            type: "string",
            example: "0x1e8059750abf96786127a213961618fc017c2f68",
        },
    ],
    responses: {
        "OK": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "OK",
                            message: "Get NFT information successfully!",
                            data: {
                                "_id": "string",
                                "address": "string",
                                "owner": "string",
                                "creator": "string",
                                "collection": "string",
                                "name": "string",
                                "url": "urlstring",
                                "description": "string",
                                "price": 10,
                                "listed": true,
                                "created": 1683976114853,
                                "updated": 1683976114853,
                            },
                        },
                    },
                },
            },
        },
        "ERROR": {
            description: "ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const getNFTsBuy = {
    tags: ["NFT"],
    summary: "Get NFTs buy information",
    description: "API get NFTs buy information",
    parameters: [
        {
            name: "owner",
            in: "path",
            description: "Owner of NFT",
            type: "string",
            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
        },
        {
            name: "page",
            in: "query",
            description: "Number of page",
            type: "number",
            example: 1,
        },
        {
            name: "limit",
            in: "query",
            description: "Limit item of page",
            type: "number",
            example: 10,
        },
    ],
    responses: {
        "OK": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "OK",
                            message: "Retrieve bought NFTs successfully!",
                            data: [
                                {
                                    "_id": "string",
                                    "address": "string",
                                    "owner": "string",
                                    "creator": "string",
                                    "collection": "string",
                                    "name": "string",
                                    "url": "urlstring",
                                    "description": "string",
                                    "price": 10,
                                    "listed": true,
                                    "created": 1683976114853,
                                    "updated": 1683976114853,
                                },
                            ]
                        },
                    },
                },
            },
        },
        "ERROR": {
            description: "ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}


const nftRouteDoc = {
    "/nft/information/:nft_address": {
        get: getNFTInfo,
    },
    "/nft/:owner/bought": {
        get: getNFTsBuy,
    },
    "/nft/create": {
        post: createNewNft,
    },
    "/nft/delete": {
        delete: deleteNft,
    },
    "/nft/update_price": {
        put: updatePrice,
    },
    "/nft/trade": {
        post: tradeNft,
    },
    "/nft/listing": {
        put: listNFT,
    },
    "/nft/delist": {
        put: delistNFT,
    },
}

export default nftRouteDoc;