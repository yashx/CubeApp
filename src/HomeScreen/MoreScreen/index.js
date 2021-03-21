import React from 'react';
import ScreenTitle from '../../components/ScreenTitle';
import {StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {Menu, MenuItem, Text} from '@ui-kitten/components';
import screens from '../../constants/screens';
import auth from '@react-native-firebase/auth';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  // logo: {
  //   alignSelf: 'center',
  //   width: '50%',
  //   height: undefined,
  //   aspectRatio: 500 / 400,
  //   margin: 32,
  // },
  item: {
    paddingHorizontal: 8,
  },
});

function MoreScreen({navigation}) {
  return (
    <Layout style={style.container}>
      <ScreenTitle title="More" />
      <Menu>
        <MenuItem
          onPress={() => navigation.navigate(screens.feedbackScreen)}
          title={() => (
            <Text style={style.item} category="h5">
              Feedback
            </Text>
          )}
        />
        <MenuItem
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
          }}
          title={() => (
            <Text style={style.item} category="h5">
              Log Out
            </Text>
          )}
        />
      </Menu>
    </Layout>
  );
}

export default MoreScreen;
