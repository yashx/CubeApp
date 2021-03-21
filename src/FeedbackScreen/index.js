import {
  Layout,
  SelectItem,
  Text,
  Select,
  IndexPath,
  Input,
  Button,
  Spinner,
} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import ScreenTitle from '../components/ScreenTitle';
import {StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  common: {
    marginHorizontal: 16,
  },
  title: {
    marginHorizontal: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

// const data = [
//   {
//     title: 'Punjabi Bagh',
//     id: 1,
//   },
//   {
//     title: 'Punjabi Bagh',
//     id: 2,
//   },
//   {
//     title: 'Punjabi Bagh',
//     id: 3,
//   },
//   {
//     title: 'Punjabi Bagh',
//     id: 4,
//   },
//   {
//     title: 'Punjabi Bagh',
//     id: 5,
//   },
//   {
//     title: 'Punjabi Bagh',
//     id: 6,
//   },
// ];

function FeedbackScreen({navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('stops')
      .get()
      .then((querySnap) => {
        tempData = [];
        querySnap.forEach((docSnap) => {
          let d = docSnap.data();
          tempData.push({
            name: d.name,
            id: docSnap.id,
          });
        });
        console.log(tempData);
        setData(tempData);
        setLoading(false);
      });
  }, []);

  const sendFeedback = () => {
    console.log('Send Feedback');
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('feedbacks')
      .add({
        date: new Date().toString(),
        feedback: message,
        stopId: data[selectedIndex.row].id,
      })
      .then(
        (s) => {
          navigation.goBack();
        },
        (e) => {
          navigation.goBack();
        },
      );
  };

  return (
    <Layout style={style.container}>
      {loading ? (
        <View style={{alignItems: 'center'}}>
          <Spinner size="giant" />
        </View>
      ) : (
        <>
          <ScreenTitle title="Feedback" />
          <Text category="h6" style={style.common}>
            Your feedback is important to us. Please share your experience at
            Cube Stop.
          </Text>
          <Text category="h5" style={style.title}>
            Location
          </Text>
          <Select
            style={style.common}
            value={data[selectedIndex.row].name}
            selectedIndex={selectedIndex}
            onSelect={(i) => setSelectedIndex(i)}>
            {data.map((d) => (
              <SelectItem title={d.name} key={d.id} />
            ))}
          </Select>
          <Text category="h5" style={style.title}>
            Message
          </Text>
          <Input
            style={{...style.common, flex: 1}}
            textStyle={{minHeight: '100%', textAlignVertical: 'top'}}
            placeholder="Write your feedback here"
            value={message}
            multiline={true}
            onChangeText={(t) => setMessage(t)}
          />
          <Button
            style={{...style.common, marginVertical: 8}}
            onPress={() => sendFeedback()}>
            Submit
          </Button>
        </>
      )}
    </Layout>
  );
}

export default FeedbackScreen;
