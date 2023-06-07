import { CircleButton } from '@components/common/Button';
import { Image, View } from 'react-native';
import { assets, SIZES, COLORS } from '@constants';

const CameraIcon = assets.camera;

const RenderPickedImage = ({ uri, style, onPick }) => {
  return (
    <View
      style={{
        position: 'relative',
        height: 180,
        borderRadius: SIZES.base,
        overflow: 'hidden',
        ...style,
      }}
    >
      <Image
        source={{ uri }}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <CircleButton bottom={10} right={10} handlePress={onPick}>
        <CameraIcon fill={COLORS.primary} />
      </CircleButton>
    </View>
  );
};

export default RenderPickedImage;
