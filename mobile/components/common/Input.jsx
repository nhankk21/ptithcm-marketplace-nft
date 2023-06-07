import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, FONTS, SIZES, screenWidth } from '../../constants';
import { BlurView } from 'expo-blur';

export const BlurInput = ({
  title,
  intensity = 90,
  tint = 'light',
  blurColor,
  containerStyle,
  type,
  ...props
}) => (
  <BlurView
    intensity={intensity}
    tint={tint}
    style={{
      paddingHorizontal: 20,
      paddingVertical: 10,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: SIZES.small,
      maxWidth: 500,
      width: screenWidth - 50,
      ...containerStyle,
    }}
  >
    <Text
      style={{
        fontSize: SIZES.small,
        fontWeight: '500',
        color: COLORS.blue,
        marginBottom: 4,
      }}
    >
      {title}
    </Text>
    <TextInput
      style={{
        backgroundColor: 'transparent',
        color: COLORS.white,
        fontSize: SIZES.font,
        fontWeight: '500',
      }}
      secureTextEntry={type === 'password'}
      {...props}
    />
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: blurColor,
        opacity: 0.7,
        zIndex: -1,
      }}
    />
  </BlurView>
);

export const OutlineInput = ({ text, containerProps, style, ...props }) => {
  return (
    <View {...containerProps}>
      {text && <Text style={styles.label}>{text}</Text>}
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: SIZES.base,
          paddingVertical: SIZES.base,
          paddingHorizontal: SIZES.medium,
          ...style,
        }}
        {...props}
      />
    </View>
  );
};

OutlineInput.Label = ({ text, style, ...props }) => {
  return (
    <Text style={{ ...styles.label, ...style }} {...props}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    marginBottom: SIZES.base,
    fontFamily: FONTS.medium,
  },
});
