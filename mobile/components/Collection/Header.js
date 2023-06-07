import { Image, StatusBar, View } from 'react-native';
import { assets } from '@constants';
import { CircleButton } from '@components';
import { useNavigation } from '@react-navigation/native';

const Header = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={{ width: '100%', height: 373 }}>
      <Image
        source={{ uri: data.thumbnail }}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
      />

      <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={15}
        top={StatusBar.currentHeight + 10}
      />
    </View>
  );
};

export default Header;
