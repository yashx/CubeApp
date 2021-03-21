import {Card, Text, Input, Button} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

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
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});

function EnterNumber({onLogIn}) {
  const [phoneNumber, setPhoneNuber] = useState('');

  return (
    <Card style={style.card}>
      <Text category="h4" style={style.titleText}>
        Enter Phone Number
      </Text>
      <Input
        placeholder="Write Phone Number here"
        value={phoneNumber}
        size="large"
        onChangeText={(n) => setPhoneNuber(n)}
      />
      <Button style={style.button} onPress={() => onLogIn(phoneNumber)}>
        Log In
      </Button>
    </Card>
  );
}

export default EnterNumber;
