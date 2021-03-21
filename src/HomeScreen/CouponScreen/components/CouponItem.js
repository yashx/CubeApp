import {Card, Divider, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const style = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginBottom: 4,
  },
  container: {
    alignItems: 'stretch',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  couponIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  codeText: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  titleText: {
    fontWeight: 'bold',
  },
});

function CouponItem({code, title, description}) {
  return (
    <Card style={style.card}>
      <View style={style.container}>
        <View style={style.codeContainer}>
          <Image
            style={style.couponIcon}
            source={require('../../../../res/image/coupon_icon.png')}
          />
          <Text category="p1" style={style.codeText}>
            {code}
          </Text>
        </View>
        <Text category="h5" style={style.titleText}>
          {title}
        </Text>
        <Divider />
        <Text category="label">{description}</Text>
      </View>
    </Card>
  );
}

export default CouponItem;
