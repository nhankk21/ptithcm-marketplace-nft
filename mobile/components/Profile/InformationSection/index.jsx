import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, View, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

import { CircleButton } from '@components/common/Button';
import { assets, COLORS, SHADOWS, SIZES } from '@constants';
import Avatar from './Avatar';
import NameAndAddress from './NameAndAddress';

const CameraIcon = assets.camera;

const InformationSection = () => {
  const navigation = useNavigation();
  return (
    <View style={{ position: 'relative' }}>
      <Image
        source={assets.nft04}
        resizeMode="cover"
        style={{ width: '100%', height: 196 }}
      />
      <CircleButton
        imgUrl={assets.left}
        left={12}
        top={12}
        handlePress={navigation.goBack}
      />
      <View
        style={{
          position: 'absolute',
          width: 120,
          height: 120,
          bottom: -60,
          left: 10,
        }}
      >
        <BlurView
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 71,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            ...SHADOWS.dark,
          }}
          intensity={100}
        >
          <Avatar width={100} height={100} borderRadius={50} />
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              position: 'absolute',
              bottom: SIZES.base,
              right: SIZES.base,
              padding: SIZES.base,
              borderRadius: SIZES.large,
              ...SHADOWS.light,
            }}
          >
            <CameraIcon fill={COLORS.primary} />
          </TouchableOpacity>
        </BlurView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: -120,
          maxWidth: '100%',
          left: 25,
        }}
      >
        <NameAndAddress />
      </View>
    </View>
  );
};

export default InformationSection;
