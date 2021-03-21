import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  title: {
    marginHorizontal: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
});

function ScreenTitle({title}) {
  return (
    <Text category="h3" style={style.title}>
      {title}
    </Text>
  );
}

export default ScreenTitle;
