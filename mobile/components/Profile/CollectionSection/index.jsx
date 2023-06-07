import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { COLORS, FONTS, SIZES, assets } from '@constants';
import CollectionAsset from './CollectionAsset';
import { RectButton } from '@components/common/Button';
import withModal from '@hoc/withModal';
import AddCollectionModal from './AddCollectionModal';

const AddIcon = assets.add;

const CollectionSection = ({
  collections,
  setModal,
  children,
  isEnd,
  isFetching,
  isFirstLoading,
  handleRefetch,
  handlePagination,
}) => {
  const addCollectionHandler = () => {
    setModal({ isOpen: true, Type: AddCollectionModal, metadata: {} });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={collections}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <View>
            {children}
            {collections?.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: SIZES.medium,
                  marginHorizontal: SIZES.small,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.large,
                  }}
                >
                  My Collections
                </Text>
                <RectButton
                  text="Collection"
                  leftIcon={<AddIcon fill={COLORS.white} />}
                  handlePress={addCollectionHandler}
                />
              </View>
            )}
            {collections?.length === 0 && !isFetching && (
              <View
                style={{
                  marginTop: SIZES.large * 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: SIZES.medium,
                }}
              >
                <Text style={{ color: COLORS.gray, textAlign: 'center' }}>
                  You do not have any collection!
                </Text>
                <RectButton
                  text="Create collection"
                  leftIcon={<AddIcon fill={COLORS.white} />}
                  handlePress={addCollectionHandler}
                  maxWidth={200}
                />
              </View>
            )}
          </View>
        )}
        ListFooterComponent={
          isFetching &&
          !isEnd && <ActivityIndicator color={COLORS.primary} size="large" />
        }
        refreshing={false}
        onRefresh={handleRefetch}
        onEndReached={
          !isEnd && !isFetching && !isFirstLoading && (() => handlePagination())
        }
        renderItem={({ item }) => {
          return (
            <CollectionAsset
              image={item.thumbnail}
              name={item.title}
              nfts={item.nfts}
              {...item}
            />
          );
        }}
      />
    </View>
  );
};

export default withModal(CollectionSection);
