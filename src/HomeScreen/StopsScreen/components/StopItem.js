import {Card, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const style = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginBottom: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  image: {
    width: 100,
    height: 110,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  distanceText: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});

function StopItem({data, onPress}) {
  // let distance = -11;
  // if (position) {
  //   const points = [
  //     {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     },
  //     {
  //       latitude: data.lat,
  //       longitude: data.long,
  //     },
  //   ];
  //   distance = HaversineGeolocation.getDistanceBetween(points[0], points[1]);
  // }
  // console.log(distance);
  return (
    <Card style={style.card} onPress={onPress}>
      <View style={style.container}>
        <Image source={{uri: data.imgUrl}} style={style.image} />
        <View style={style.textContainer}>
          <Text category="h5" style={style.titleText}>
            {data.name}
          </Text>
          <Text category="label">{data.address}</Text>
          <Text category="p1" style={style.distanceText}>
            {data.distance + ' kms away'}
          </Text>
        </View>
      </View>
    </Card>
  );
}

export default StopItem;
