import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const style = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facility: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {},
});

function Facilities() {
  return (
    <Layout style={style.container}>
      <Facility
        title="Fuel Stop"
        img={require('../../../res/image/gas_icon.png')}
      />
      <Facility title="ATM" img={require('../../../res/image/atm_icon.png')} />
      <Facility
        title="Parking"
        img={require('../../../res/image/parking_icon.png')}
      />
      <Facility
        title="Kids Area"
        img={require('../../../res/image/slider_icon.png')}
      />
      <Facility
        title="Toilet"
        img={require('../../../res/image/toilet_icon.png')}
      />
      <Facility
        title="Free Wifi"
        img={require('../../../res/image/wifi_icon.png')}
      />
    </Layout>
  );
}

function Facility({title, img}) {
  return (
    <View style={style.facility}>
      <Image source={img} style={style.image} />
      <Text style={style.text}>{title}</Text>
    </View>
  );
}

export default Facilities;
