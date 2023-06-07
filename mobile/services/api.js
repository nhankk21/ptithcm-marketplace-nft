import axios from 'axios';
import { loginKey } from './queryKeys';
const BASE_URL = 'https://be-node.onrender.com';

const Url = {
  Authentication: {
    LOGIN: '/wallet/login',
    REGISTER: '/wallet/create',
    FORGOT_PASSWORD: '/wallet/forgot_password',
  },
  Collection: ((prefix) => ({
    GET: `/${prefix}/get1collection`,
    GET_ALL: `/${prefix}`,
    CREATE: `/${prefix}/create`,
    UPDATE: (collectionAddress) => `/${prefix}/${collectionAddress}`,
    DELETE: `/${prefix}/delete`,
    GET_ALL_BY_USER: (userAddress) => `/${prefix}/user/${userAddress}`,
    GET_ALL_BY_CATEGORY: (category) =>
      `/${prefix}/get_all_collections/${category}`,
    TRENDING: `/trending/${prefix}`,
  }))('collection'),
  NFT: {
    CREATE: '/nft/create',
    GET_HISTORY: '/history/nft',
    GET_BY_COLLECTION: (collectionAddress) =>
      `collection/${collectionAddress}/list_nft`,
    TRADE: '/nft/trade',
    LIST: '/nft/listing',
    DE_LIST: '/nft/delist',
    MINT: '/nft/create',
    GET_LIST_PRICE: '/price/nft',
    GET_PRICE: '/price',
  },
  Profile: {
    Transfer: '/wallet/transfer',
    Deposit: '/wallet/deposit',
    Exchange: '/wallet/exchange',
    Withdraw: '/wallet/withdraw',
  },
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
});

export const setupPrivateRequest = (queryClient) =>
  privateRequest.interceptors.request.use((config) => {
    const queryData = queryClient.getQueryData(loginKey());
    config.headers['authorization'] = `Bear ${queryData?.jwt}`;
    return config;
  });

// MOCK instance
const mockRequest = axios.create({
  baseURL: 'https://642b83b1208dfe2547198383.mockapi.io',
});

// [AUTHENTICATION]
export const authenticationAPI = {
  login: ({ address, password }, config) =>
    publicRequest.post(Url.Authentication.LOGIN, { address, password }, config),
  register: ({ password, username }, config) =>
    publicRequest.post(
      Url.Authentication.REGISTER,
      { password, username },
      config
    ),
  forgotPassword: ({ privateKey, newPassword }, config) =>
    publicRequest.post(
      Url.Authentication.FORGOT_PASSWORD,
      { private_key: privateKey, new_password: newPassword },
      config
    ),
};
// [COLLECTION]
export const collectionAPI = {
  create: (data, config) =>
    privateRequest.post(
      Url.Collection.CREATE,
      { ...data, category: 'photography' },
      config
    ),
  update: (data, config) => {
    return privateRequest.put(
      Url.Collection.UPDATE(data.collectionAddress),
      data,
      config
    );
  },
  info: () => privateRequest.post(Url.Collection.INFO),
  getAll: ({ page = 1, limit = 5 } = {}, config) =>
    privateRequest.get(Url.Collection.GET_ALL, {
      params: {
        page,
        limit,
      },
      ...config,
    }),
  getAllByUser: ({ page = 1, limit = 5, userAddress } = {}, config) =>
    privateRequest.get(Url.Collection.GET_ALL_BY_USER(userAddress), {
      params: {
        page,
        limit,
      },
      ...config,
    }),
  getTrending: () => privateRequest.get(Url.Collection.TRENDING),
};

// [NFT]
export const nftAPI = {
  create: (data, config) => privateRequest.post(Url.NFT.CREATE, data, config),
  getHistory: ({ page = 1, limit = 5, nftAddress } = {}, config) =>
    privateRequest.post(
      Url.NFT.GET_HISTORY,
      {
        nft_address: nftAddress,
        page,
        limit,
      },
      config
    ),
  getByCollection: (
    { page = 1, limit = 5, collectionAddress } = {},
    config = {}
  ) =>
    privateRequest.get(Url.NFT.GET_BY_COLLECTION(collectionAddress), {
      params: {
        page,
        limit,
      },
      ...config,
    }),
  trade: ({ buyerAddress, sellerAddress, nftAddress }) =>
    privateRequest.post(Url.NFT.TRADE, {
      buyer: buyerAddress,
      seller: sellerAddress,
      nft_address: nftAddress,
    }),
  list: ({ nftAddress, ownerAddress }) =>
    privateRequest.put(Url.NFT.LIST, {
      nft_address: nftAddress,
      owner_address: ownerAddress,
    }),
  deList: ({ nftAddress, ownerAddress }) =>
    privateRequest.put(Url.NFT.DE_LIST, {
      nft_address: nftAddress,
      owner_address: ownerAddress,
    }),
  getListPrice: (data) => privateRequest.post(Url.NFT.GET_LIST_PRICE, data),
  getPrice: () => privateRequest.get(Url.NFT.GET_PRICE),
};

export const profileAPI = {
  transfer: (
    { from = '', to = '', type = '', nftAddress = '', amount = 0 } = {},
    config
  ) =>
    privateRequest.post(
      Url.Profile.Transfer,
      {
        from,
        to,
        type,
        transferred: nftAddress,
        amount,
      },
      config
    ),
  deposit: (data) => privateRequest.post(Url.Profile.Deposit, data),
  exchange: (data) => privateRequest.post(Url.Profile.Exchange, data),
  withdraw: (data) => privateRequest.post(Url.Profile.Withdraw, data),
};
