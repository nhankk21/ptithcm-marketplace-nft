import { Image, View, FlatList, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useQuery } from 'react-query';
import { collectionAPI } from '@services/api';
import { COLORS, FONTS, SIZES, SHADOWS } from '@constants/theme';
import { screenWidth } from '@constants/index';

const TrendingItem = ({ thumbnail, title }) => {
  return (
    <View
      style={{
        width: (screenWidth - SIZES.base * 3 - SIZES.medium * 2) / 2,
        marginHorizontal: SIZES.base,
        borderTopLeftRadius: SIZES.base,
        borderTopRightRadius: SIZES.base,
        overflow: 'hidden',
        marginBottom: SIZES.medium,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          height: 150,
          overflow: 'hidden',
        }}
      >
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={{ uri: thumbnail }}
        />
      </View>
      <Text
        style={{
          paddingVertical: SIZES.medium,
          paddingHorizontal: SIZES.font,
          backgroundColor: COLORS.white,
          fontSize: SIZES.font,
          fontFamily: FONTS.semiBold,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const TrendingCollection = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['trending'],
    queryFn: collectionAPI.getTrending,
  });
  const trendingList = data?.data?.data;

  return (
    <View style={{ flex: 1, height: '100%', paddingHorizontal: SIZES.medium }}>
      <FlatList
        data={trendingList}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => <TrendingItem {...item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={{ marginTop: SIZES.base, marginBottom: SIZES.base }}>
            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.large }}>
              Trending Collection
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <>
            {isLoading || isFetching ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <Text
                style={{
                  marginTop: 100,
                  textAlign: 'center',
                  color: COLORS.gray,
                  fontSize: SIZES.small,
                }}
              >
                Do not have any collection
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default TrendingCollection;
