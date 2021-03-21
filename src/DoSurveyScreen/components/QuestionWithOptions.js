import {
  Card,
  Divider,
  Text,
  Menu,
  MenuItem,
  IndexPath,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
const style = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginBottom: 4,
    paddingBottom: 16,
  },
  container: {
    alignItems: 'stretch',
  },
  titleText: {
    fontWeight: 'bold',
  },
  options: {
    marginTop: 16,
  },
});

function QuestionWithOptions({
  question,
  options,
  onPress,
  questionNo,
  onIndexSelected,
}) {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(-1));

  return (
    <Card style={style.card} onPress={onPress}>
      <View style={style.container}>
        <Text category="h5" style={style.titleText}>
          {questionNo + '. ' + question}
        </Text>
        <Menu
          style={style.options}
          selectedIndex={selectedIndex}
          onSelect={(i) => {
            onIndexSelected(i.row);
            setSelectedIndex(i);
          }}>
          {options.map((o, i) => (
            <MenuItem title={o} key={i} />
          ))}
        </Menu>
      </View>
    </Card>
  );
}

export default QuestionWithOptions;
