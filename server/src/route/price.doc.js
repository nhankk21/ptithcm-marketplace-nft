const getPrice = {
    tags: ["Price"],
    summary: "Get price of NFT",
    description: "API get price of NFT. Price is calculated by trading volume from last one hour to current.",
    responses: {
        "OK": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "OK",
                            message: "Get price successfully!",
                            data: 0,
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

const getListPrice = {
    tags: ["Price"],
    summary: "Get list price of NFT",
    description: "API get list price of NFT. Price is calculated by trading volume from last one hour to current. List price is calculated by each hour price in 24 hours.",
    responses: {
        "OK": {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status: "OK",
                            message: "Get list price successfully!",
                            data: [0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0,],
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

const getNFTPrice = {
    tags: ["Price"],
    summary: "Get price of NFT",
    description: "API get price of NFT",
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
                            message: "Get nft list price successfully!",
                            data: [0],
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
                            error: "string",
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
    },
}



const priceRouteDoc = {
    "/price": {
        get: getPrice,
    },
    "/price/list": {
        get: getListPrice,
    },
    "/price/nft": {
        post: getNFTPrice,
    },
}

export default priceRouteDoc;