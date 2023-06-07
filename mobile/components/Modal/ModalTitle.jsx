import { View, Text } from 'react-native';
import React from 'react';

const ModalTitle = ({ text, style }) => {
  return <Text style={{ ...style }}>{text}</Text>;
};

export default ModalTitle;
