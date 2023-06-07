import { StyleSheet } from 'react-native';

export const absolute = StyleSheet.create({
  position: 'absolute',
});

export const inset = StyleSheet.create({
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
});

export const centerAbsoluteX = StyleSheet.create({
  position: 'absolute',
  marginHorizonal: 'auto',
});

export default {
  absolute,
  inset,
  centerAbsoluteX,
};
