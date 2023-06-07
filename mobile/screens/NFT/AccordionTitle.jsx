import { View, Text } from 'react-native';
import React from 'react';
import assets from '@constants/assets';
import { SIZES, FONTS, COLORS } from '@constants/theme';

const IconType = {
  price: assets.graph,
  action: assets.history,
  description: assets.description,
};

const _iconStyle = {
  fill: COLORS.primary,
};

const AccordionTitle = ({
  type = 'price',
  iconStyle = { ..._iconStyle },
  title = 'Replace title props',
}) => {
  const Icon = IconType[type];
  return (
    <View style={{ flexDirection: 'row', gap: SIZES.base }}>
      <Icon {...iconStyle} />
      <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.medium }}>
        {title}
      </Text>
    </View>
  );
};

export default AccordionTitle;
