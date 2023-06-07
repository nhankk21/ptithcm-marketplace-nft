import {
  Authentication,
  Collection,
  ForgotPassword,
  Login,
  Home,
  MyAsset,
  Profile,
  Register,
  NFT,
} from '../screens';

import ScreenName from './screen-name';

export const paths = [
  { name: ScreenName.Authen, component: Authentication },
  { name: ScreenName.Login, component: Login },
  { name: ScreenName.Register, component: Register },
  { name: ScreenName.ForgotPassword, component: ForgotPassword },
  { name: ScreenName.Home, component: Home },
  { name: ScreenName.Collection, component: Collection },
  { name: ScreenName.Profile, component: Profile },
  { name: ScreenName.MyAsset, component: MyAsset },
  { name: ScreenName.NFT, component: NFT },
];
