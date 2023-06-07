import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { EthPrice, NFTTitle } from '@components/NFT/SubInfo';
import { RectButton } from '@components/common/Button';
import ConfirmModal from '@components/common/ConfirmModal';
import { FONTS, SHADOWS, SIZES, screenWidth } from '@constants';
import { COLORS, ScreenName } from '@constants/index';
import withModal from '@hoc/withModal';
import { useNavigation } from '@react-navigation/native';
import useIsOwn from '@hooks/useIsOwn';

const NFTCard = ({
  url,
  name,
  price,
  owner,
  listed,
  address: nftAddress,
  setModal,
  ...rest
}) => {
  const navigation = useNavigation();
  const { isListed, isCancel, isOwn } = useIsOwn({
    listed,
    ownerAddress: owner,
  });

  if (!isOwn && isListed) return null;

  const handleDetail = () => {
    navigation.navigate(ScreenName.NFT, {
      data: {
        thumbnail: url,
        name,
        price,
        owner,
        listed,
        nftAddress,
        isListed,
        isCancel,
        ...rest,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={handleDetail}
      style={{
        maxWidth: 190,
        width: (screenWidth - SIZES.base * 4) / 2,
        marginHorizontal: SIZES.base,
        borderRadius: SIZES.base,
        overflow: 'hidden',
        marginBottom: SIZES.medium,
        position: 'relative',
        ...SHADOWS.dark,
      }}
    >
      <View>
        <Image
          source={{ uri: url }}
          resizeMode="cover"
          style={{ width: '100%', height: 190 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: SIZES.base,
          paddingHorizontal: SIZES.medium,
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          paddingBottom: SIZES.large,
        }}
      >
        <NFTTitle title={name} numberOfLines={2} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          paddingHorizontal: SIZES.base / 1.5,
          paddingVertical: SIZES.base / 2,
          borderRadius: SIZES.base / 2,
          backgroundColor: COLORS.white,
        }}
      >
        <EthPrice
          price={price}
          priceStyle={{ iconWidth: 14, iconHeight: 14, fontSize: 10 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cancelText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
  },
});

export default withModal(NFTCard);
