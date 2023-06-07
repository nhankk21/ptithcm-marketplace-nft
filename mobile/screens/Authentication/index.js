import { Animated, View, Image, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import AuthenImages from '@components/Authentication/AuthenImages';
import { SIZES, assets, ScreenName, screenWidth } from '@constants';
import { BlurButton, CircleButton } from '@components/common/Button';

const Authen = ({ children }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeView}>
      <AnimatedLinearGradient
        colors={['#09ecd0', '#d432d9', '#67C0FF', '#794adc']}
        style={styles.gradientBg}
        start={[0, 0.3]}
        end={[1, 0.8]}
        locations={[0, 0.1, 0.4, 0.8]}
      />
      <AnimatedLinearGradient
        colors={['#67C0FF', '#d432d9', '#794adc', '#09ecd0']}
        style={styles.gradientBg}
        start={[0, 0.5]}
        end={[1, 0]}
        locations={[0, 0.2, 0.6, 1]}
      />
      <View style={{ flexShrink: 0 }}>
        <View style={styles.bgImage}>
          <Image
            style={{ width: '100%', height: 200 }}
            resizeMode="contain"
            source={assets.bgImage}
          />
        </View>
        <BlurButton
          actionStyle={{
            ...styles.btn,
            ...styles.logo,
          }}
        >
          <Image
            source={assets.logo}
            resizeMode="contain"
            style={{
              marginHorizontal: 20,
              width: 80,
              height: 40,
            }}
          />
        </BlurButton>
      </View>
      <AuthenImages style={styles.authenImages} />
      {children && (
        <CircleButton
          imgUrl={assets.left}
          left={12}
          top={50}
          handlePress={navigation.goBack}
        />
      )}
      <View style={styles.actionContainer}>
        {children ?? (
          <>
            <BlurButton
              text="Login"
              actionStyle={styles.btn}
              handlePress={() => navigation.navigate(ScreenName.Login)}
            />
            <BlurButton
              text="Register"
              actionStyle={styles.btn}
              handlePress={() => navigation.navigate(ScreenName.Register)}
            />
            <BlurButton
              text="Forgot password"
              actionStyle={styles.btn}
              handlePress={() => navigation.navigate(ScreenName.ForgotPassword)}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const styles = StyleSheet.create({
  safeView: {
    flexShrink: 0,
    height: '100%',
    justifyContent: 'space-around',
    position: 'relative',
  },
  bgImage: {
    paddingHorizontal: SIZES.extraLarge,
  },
  btn: {
    overflow: 'hidden',
    marginTop: 4,
    marginHorizontal: 'auto',
    marginTop: SIZES.large,
    borderRadius: SIZES.small,
    position: 'relative',
    width: screenWidth - 50,
    maxWidth: 500,
  },
  actionBg: {
    backgroundColor: '#001F2DBA',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    opacity: 0.8,
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.4,
    zIndex: -1,
  },
  logo: {
    zIndex: 99,
    marginStart: 'auto',
    marginEnd: SIZES.extraLarge,
    marginTop: 0,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.base,
  },
  authenImages: {
    flexShrink: 0,
    width: '100%',
    borderRadius: SIZES.medium,
    backgroundColor: '#000',
    zIndex: 1,
  },
  actionContainer: {
    zIndex: 1,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    flexShrink: 0,
  },
  blurContainer: {
    position: 'relative',
  },
});

export default Authen;
