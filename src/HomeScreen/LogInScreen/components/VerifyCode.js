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

function VerifyCode({onCheckOTP}) {
  const [code, setCode] = useState('');

  return (
    <Card style={style.card}>
      <Text category="h4" style={style.titleText}>
        Enter OTP code
      </Text>
      <Input
        placeholder="Write OTP here"
        value={code}
        size="large"
        onChangeText={(nextCode) => setCode(nextCode)}
      />
      <Button style={style.button} onPress={() => onCheckOTP(code)}>
        Verify OTP
      </Button>
    </Card>
  );
}

export default VerifyCode;
