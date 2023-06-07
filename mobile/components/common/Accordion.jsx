import assets from '@constants/assets';
import { COLORS, SIZES } from '@constants/theme';
import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const ChevronDownIcon = assets.chevronDown;
const ChevronUpIcon = assets.chevronUp;
const styleIsCollapse = {
  height: 0,
  paddingVertical: 0,
  borderTopWidth: 0,
  marginTop: 0,
};

const Accordion = ({
  render = () => <></>,
  initCollapse = false,
  style,
  titleComponent,
  ...rest
}) => {
  const [isCollapse, setIsCollapse] = useState(initCollapse);
  return (
    <>
      <TouchableOpacity
        style={{
          borderColor: COLORS.primary,
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: SIZES.base,
          paddingHorizontal: SIZES.medium,
          paddingVertical: SIZES.font,
          ...style,
        }}
        onPress={() => setIsCollapse((isCollapse) => !isCollapse)}
        {...rest}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {titleComponent}
          {!isCollapse && <ChevronUpIcon fill={COLORS.primary} />}
          {isCollapse && <ChevronDownIcon fill={COLORS.primary} />}
        </View>
        <View
          style={{
            marginTop: SIZES.base,
            overflow: 'hidden',
            paddingHorizontal: SIZES.base * 2,
            paddingVertical: SIZES.base,
            borderTopColor: COLORS.primary,
            borderTopWidth: 1,
            borderStyle: 'solid',
            ...(isCollapse ? styleIsCollapse : {}),
          }}
        >
          {render(isCollapse, setIsCollapse)}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Accordion;
