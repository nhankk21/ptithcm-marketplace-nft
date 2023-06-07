import { EthPrice, NFTTitle, RectButton } from '@components/index';
import { screenWidth } from '@constants/index';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import useLazyLoad from '@hooks/useLazyLoad';
import { nftAPI } from '@services/api';
import { getAllNFTCache, getAllNFTOfCollectionKey } from '@services/queryKeys';

import { CircleButton } from '@components';
import NFTCard from '@components/NFT/NFTCard';
import { CollectionAssetTitle } from '@components/Profile/CollectionSection/CollectionAsset';
import { SHADOWS, SIZES, assets } from '@constants';
import { COLORS } from '@constants/theme';

const MyAssetHeader = ({ image, name, description }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ width: '100%', height: 300 }}>
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <CircleButton
        top={SIZES.small}
        left={SIZES.small}
        imgUrl={assets.left}
        handlePress={navigation.goBack}
      />
      <View
        style={{ marginHorizontal: SIZES.small, marginVertical: SIZES.medium }}
      >
        <CollectionAssetTitle name={name} />
        <Text>{description}</Text>
      </View>
    </>
  );
};

const NFTItem = ({ url, name, price }) => {
  return (
    <View
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
          paddingBottom: SIZES.small,
          flexDirection: 'row',
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
    </View>
  );
};

const MyAsset = ({ route }) => {
  const { data } = route.params;
  const {
    dataList,
    useQueryState: { isFetching },
    isEndRef,
    isFirstLoadingRef,
    handleRefetch,
    handlePagination,
  } = useLazyLoad({
    initPagination: { page: 1, limit: 5 },
    queryFn: (pagination) =>
      nftAPI.getByCollection({
        ...pagination,
        collectionAddress: data.address,
      }),
    queryKeyFn: getAllNFTOfCollectionKey,
    cachedKeyFn: getAllNFTCache,
  });

  return (
    <SafeAreaView style={{ position: 'relative' }}>
      <FlatList
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={dataList}
        renderItem={({ item }) => (
          <NFTItem url={item.url} name={item.name} price={item.price} />
        )}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <MyAssetHeader {...data} />
            {dataList?.length === 0 && !isFetching && (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: SIZES.large,
                  color: COLORS.gray,
                }}
              >
                Do not have any nft of collection
              </Text>
            )}
          </>
        }
        ListFooterComponent={
          isFetching &&
          !isEndRef.current && (
            <ActivityIndicator color={COLORS.primary} size="large" />
          )
        }
        onEndReached={
          !isEndRef.current &&
          !isFetching &&
          !isFirstLoadingRef.current &&
          (() => handlePagination())
        }
        onRefresh={handleRefetch}
        refreshing={false}
        contentContainerStyle={{ paddingBottom: SIZES.medium }}
      />
    </SafeAreaView>
  );
};

export default MyAsset;
