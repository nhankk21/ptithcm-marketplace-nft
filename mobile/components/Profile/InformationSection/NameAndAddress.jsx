import React from 'react';
import {
  ToastAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { SIZES, COLORS, assets } from '@constants';
import withModal from '@hoc/withModal';
import ChangeNickNameModal from './ChangeNickNameModal';
import { ResponseMessage } from '@constants/messages';
import useUserInfo from '@hooks/useUserInfo';

const EditIcon = assets.edit;
const CopyIcon = assets.copy;

const NameAndAddress = ({ setModal }) => {
  const userInfo = useUserInfo();
  const changeNickNameHandler = () => {
    setModal({
      isOpen: true,
      Type: ChangeNickNameModal,
      metadata: { username: userInfo.username },
    });
  };
  const handleCopyAddress = () => {
    Clipboard.setStringAsync(userInfo.address);
    ToastAndroid.show(
      ResponseMessage.info.CopySuccessfully,
      ToastAndroid.SHORT
    );
  };
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={styles.container}>
        <Text
          style={{ fontSize: SIZES.extraLarge, fontWeight: 'bold' }}
          numberOfLines={1}
        >
          {userInfo.username}
        </Text>
        <TouchableOpacity
          style={styles.touchable}
          onPress={changeNickNameHandler}
        >
          <EditIcon fill={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.address} numberOfLines={1}>
          {userInfo.address}
        </Text>
        <TouchableOpacity style={styles.touchable} onPress={handleCopyAddress}>
          <CopyIcon fill={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SIZES.base / 2,
    alignItems: 'center',
  },
  address: {
    fontSize: SIZES.font,
    color: COLORS.white,
    width: 130,
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.base,
  },
  touchable: {
    padding: SIZES.base / 2,
  },
});

export default withModal(NameAndAddress);
