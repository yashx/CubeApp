import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import VerifyCode from './components/VerifyCode';
import {ScrollView} from 'react-native';
import EnterNumber from './components/EnterNumber';
import auth from '@react-native-firebase/auth';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginHorizontal: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    height: 400,
    width: '100%',
    resizeMode: 'contain',
  },
});

function LogInScreen() {
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  function signInWithPhoneNumber(phoneNumber) {
    setLoading(true);
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(
        (confirmation) => {
          setConfirm(confirmation);
          setLoading(false);
        },
        (reason) => {
          console.log(reason);
        },
      );
  }

  async function confirmCode(code) {
    setLoading(true);
    try {
      await confirm.confirm(code);
    } catch (error) {
      setConfirm(null);
    }
  }

  return (
    <Layout style={style.container}>
      <ScrollView>
        <Image
          style={style.image}
          source={require('../../../res/image/cube_stop_logo.png')}
        />
        <Text category="h1" style={style.title}>
          Log into CubeApp
        </Text>

        {loading ? (
          <View style={{alignItems: 'center'}}>
            <Spinner size="giant" />
          </View>
        ) : confirm ? (
          <VerifyCode
            onCheckOTP={(code) => {
              confirmCode(code);
            }}
          />
        ) : (
          <EnterNumber
            onLogIn={(number) => {
              signInWithPhoneNumber(`+91 ${number}`);
            }}
          />
        )}
      </ScrollView>
    </Layout>
  );
}

export default LogInScreen;
