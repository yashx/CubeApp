import {Card, Divider, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const style = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginBottom: 4,
    paddingBottom: 8,
  },
  container: {
    alignItems: 'stretch',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

function SurveyItem({title, description, onPress}) {
  return (
    <Card style={style.card} onPress={onPress}>
      <View style={style.container}>
        <Text category="h5" style={style.titleText}>
          {title}
        </Text>
        <Divider />
        <Text category="h6">{description}</Text>
      </View>
    </Card>
  );
}

export default SurveyItem;
