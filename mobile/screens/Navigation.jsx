import { COLORS, ScreenName, assets } from '@constants/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as _Home } from '@screens/Home';
import { View } from 'react-native';
import TrendingCollection from './TrendingCollections';

const Tab = createBottomTabNavigator();
const CartIcon = assets.cart;
const HomeIcon = assets.home;
const TrendingIcon = assets.trending;

const TabItem = ({ icon, focused }) => (
  <View
    style={{
      position: 'relative',
      transform: [{ translateY: -10 }],
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 35,
    }}
  >
    <View
      style={{
        elevation: 3,
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        backgroundColor: COLORS.white,
        top: 35,
        left: 35,
        transform: [{ translateX: -30 }, { translateY: -30 }],
      }}
    />
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: focused ? COLORS.primary : COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.5,
        borderStyle: 'solid',
        borderColor: focused ? COLORS.white : COLORS.primary,
      }}
    >
      {icon}
    </View>
  </View>
);

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 3,
        },
      }}
      initialRouteName={ScreenName.HomeTabs}
    >
      <Tab.Screen
        name={ScreenName.TrendingCollections}
        component={TrendingCollection}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem
              icon={
                <TrendingIcon
                  width="18px"
                  height="18px"
                  fill={focused ? COLORS.white : COLORS.gray}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenName.HomeTabs}
        component={_Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              icon={
                <HomeIcon
                  width="18px"
                  height="18px"
                  fill={focused ? COLORS.white : COLORS.gray}
                />
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
