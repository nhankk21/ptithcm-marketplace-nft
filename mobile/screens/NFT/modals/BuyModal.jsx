import ConfirmModal from '@components/common/ConfirmModal';
import { FONTS, SIZES } from '@constants/theme';
import useUserInfo from '@hooks/useUserInfo';
import { nftAPI } from '@services/api';
import { Status } from '@services/status';
import { Text, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation } from 'react-query';
import { EthPrice } from '@components/index';

export const SummaryItem = ({ title, children }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontFamily: FONTS.bold }}>{title}: </Text>
      {children}
    </View>
  );
};
const BuyModal = ({
  onClose,
  name,
  price,
  nftAddress,
  setIsListed,
  setOwnerAddress,
  ownerAddress: sellerAddress,
}) => {
  const { address: buyerAddress } = useUserInfo();
  const { isLoading, mutate } = useMutation({
    mutationFn: nftAPI.trade,
  });
  const handleBuy = () => {
    mutate(
      {
        buyerAddress,
        sellerAddress,
        nftAddress,
      },
      {
        onSuccess: ({ data }) => {
          if (data.status !== Status.Error) {
            setIsListed(true);
            setOwnerAddress(buyerAddress);
            Toast.show({
              type: 'success',
              text1: 'Buy NFT',
              text2: data.message,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Buy NFT',
              text2: data.message,
            });
          }
        },
        onError: (error) => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'Server is error',
          });
        },
        onSettled: () => {
          onClose();
        },
      }
    );
  };
  return (
    <ConfirmModal
      title="Do you want to buy it?"
      onClose={onClose}
      onPositive={handleBuy}
      isLoading={isLoading}
    >
      <View style={{ paddingStart: SIZES.medium }}>
        <SummaryItem title="NFT Name">
          <Text>{name}</Text>
        </SummaryItem>
        <SummaryItem title="Price">
          <EthPrice price={price} />
        </SummaryItem>
      </View>
    </ConfirmModal>
  );
};

export default BuyModal;
