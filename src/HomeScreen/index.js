import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CouponScreen from './CouponScreen';
import MoreScreen from './MoreScreen';
import StopsScreen from './StopsScreen';
import BottomTabBar from './BottomTabBar';
import screens from '../constants/screens';
import LogInScreen from './LogInScreen';
import auth from '@react-native-firebase/auth';

function HomeScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const {Navigator, Screen} = createBottomTabNavigator();

  if (!user || initializing) {
    return <LogInScreen />;
  }

  return (
    <Navigator
      initialRouteName={screens.stopsTab}
      tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name={screens.couponTab} component={CouponScreen} />
      <Screen name={screens.stopsTab} component={StopsScreen} />
      <Screen name={screens.moreTab} component={MoreScreen} />
    </Navigator>
  );
}

export default HomeScreen;
