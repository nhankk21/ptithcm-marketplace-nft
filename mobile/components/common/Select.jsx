import { View, Text } from 'react-native';
import React from 'react';
import { OutlineInput } from './Input';
import { Picker } from '@react-native-picker/picker';
import { COLORS, SIZES } from '@constants/theme';

const Select = ({
  title,
  onChange,
  value,
  pickerStyle,
  containerStyle,
  options,
}) => {
  return (
    <View>
      <OutlineInput.Label text={title} />
      <View
        style={{
          height: 48,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: COLORS.primary,
          borderRadius: SIZES.base,
          ...containerStyle,
        }}
      >
        <Picker
          style={{
            flex: 2,
            ...pickerStyle,
          }}
          selectedValue={value}
          onValueChange={onChange}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Select;
