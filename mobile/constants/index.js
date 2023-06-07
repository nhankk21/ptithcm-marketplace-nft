import { Dimensions } from 'react-native';

export { default as assets } from './assets';
export { default as ScreenName } from './screen-name';
export { default as CURRENCY } from './currency';
export * from './dummy';
export * from './theme';
export const screenWidth = Dimensions.get('window').width;

/**
 * This value is the folders of image on firebase
 */
export const UploadImageType = {
  Collection: 'collections',
  NFT: 'nfts',
  Avatar: 'avatars',
};

export const CollectionType = [];
