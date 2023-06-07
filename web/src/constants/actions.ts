export const UserActionTypes = {
    LOGOUT: "user/logout",
    LOGIN: "user/loginRequest",
    LOGIN_SUCCESS: "user/loginSuccess",
    LOGIN_FAIL: "user/loginFailure",
    LOAD_USER: "user/loadUserRequest",
    LOAD_USER_SUCCESS: "user/loadUserSuccess",
    LOAD_USER_FAIL: "user/loadUserFailure",
};

export const ProductActionsTypes = {
    GET_PRODUCT: "products/getProductRequest",
    GET_PRODUCT_SUCCESS: "products/getProductSuccess",
    GET_PRODUCT_FAIL: "products/getProductFailure",
    GET_PRODUCT_BY_CATEGORY: "products/getProductByCategoryRequest",
    GET_PRODUCT_BY_CATEGORY_SUCCESS: "products/getProductByCategorySuccess",
    GET_PRODUCT_BY_CATEGORY_FAIL: "products/getProductByCategoryFailure",
};

export const nftsActionTypes = {
    GET_NFT: "nfts/getNftRequest",
    GET_NFT_SUCCESS: "nfts/getNftSuccess",
    GET_NFT_FAIL: "nfts/getNftFailure",
    BUY_NFT: "nfts/buyNftRequest",
    BUY_NFT_FAIL: "nfts/buyNftFailure",
    GET_COLLECTION: "nfts/getCollectionRequest",
    GET_COLLECTION_SUCCESS: "nfts/getCollectionSuccess",
    GET_COLLECTION_FAIL: "nfts/getCollectionFailure",
};

export const CartActionsTypes = {
    CHECK_CART: "cart/checkCart",
    SET_CART: "cart/setCart",
    CLEAR_CART: "cart/clearCart",
    ADD_CART: "cart/addCart",
    REMOVE_CART: "cart/removeCart",
};

export const CollectionActionsTypings = {
    GET_NEW: "collection/getNewCollectionRequest",
    GET_NEW_SUCCESS: "collection/getNewCollectionSuccess",
    GET_NEW_FAIL: "getNewCollectionFailure",
};
