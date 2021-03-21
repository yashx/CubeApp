import {Card, Text} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginBottom: 4,
  },
  image: {
    height: 300,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  descption: {
    marginTop: 4,
  },
});

function FoodStop({imgSrc, description, name}) {
  return (
    <Card style={style.card}>
      <Image style={style.image} source={imgSrc} />
      <Text category="h6" style={style.title}>
        {name}
      </Text>
      <Text style={style.descption}>{description}</Text>
    </Card>
  );
}

export default FoodStop;
