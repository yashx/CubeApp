import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, Text} from '@ui-kitten/components';

const style = StyleSheet.create({
  noCouponText: {
    flex: 1,
    marginLeft: 16,
  },
  image: {
    height: 120,
    width: 120,
  },
  card: {
    marginHorizontal: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function NoSurvey() {
  return (
    <Card style={style.card}>
      <View style={style.container}>
        <Image
          style={style.image}
          source={require('../../../res/image/sorry_icon.png')}
        />
        <Text category="h6" style={style.noCouponText}>
          {'No surveys are available'}
        </Text>
      </View>
    </Card>
  );
}

export default NoSurvey;
