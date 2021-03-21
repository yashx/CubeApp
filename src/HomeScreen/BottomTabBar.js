import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import React from 'react';

function BottomTabBar({navigation, state}) {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title={'Coupons'} />
      <BottomNavigationTab title={'Cube Stops'} />
      <BottomNavigationTab title={'More'} />
    </BottomNavigation>
  );
}

export default BottomTabBar;
