import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Price } from '@components/NFT/SubInfo';
import { COLORS, FONTS, SIZES, assets } from '@constants';
import withModal from '@hoc/withModal';
import TransactionModal from './TransactionModal';
import { numberFormat } from '@utils/number/numberFormat';

const WithdrawIcon = assets.withdraw;
const DepositIcon = assets.deposit;

const Balance = ({ price, type = 'eth' }) => (
  <Price
    type={type}
    price={price}
    containerStyle={{
      flex: 1,
      paddingEnd: SIZES.base,
    }}
    priceStyle={{
      marginLeft: SIZES.base,
      fontFamily: FONTS.bold,
      fontSize: SIZES.large,
    }}
  />
);

const FinanceSection = ({ setModal, tokenBalance, fiatBalance, setData }) => {
  const depositHandler = () => {
    setModal({
      isOpen: true,
      Type: TransactionModal,
      metadata: { title: 'Deposit', setData },
    });
  };

  const withDrawHandler = () => {
    setModal({
      isOpen: true,
      Type: TransactionModal,
      metadata: { title: 'Withdraw', setData },
    });
  };
  return (
    <View
      style={{
        marginStart: 'auto',
        alignItems: 'flex-end',
        marginVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        maxWidth: '70%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          gap: SIZES.base,
          maxWidth: '100%',
        }}
      >
        <Balance price={numberFormat(tokenBalance)} type="eth" />
        <Balance price={numberFormat(fiatBalance)} type="usd" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: SIZES.extraLarge,
          marginTop: SIZES.small,
          maxWidth: '100%',
          marginTop: SIZES.large,
        }}
      >
        <TouchableOpacity onPress={withDrawHandler}>
          <WithdrawIcon fill={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={depositHandler}>
          <DepositIcon fill={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withModal(FinanceSection);
