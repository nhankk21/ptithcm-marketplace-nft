import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { DetailsDesc, FocusedStatusBar } from '@components';
import { Header } from '@components/Collection';
import NFTCard from '@components/NFT/NFTCard';
import { COLORS, FONTS, SIZES } from '@constants';
import useLazyLoad from '@hooks/useLazyLoad';
import useUserInfo from '@hooks/useUserInfo';
import { nftAPI } from '@services/api';
import { getAllNFTCache, getAllNFTOfCollectionKey } from '@services/queryKeys';

const Collection = ({ route, navigation }) => {
  const { address } = useUserInfo();
  const { data } = route.params;
  const [collection, setCollection] = useState(data);
  const isOwn = address === collection.creator;

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
        collectionAddress: collection.address,
      }),
    queryKeyFn: getAllNFTOfCollectionKey,
    cachedKeyFn: getAllNFTCache,
  });

  console.log(address);

  const nftList = dataList?.filter(
    ({ owner, listed }) => owner === address || listed
  );

  console.log(nftList?.[0]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <FlatList
        numColumns={2}
        horizontal={false}
        data={nftList}
        renderItem={({ item }) => {
          return <NFTCard {...item} />;
        }}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <Header data={collection} navigation={navigation} />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc
                data={collection}
                isOwn={isOwn}
                setCollection={setCollection}
              />
              {nftList.length > 0 ? (
                <Text
                  style={{
                    fontSize: SIZES.extraLarge,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                  }}
                >
                  NFTs
                </Text>
              ) : (
                !isFetching && (
                  <Text
                    style={{
                      color: COLORS.gray,
                      textAlign: 'center',
                    }}
                  >
                    NFT of collection is empty!
                  </Text>
                )
              )}
            </View>
          </React.Fragment>
        )}
        ListFooterComponent={
          isFetching && (
            <ActivityIndicator color={COLORS.primary} size="large" />
          )
        }
        refreshing={false}
        onRefresh={handleRefetch}
        onEndReached={
          !isEndRef.current &&
          !isFirstLoadingRef.current &&
          !isFetching &&
          (() => handlePagination())
        }
      />
    </SafeAreaView>
  );
};

export default Collection;
