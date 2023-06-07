import { View, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { SIZES, COLORS } from '@constants';
import Modal from '@components/common/Modal';
import InformationField from './InformationField';
import { RectButton } from '@components/index';

const InformationRegisterModal = ({ onClose, address, privateKey }) => {
  return (
    <Modal style={{ gap: SIZES.small }}>
      <Modal.Title title="Register information" />
      <InformationField
        title={<Text style={{ marginBottom: SIZES.base }}>Your address</Text>}
        text={address}
        onPress={() => Clipboard.setStringAsync(address)}
      />
      <InformationField
        style={{ marginBottom: SIZES.large }}
        title={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: SIZES.base,
              flexWrap: 'wrap',
            }}
          >
            <Text>Your private key</Text>
            <Text
              style={{
                marginLeft: SIZES.base,
                fontSize: SIZES.small,
                color: COLORS['red-400'],
              }}
            >
              (Save it for restore password)
            </Text>
          </View>
        }
        text={privateKey}
        onPress={() => Clipboard.setStringAsync(privateKey)}
      />
      <RectButton
        width={100}
        text="OK"
        alignSelf="flex-end"
        handlePress={onClose}
      />
    </Modal>
  );
};

export default InformationRegisterModal;
