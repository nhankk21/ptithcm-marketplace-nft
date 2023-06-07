import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { ResponseMessage } from '@constants/messages';
import { assets, COLORS, SIZES } from '@constants';

const CopyIcon = assets.copy;

// show address and private key after register successfully
const InformationField = ({ onPress, text, style, title, ...props }) => {
  return (
    <View style={{ marginTop: 0 }}>
      {title}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.primary,
          paddingVertical: SIZES.base / 2,
          borderRadius: SIZES.base,
          paddingHorizontal: SIZES.base,
          ...style,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.white,
            flex: 1,
          }}
          {...props}
        >
          {text}
        </Text>
        <TouchableOpacity
          onPress={() => {
            onPress();
            ToastAndroid.show(
              ResponseMessage.info.CopySuccessfully,
              ToastAndroid.SHORT
            );
          }}
        >
          <CopyIcon size={SIZES.font} fill={COLORS.white} style={{ flex: 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InformationField;
