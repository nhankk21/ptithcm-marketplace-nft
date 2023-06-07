import React from 'react';
import { View, Image, Text } from 'react-native';

import { SIZES, FONTS, COLORS, SHADOWS, assets } from '@constants';

export const NFTTitle = ({
  title,
  subTitle,
  titleSize,
  subTitleSize,
  numberOfLines = 1,
  ...props
}) => {
  return (
    <View {...props}>
      <Text
        numberOfLines={numberOfLines}
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>
      {subTitle && (
        <Text>
          by{' '}
          <Text
            numberOfLines={numberOfLines}
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: subTitleSize,
              color: COLORS.primary,
            }}
          >
            {subTitle}
          </Text>
        </Text>
      )}
    </View>
  );
};

export const Price = ({
  type = 'eth', // type = 'eth' | 'usd'
  price,
  containerStyle,
  priceStyle = {},
  numberOfLines = 1,
}) => {
  const { iconWidth = 20, iconHeight = 20, ...restStyle } = priceStyle;
  const label =
    type === 'eth' ? (
      <Image
        source={assets.eth}
        resizeMode="contain"
        style={{ width: iconWidth, height: iconHeight, marginRight: 2 }}
      />
    ) : (
      <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.medium }}>$</Text>
    );
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', ...containerStyle }}
    >
      {label}
      <Text
        numberOfLines={numberOfLines}
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.primary,
          ...restStyle,
        }}
      >
        {price}
      </Text>
    </View>
  );
};

export const EthPrice = (props) => {
  return <Price type="eth" {...props} />;
};

export const USDTPrice = ({ priceStyle, ...props }) => {
  return (
    <Price
      type="usdt"
      {...props}
      priceStyle={{ marginLeft: SIZES.base / 2, ...priceStyle }}
    />
  );
};

const ImageCmp = ({ imgUrl, index }) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={{
        width: 48,
        height: 48,
        marginLeft: index === 0 ? 0 : -SIZES.font,
      }}
    />
  );
};

export const People = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[assets.person02, assets.person03, assets.person04].map(
        (imgUrl, index) => (
          <ImageCmp imgUrl={imgUrl} index={index} key={`People-${index}`} />
        )
      )}
    </View>
  );
};

export const EndDate = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: '50%',
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}
      >
        Ending in
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        12h 30m
      </Text>
    </View>
  );
};

export const SubInfo = () => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <People />
      <EndDate />
    </View>
  );
};
