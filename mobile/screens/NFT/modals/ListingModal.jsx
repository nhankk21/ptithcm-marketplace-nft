import ConfirmModal from '@components/common/ConfirmModal';
import { SIZES } from '@constants/theme';
import { nftAPI } from '@services/api';
import { Status } from '@services/status';
import { Text, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation } from 'react-query';
import { SummaryItem } from './BuyModal';

const ListingModal = ({
  setIsListed,
  onClose,
  name,
  nftAddress,
  ownerAddress,
}) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: nftAPI.list,
  });
  const handleListing = () => {
    mutate(
      {
        ownerAddress,
        nftAddress,
      },
      {
        onSuccess: ({ data } = {}) => {
          if (data.status !== Status.Error) {
            Toast.show({
              type: 'success',
              text1: 'Listing NFT',
              text2: data.message,
            });
            setIsListed(true);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Listing NFT',
              text2: data.message,
            });
          }
        },
        onError: () => {
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
      title="Do you want to listing it?"
      onClose={onClose}
      onPositive={handleListing}
      isLoading={isLoading}
    >
      <View style={{ paddingStart: SIZES.medium }}>
        <SummaryItem title="NFT Name">
          <Text>{name}</Text>
        </SummaryItem>
      </View>
    </ConfirmModal>
  );
};

export default ListingModal;
