import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';

import { CollectionCard, FocusedStatusBar, HomeHeader } from '@components';
import { COLORS } from '@constants';
import useLazyLoad from '@hooks/useLazyLoad';
import { collectionAPI } from '@services/api';
import { allCollectionCache, getAllCollectionKey } from '@services/queryKeys';
import CollectionProvider from 'context/CollectionProvider';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const Home = () => {
  const {
    dataList: collectionList,
    useQueryState: { isFetching, isLoading },
    isEndRef,
    isFirstLoadingRef,
    handleRefetch,
    handlePagination,
    setDataList,
  } = useLazyLoad({
    initPagination: { page: 1, limit: 10 },
    queryFn: collectionAPI.getAll,
    queryKeyFn: getAllCollectionKey,
    cachedKeyFn: allCollectionCache,
  });

  const isFocus = useIsFocused();

  const [filter, setFilter] = useState();
  const queryClient = useQueryClient();

  const collectionFilter = filter
    ? collectionList.filter(({ title }) =>
        title.toLowerCase().includes(filter.toLowerCase())
      )
    : collectionList;

  const handleSearch = (value) => {
    setFilter(value.trim());
  };

  useEffect(() => {
    const dataCached = queryClient.getQueryData(allCollectionCache());
    if (dataCached) {
      setDataList(dataCached);
    }
  }, [isFocus]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <CollectionProvider>
        <View style={{ flex: 1 }}>
          <View style={{ zIndex: 0 }}>
            <FlatList
              refreshing={false}
              onRefresh={handleRefetch}
              data={collectionFilter}
              renderItem={({ item }) => (
                <CollectionCard data={item} setDataList={setDataList} />
              )}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
              ListEmptyComponent={() => (
                <>
                  {isLoading && isFirstLoadingRef.current && (
                    <ActivityIndicator color={COLORS.primary} size={50} />
                  )}
                </>
              )}
              ListFooterComponent={
                isFetching && (
                  <ActivityIndicator color={COLORS.primary} size="large" />
                )
              }
              onEndReached={
                !isEndRef.current &&
                !isFirstLoadingRef.current &&
                !isFetching &&
                (() => handlePagination())
              }
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: -1,
            }}
          >
            <View style={{ height: 300, backgroundColor: COLORS.primary }} />
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
              }}
            ></View>
          </View>
        </View>
      </CollectionProvider>
    </SafeAreaView>
  );
};

export default Home;
