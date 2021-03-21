import {Layout, Text, Button, Card} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import ClaimReferral from './components/ClaimReferral';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  common: {
    marginHorizontal: 16,
  },
  card: {
    marginBottom: 8,
    marginTop: 32,
    marginHorizontal: 16,
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

function ReferralScreen({navigation}) {
  const referralCode = auth().currentUser.uid;
  const shareCouponCode = () => {};

  const claimRefferal = (c) => {
    functions()
      .httpsCallable('redeemReferral')({code: c})
      .then(
        (val) => {},
        (reason) => {
          console.log(reason);
        },
      );
    navigation.goBack();
  };

  return (
    <Layout style style={style.container}>
      <ScrollView>
        <ScreenTitle title="Referral System" />
        <Text category="h6" style={style.common}>
          {'Share your referral code with your friends and family.'}
        </Text>
        <Text category="h6" style={{...style.common, marginTop: 8}}>
          {
            'If they sign up and make a purchase at a Cube Stop, we will send you a coupon you can use on your next visit.'
          }
        </Text>

        <Card style={style.card}>
          <Text category="h5" style={style.title}>
            Your Referral Code
          </Text>
          <Text category="h1" style={style.title}>
            {referralCode}
          </Text>
        </Card>
        <Button
          style={{...style.common, marginVertical: 8}}
          onPress={() => shareCouponCode()}>
          Share Referral Code
        </Button>
        <ClaimReferral
          onClaimReferral={(code) => {
            claimRefferal(code);
          }}
        />
      </ScrollView>
    </Layout>
  );
}

export default ReferralScreen;
