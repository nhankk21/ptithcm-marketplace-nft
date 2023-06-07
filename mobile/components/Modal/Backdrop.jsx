import { TouchableOpacity, Text, Dimensions } from 'react-native';
import React from 'react';

import { COLORS } from '../../constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

/**
 * forceClose: hidden when press on backdrop
 */
const Backdrop = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        backgroundColor: COLORS.black,
        zIndex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.5,
        ...style,
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Backdrop;
