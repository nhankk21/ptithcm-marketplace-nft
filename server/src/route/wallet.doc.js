const getNewWallet = {
    tags: ["Wallet"],
    summary: "Create new wallet/user",
    description: "API create new wallet/user",
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
                        username: {
                            type: "string",
                            description: "Username of wallet",
                            example: "abc",
                        },
                        password: {
                            type: "string",
                            description: "Password of wallet",
                            example: "123",
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
                            message: "Create new wallet successfully!",
                            data: {
                                "address": "string",
                                "private_key": "string",
                                "username": "string",
                                "fiat_balance": 0,
                                "token_balance": 0,
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

const login = {
    tags: ["Wallet"],
    summary: "Login to web/application",
    description: "API login to web/application",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        address: {
                            type: "string",
                            description: "Address of wallet",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        password: {
                            type: "string",
                            description: "Password of wallet",
                            example: "123",
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
                            message: "Login sucessfully!",
                            data: {
                                "jwt": "string",
                                "address": "string",
                                "fiat_balance": 0,
                                "token_balance": 0,
                                "username": "string",
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

const forgotPassword = {
    tags: ["Wallet"],
    summary: "Forgot password",
    description: "API forgot password",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        private_key: {
                            type: "string",
                            description: "Private key of wallet",
                            example: "wolf gasp blush pill width vanish corn glare fold know advice despair",
                        },
                        new_password: {
                            type: "string",
                            description: "New password of wallet",
                            example: "123",
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
                            message: "Password has been reset!",
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

const transfer = {
    tags: ["Wallet"],
    summary: "Transfer money to another wallet",
    description: "API transfer money to another wallet",
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
                        address: {
                            type: "string",
                            description: "Address that is tranfered to",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        amount: {
                            type: "number",
                            description: "Amount of transfer",
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
                            message: "Transfered successfully!",
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

const withdraw = {
    tags: ["Wallet"],
    summary: "Withdraw money",
    description: "API withdraw money",
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
                        address: {
                            type: "string",
                            description: "Address withdraw money",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        amount: {
                            type: "number",
                            description: "Amount of withdraw",
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
                            message: "Withdraw successfully!",
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

const deposit = {
    tags: ["Wallet"],
    summary: "Deposit money",
    description: "API deposit money",
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
                        address: {
                            type: "string",
                            description: "Address deposit money",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        amount: {
                            type: "number",
                            description: "Amount of transfer",
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
                            message: "Deposited successfully!",
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

const exchange = {
    tags: ["Wallet"],
    summary: "Deposit money",
    description: "API exchange money",
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
                        address: {
                            type: "string",
                            description: "Address exchange money",
                            example: "0xafb20f42d265dcdac534212e101a8bf1e1be5d8d",
                        },
                        exchange_to: {
                            type: "string",
                            description: "Type of exchange (Token or Fiat)",
                            example: "Token",
                        },
                        amount: {
                            type: "number",
                            description: "Amount of exchange",
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
                            message: "Exchanged successfully!",
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

const walletRouteDoc = {
    "/wallet/create": {
        post: getNewWallet,
    },
    "/wallet/login": {
        post: login,
    },
    "/wallet/forgot_password": {
        post: forgotPassword,
    },
    "/wallet/transfer": {
        post: transfer,
    },
    "/wallet/withdraw": {
        post: withdraw,
    },
    "/wallet/deposit": {
        post: deposit,
    },
    "/wallet/exchange": {
        post: exchange,
    },

}

export default walletRouteDoc;