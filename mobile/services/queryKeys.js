// Authentication
export const loginKey = (keys = []) => ['login', ...keys];
export const registerKey = (keys = []) => ['register', ...keys];
export const forgotPasswordKey = (keys = []) => ['forgotPassword', ...keys];

// Collection
export const getAllCollectionKey = (keys = []) => ['collection', ...keys];
export const allCollectionCache = () => ['all_collection_cached'];
export const getAllCollectionByUserKey = (keys = []) => ['collection', ...keys];

// NFT
export const getAllNFTOfCollectionKey = (keys = []) => ['nft', ...keys];
export const getNftHistory = (keys = []) => ['history', ...keys];
export const getAllNFTCache = () => ['getAllNFTCache'];
