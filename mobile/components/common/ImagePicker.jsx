import { COLORS, SIZES } from '@constants';
import { Text, TouchableOpacity } from 'react-native';

const ImagePicker = ({ onPick, placeholder = 'Choose image for nft' }) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: COLORS.primary,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPick}
    >
      <Text>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default ImagePicker;
