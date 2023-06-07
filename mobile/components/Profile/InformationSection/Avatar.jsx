import React from 'react';
import { Image, View } from 'react-native';
import { assets } from '@constants';

const Avatar = ({ params, ...style }) => (
  <View>
    <Image
      source={assets.person01}
      style={{ height: '100%', width: '100%', ...style }}
    />
  </View>
);

export default Avatar;
