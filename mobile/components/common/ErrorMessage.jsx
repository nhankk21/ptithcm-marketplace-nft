import { View, Text } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '@constants/theme';

const ErrorMessage = ({ errorMsg, ...props }) => {
  return (
    <Text
      style={{
        width: '100%',
        color: COLORS['red-400'],
        fontFamily: FONTS.medium,
        fontSize: SIZES.small,
        ...props,
      }}
      numberOfLines={3}
    >
      {errorMsg}
    </Text>
  );
};

export default ErrorMessage;
