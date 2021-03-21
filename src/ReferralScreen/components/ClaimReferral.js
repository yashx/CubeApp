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

function ClaimReferral({onClaimReferral}) {
  const [code, setCode] = useState('');

  return (
    <Card style={style.card}>
      <Text category="h4" style={style.titleText}>
        Enter Referral Code
      </Text>
      <Input
        placeholder="Write Referral Code here"
        value={code}
        size="large"
        onChangeText={(n) => setCode(n)}
      />
      <Button style={style.button} onPress={() => onClaimReferral(code)}>
        Claim
      </Button>
    </Card>
  );
}

export default ClaimReferral;
