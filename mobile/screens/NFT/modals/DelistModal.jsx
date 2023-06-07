import ConfirmModal from '@components/common/ConfirmModal';
import { SIZES } from '@constants/theme';
import { nftAPI } from '@services/api';
import { Status } from '@services/status';
import { Text, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation } from 'react-query';
import { SummaryItem } from './BuyModal';
import { EthPrice } from '@components/index';

const DelistModal = ({
  onClose,
  name,
  nftAddress,
  price,
  setIsListed,
  ownerAddress,
}) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: nftAPI.deList,
  });
  const handleDelist = () => {
    mutate(
      {
        ownerAddress,
        nftAddress,
      },
      {
        onSuccess: ({ data } = {}) => {
          if (data.status !== Status.Error) {
            setIsListed(false);
            Toast.show({
              type: 'success',
              text1: 'Delist NFT',
              text2: data.message,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Delist NFT',
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
      title="Do you want to delist it?"
      onClose={onClose}
      onPositive={handleDelist}
      isLoading={isLoading}
    >
      <View
        style={{
          paddingHorizontal: SIZES.medium,
        }}
      >
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

export default DelistModal;
