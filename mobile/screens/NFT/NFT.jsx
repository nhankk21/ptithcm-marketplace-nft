import { View, SafeAreaView } from 'react-native';
import { SIZES } from '@constants/theme';
import { FocusedStatusBar, NFTTitle, RectButton } from '@components';
import { Header } from '@components/Collection';
import { EthPrice } from '@components/index';
import withModal from '@hoc/withModal';
import ActionHistory from './ActionHistory';
import BuyModal from './modals/BuyModal';
import { useQuery } from 'react-query';
import PriceHistory from './PriceHistory';
import DelistModal from './modals/DelistModal';
import ListingModal from './modals/ListingModal';
import { useState } from 'react';
import useUserInfo from '@hooks/useUserInfo';
import { FlatList } from 'react-native-gesture-handler';
import { nftAPI } from '@services/api';

const NFT = ({ route, setModal }) => {
  const { data } = route.params;
  console.log(data);
  const { isLoading, data: dataListPrice } = useQuery({
    queryKey: ['get_list_price'],
    queryFn: () =>
      nftAPI.getListPrice({
        // nft_address: '0xbfcbedf26c648601835f5361601e3d981d3860a0',
        nft_address: data.nftAddress,
      }),
  });

  const { isListed: _isListed, owner: _owner } = data;

  console.log(dataListPrice?.data?.data?.map(Number));

  const { address } = useUserInfo();
  const [isListed, setIsListed] = useState(_isListed);
  const [ownerAddress, setOwnerAddress] = useState(_owner);
  const isCancel = !isListed;
  const isOwn = address === ownerAddress;

  const metadata = {
    ...data,
    ownerAddress,
    isOwn,
    setIsListed,
    setOwnerAddress,
  };

  const handleCancel = () => {
    setModal({
      isOpen: true,
      Type: DelistModal,
      metadata,
    });
  };

  const handleListing = () => {
    setModal({
      isOpen: true,
      Type: ListingModal,
      metadata,
    });
  };

  const handleBuy = () => {
    setModal({
      isOpen: true,
      Type: BuyModal,
      metadata,
    });
  };

  const handleBuyOrCancelOrListing = () => {
    if (!isOwn) {
      handleBuy();
    } else if (isListed) {
      handleCancel();
    } else if (isCancel) {
      handleListing();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Header data={data} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.medium,
          marginTop: SIZES.medium,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: SIZES.font,
          }}
        >
          <NFTTitle
            numberOfLines={2}
            style={{ flex: 3 }}
            title={data.name}
            subTitle={data.owner}
            titleSize={SIZES.extraLarge}
            subTitleSize={SIZES.font}
          />
          <RectButton
            text={!isOwn ? 'Buy' : isListed ? 'Cancel' : 'Listing'}
            borderRadius={SIZES.medium}
            handlePress={handleBuyOrCancelOrListing}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: SIZES.medium }}>
          <EthPrice
            price={data.price}
            containerStyle={{ marginTop: SIZES.base }}
          />
        </View>
        <FlatList
          data={[
            {
              Component: ActionHistory,
              data: { style: { marginBottom: SIZES.base } },
            },
            {
              Component: PriceHistory,
              data: { dataChart: dataListPrice?.data?.data },
            },
          ]}
          renderItem={({ item: { Component, data: dataItem } }) => (
            <Component {...data} {...dataItem} />
          )}
        />

        {/* <ActionHistory nftAddress={data.nftAddress} /> */}

        {/* <View
            style={{
              marginTop: SIZES.medium,
              marginHorizontal: -SIZES.medium,
              paddingHorizontal: SIZES.medium,
              gap: SIZES.font,
            }}
          > */}
        {/* <PriceHistory dataChart={DATA_CHART_DUMMY} /> */}
        {/* <Description
              content={
                'lorem30lorem30lorem30lorem30lorem30lorem30lorem30lorem30lorem30lorem30lorem30'
              }
            /> */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

export default withModal(NFT);
