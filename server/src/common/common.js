import crypto from 'crypto';
export const Status = {
    OK: "OK",
    INVALID: "INVALID",
    ERROR: "ERROR",
    NOTFOUND: "NOT_FOUND",
    FAILED: "FAILED",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    BAD_REQUEST: "BAD_REQUEST",
}

export const ErrorCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHENTICATION: 401,
    UN_AUTHORIZATION: 403,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
}

export const AssetType = {
    NFT: "NFT",
    FIAT: "Fiat",
    TOKEN: "Token",
}

export const TxnType = {
    TRANSFER: "Transfer",
    DEPOSIT: "Deposit",
    WITHDRAW: "Withdraw",
    EXCHANGE: "Exchange",
    PURCHASE: "Purchase",
    LIST: "List",
    DELIST: "Delist",
    PRICING: "Pricing",
}

export const AddressType = {
    WALLET: "Wallet",
    NFT: "NFT",
    COLLECTION: "Collection",
}

export function isHexAddess(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
}


export function hashPassword(password) {
    const hash = crypto.createHash('md5').update(password).digest('hex');
    return hash;
}

