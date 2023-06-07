const createCollection = {
    tags: ["Collection"],
    summary: "Create new collection",
    description: "API create new collection",
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
                        creator: {
                            type: "string",
                            description: "Creator of collection",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        thumbnail: {
                            type: "string",
                            description: "Thumbnail of collection",
                            example: "https://i.seadn.io/gcs/files/4862a60d8de305b9ae6115bef73e0623.gif?auto=format&dpr=1&w=256",
                        },
                        description: {
                            type: "string",
                            description: "Description of collection",
                            example: "This is description",
                        },
                        title: {
                            type: "string",
                            description: "Title of collection",
                            example: "This is title",
                        },
                        category: {
                            type: "string",
                            description: "Category of collection (gaming, art, memberships, photography)",
                            example: "gaming",
                        },
                        rate: {
                            type: "number",
                            description: "Creator earning",
                            example: 1.2,
                        },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status_code: 200,
                            status: "OK",
                            message: "Create new collection successfully!",
                        },
                    },
                },
            },
        },
        500: {
            description: "INTERNAL SERVER ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status_code: 500,
                            status: "INTERNAL_SERVER_ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const get1Collection = {
    tags: ["Collection"],
    summary: "Get a collection",
    description: "Get a collection by address in path",
    parameters: [
        {
            name: "address",
            in: "path",
            description: "Address of collection",
            type: "string",
            example: "0xe0ef8764b6a5dd02e5e6652daaa8e79b813528b9",
        },
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 200,
                            "status": "OK",
                            "message": "Get collection successfully!",
                            "data": {
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
                                "txn_history": [],
                                "username": "string",
                            }
                        },
                    },
                },
            },
        },
        400: {
            description: "BAD REQUEST",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 400,
                            "status": "BAD_REQUEST",
                            "message": "Failed to get collection!"
                        },
                    },
                },
            },
        },
        500: {
            description: "INTERNAL SERVER ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 500,
                            "status": "INTERNAL_SERVER_ERROR",
                            "message": "string",
                        },
                    },
                },
            },
        },
    },
}

const getListCollection = {
    tags: ["Collection"],
    summary: "Get list of collection",
    description: "Paginate and get list collection",
    parameters: [
        {
            name: "page",
            in: "query",
            description: "number of page",
            type: "number",
            example: 1,
        },
        {
            name: "limit",
            in: "query",
            description: "number of item in a page",
            type: "number",
            example: 10,
        },
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 200,
                            "status": "OK",
                            "message": "Get collections successfully!",
                            "data": [
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
                                    "txn_history": [],
                                    "username": "string",
                                },
                            ],
                        },
                    },
                },
            },
        },
        500: {
            description: "INTERNAL SERVER ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 500,
                            "status": "INTERNAL_SERVER_ERROR",
                            "message": "string",
                        }
                    }
                }
            }
        },
    },
}

const updateCollection = {
    tags: ["Collection"],
    summary: "Update a collection",
    description: "Update a collection",
    security: [
        {
            bearerAuth: [],
        }
    ],
    parameters: [
        {
            name: "address",
            in: "path",
            description: "address of collection",
            type: "string",
            example: "0xe0ef8764b6a5dd02e5e6652daaa8e79b813528b9"
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        thumbnail: {
                            type: "string",
                            description: "Thumbnail of collection",
                            example: "https://i.seadn.io/gcs/files/4862a60d8de305b9ae6115bef73e0623.gif?auto=format&dpr=1&w=256",
                        },
                        description: {
                            type: "string",
                            description: "Description of collection",
                            example: "This is description",
                        },
                        title: {
                            type: "string",
                            description: "Title of collection",
                            example: "This is title",
                        },
                        category: {
                            type: "string",
                            description: "Category of collection (gaming, art, memberships, photography)",
                            example: "gaming",
                        },
                        rate: {
                            type: "number",
                            description: "Creator earning",
                            example: 1.2,
                        },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status_code: 200,
                            status: "OK",
                            message: "Update collection successfully!",
                        },
                    },
                },
            },
        },
        400: {
            description: "BAD REQUEST",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status_code: 400,
                            status: "BAD_REQUEST",
                            message: "Failed to update collection!",
                        },
                    },
                },
            },
        },
        500: {
            description: "INTERNAL SERVER ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status_code: 500,
                            status: "INTERNAL_SERVER_ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const deleteCollection = {
    tags: ["Collection"],
    summary: "Delete a collection",
    description: "Delete a collection by address in path",
    security: [
        {
            bearerAuth: [],
        }
    ],
    parameters: [
        {
            name: "address",
            in: "path",
            description: "address of collection",
            type: "string",
            example: "0xe0ef8764b6a5dd02e5e6652daaa8e79b813528b9",
        },
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status_code: 200,
                            status: "OK",
                            message: "Delete collection successfully!",
                        },
                    },
                },
            },
        },
        400: {
            description: "BAD REQUEST",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status_code: 400,
                            status: "BAD REQUEST",
                            message: "Failed to update collection!",
                        },
                    },
                },
            },
        },
        500: {
            description: "INTERNAL SERVER ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            status_code: 500,
                            status: "INTERNAL_SERVER_ERROR",
                            message: "string",
                        },
                    },
                },
            },
        },
    },
}

const getListCollectionByUser = {
    tags: ["Collection"],
    summary: "Get list of collection by user",
    description: "Paginate and get list collection by user",
    parameters: [
        {
            name: "user",
            in: "path",
            description: "address of collection",
            type: "string",
            example: "0xe0ef8764b6a5dd02e5e6652daaa8e79b813528b9",
        },
        {
            name: "page",
            in: "query",
            description: "number of page",
            type: "number",
            example: 1,
        },
        {
            name: "limit",
            in: "query",
            description: "number of item in a page",
            type: "number",
            example: 10,
        },
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 200,
                            "status": "OK",
                            "message": "Get collections successfully!",
                            "data": [
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
                                    "txn_history": [],
                                    "username": "string",
                                },
                            ],
                        },
                    },
                },
            },
        },
        500: {
            description: "INTERNAL SERVER ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 500,
                            "status": "INTERNAL_SERVER_ERROR",
                            "message": "string",
                        }
                    }
                }
            }
        },
    },
}

const getListCollectionByCategory = {
    tags: ["Collection"],
    summary: "Get list of collection by category",
    description: "Paginate and get list collection by category",
    parameters: [
        {
            name: "category",
            in: "path",
            description: "category of collection",
            type: "string",
            example: "memberships",
        },
        {
            name: "page",
            in: "query",
            description: "number of page",
            type: "number",
            example: 1,
        },
        {
            name: "limit",
            in: "query",
            description: "number of item in a page",
            type: "number",
            example: 10,
        },
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 200,
                            "status": "OK",
                            "message": "Get collections successfully!",
                            "data": [
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
                                    "txn_history": [],
                                    "username": "string",
                                },
                            ],
                        },
                    },
                },
            },
        },
        500: {
            description: "INTERNAL SERVER ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 500,
                            "status": "INTERNAL_SERVER_ERROR",
                            "message": "string",
                        }
                    }
                }
            }
        },
    },
}

const getListNFT = {
    tags: ["Collection"],
    summary: "Get NFT list of collection",
    description: "Paginate and get NFT list of collection",
    parameters: [
        {
            name: "collection",
            in: "path",
            description: "address of collection",
            type: "string",
            example: "0df3rks93fksehfi37hfisydg",
        },
        {
            name: "page",
            in: "query",
            description: "number of page",
            type: "number",
            example: 1,
        },
        {
            name: "limit",
            in: "query",
            description: "number of item in a page",
            type: "number",
            example: 10,
        },
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 200,
                            "status": "OK",
                            "message": "Get collections successfully!",
                            "data": [
                                {
                                    "_id": "string",
                                    "address": "string",
                                    "owner": "string",
                                    "creator": "string",
                                    "collection": "string",
                                    "created": 1683976114853,
                                    "updated": 1683976114853,
                                    "url": "urlstring",
                                    "description": "string",
                                    "price": 0,

                                },
                            ],
                        },
                    },
                },
            },
        },
        500: {
            description: "INTERNAL SERVER ERROR",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "status_code": 500,
                            "status": "INTERNAL_SERVER_ERROR",
                            "message": "string",
                        }
                    }
                }
            }
        },
    },
}

const collectionRouteDoc = {
    "/collection/create": {
        post: createCollection,
    },
    "/collection/:address": {
        get: get1Collection,
        put: updateCollection,
        delete: deleteCollection,
    },
    "/collection/": {
        get: getListCollection,
    },
    "/collection/user/:user": {
        get: getListCollectionByUser,
    },
    "/collection/category/:category": {
        get: getListCollectionByCategory,
    },
    "/collection/:collection/list_nft": {
        get: getListNFT,
    }
}

export default collectionRouteDoc;