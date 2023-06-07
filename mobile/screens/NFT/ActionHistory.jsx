import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import Accordion from '@components/common/Accordion';
import AccordionTitle from './AccordionTitle';
import { SIZES, COLORS } from '@constants';
import { nftAPI } from '@services/api';
import { useQuery } from 'react-query';
import { EthPrice } from '@components/index';
import { FONTS } from '@constants/theme';

const dateFormat = new Intl.DateTimeFormat('en', {
  year: '2-digit',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const DataItem = ({ txn_type, details }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SIZES.base,
      }}
    >
      <Text style={{ flex: 2 }}>{txn_type}</Text>
      <View style={{ flex: 2 }}>
        <EthPrice price={details.at_price} />
      </View>
      <Text style={{ textAlign: 'right', flex: 3 }}>
        {dateFormat.format(details.time)}
      </Text>
    </View>
  );
};

const TitleItem = ({ children, icon, style, textStyle }) => (
  <View style={{ flexDirection: 'row', gap: SIZES.base, ...style }}>
    {icon}
    <Text
      style={{
        fontFamily: FONTS.semiBold,
        ...textStyle,
      }}
    >
      {children}
    </Text>
  </View>
);

const DataListSection = ({ nftAddress }) => {
  const { isLoading, data: historyData } = useQuery({
    queryKey: ['history', nftAddress],
    queryFn: () => nftAPI.getHistory({ page: 1, limit: 100, nftAddress }),
  });

  const history = historyData?.data?.data;

  return (
    <>
      <View
        style={{
          flex: 1,
          height: '100%',
        }}
      >
        <FlatList
          data={history}
          renderItem={({ item }) => {
            return <DataItem {...item} />;
          }}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <>
              {isLoading ? (
                <ActivityIndicator color={COLORS.primary} size="large" />
              ) : (
                <Text
                  style={{
                    marginTop: SIZES.base,
                    textAlign: 'center',
                    color: COLORS.gray,
                    fontSize: SIZES.small,
                  }}
                >
                  Do not any action
                </Text>
              )}
            </>
          )}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: SIZES.base,
                marginBottom: SIZES.base,
                borderBottomWidth: 0.5,
                borderStyle: 'solid',
                borderColor: COLORS.primary,
              }}
            >
              <TitleItem style={{ flex: 2 }}>Type</TitleItem>
              <TitleItem
                style={{ flex: 2 }}
                textStyle={{ textAlign: 'center', minWidth: 50 }}
              >
                Price
              </TitleItem>
              <TitleItem
                style={{ flex: 3 }}
                textStyle={{ marginStart: 'auto' }}
              >
                Time
              </TitleItem>
            </View>
          )}
        />
      </View>
    </>
  );
};

const Action = ({ nftAddress, style }) => {
  return (
    // <DataListSection nftAddress={nftAddress} />
    <Accordion
      titleComponent={<AccordionTitle type="action" title="History" />}
      style={{ marginTop: SIZES.font, ...style }}
      render={() => <DataListSection nftAddress={nftAddress} />}
    />
  );
};

export default Action;
