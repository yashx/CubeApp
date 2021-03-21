import React from 'react';
import ScreenTitle from '../../../components/ScreenTitle';
import {StyleSheet, View, Image} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/core';
import screens from '../../../constants/screens';

const style = StyleSheet.create({
  earnContainer: {
    flexDirection: 'row',
    height: 180,
    alignItems: 'stretch',
  },
  earnCardImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  earnCardText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 8,
  },
  surveyCard: {
    flex: 1,
    marginLeft: 4,
    marginRight: 8,
    justifyContent: 'center',
  },
  referralCard: {
    flex: 1,
    marginLeft: 8,
    marginRight: 4,
    justifyContent: 'center',
  },
});

function EarnCoupon() {
  const navigation = useNavigation();

  return (
    <>
      <ScreenTitle title="Earn Coupons" />
      <View style={style.earnContainer}>
        <Card
          style={style.referralCard}
          onPress={() => navigation.navigate(screens.referralScreen)}>
          <Image
            style={style.earnCardImage}
            source={require('../../../../res/image/referral_icon.png')}
          />
          <Text category="h6" style={style.earnCardText}>
            Referral
          </Text>
        </Card>
        <Card
          style={style.surveyCard}
          onPress={() => navigation.navigate(screens.surveyScreen)}>
          <Image
            style={style.earnCardImage}
            source={require('../../../../res/image/survey_icon.png')}
          />
          <Text category="h6" style={style.earnCardText}>
            Survey
          </Text>
        </Card>
      </View>
    </>
  );
}

export default EarnCoupon;
