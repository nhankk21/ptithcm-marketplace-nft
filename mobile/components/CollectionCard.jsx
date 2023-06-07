import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Image, View } from 'react-native';

import { NFTTitle } from '@components/NFT/SubInfo';
import { RectButton } from '@components/common/Button';
import { COLORS, SHADOWS, SIZES } from '@constants';
import { ScreenName } from '@constants/index';

const CollectionCard = ({ data, setDataList }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: '100%',
          height: 250,
        }}
      >
        <Image
          source={{ uri: data.thumbnail }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
        <BlurView
          intensity={70}
          tint="light"
          style={{
            justifyContent: 'space-between',
            position: 'absolute',
            flexDirection: 'row',
            left: SIZES.medium,
            right: SIZES.medium,
            bottom: SIZES.small,
            paddingVertical: SIZES.small,
            paddingHorizontal: SIZES.medium,
            borderRadius: SIZES.large,
          }}
        >
          <NFTTitle
            title={data.title}
            subTitle={data.username}
            titleSize={SIZES.large}
            subTitleSize={SIZES.small}
            style={{
              flex: 3,
              zIndex: 1,
              overflow: 'hidden',
              overflowWrap: 'word-wrap',
            }}
          />
          <RectButton
            flex={2}
            borderRadius={SIZES.large}
            zIndex={1}
            paddingHorizontal={20}
            handlePress={() =>
              navigation.navigate(ScreenName.Collection, { data, setDataList })
            }
            text="View collection"
          />
        </BlurView>
      </View>
    </View>
  );
};

export default CollectionCard;
