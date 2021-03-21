import {Layout, Text, Button, Spinner} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, LogBox, View} from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import QuestionWithOptions from './components/QuestionWithOptions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    marginHorizontal: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

// const quiz = {
//   title: 'Travel Needs',
//   description: 'Survey to understand your travel needs',

//   questions: [
//     {
//       question: 'How Often do you Travel?',
//       options: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
//       id: '1',
//     },
//     {
//       question: 'How Often do you Travel?',
//       options: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
//       id: '2',
//     },
//     {
//       question: 'How Often do you Travel?',
//       options: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
//       id: '3',
//     },
//     {
//       question: 'How Often do you Travel?',
//       options: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
//       id: '4',
//     },
//     {
//       question: 'How Often do you Travel?',
//       options: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
//       id: '5',
//     },
//   ],
// };

function DoSurveyScreen({route, navigation}) {
  const {surveyId, title, description} = route.params;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('surveys')
      .doc(surveyId)
      .collection('questions')
      .onSnapshot((querySnap) => {
        tempData = [];
        querySnap.forEach((docSnap) => {
          let q = docSnap.data();
          tempData.push({
            question: q.question,
            options: q.options,
            id: docSnap.id,
          });
        });
        let tempChoice = [];
        for (let i = 0; i < tempData.length; i++) tempChoice[i] = -1;
        setChoice(tempChoice);
        setData(tempData);
        setLoading(false);
      });
  }, []);

  const [choice, setChoice] = useState([]);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const sendSurvey = () => {
    console.log(choice);
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('surveyResponse')
      .add({
        response: choice,
        surveyId: surveyId,
      });
    functions()
      .httpsCallable('surveyComplete')()
      .then(
        (val) => {},
        (reason) => {
          console.log(reason);
        },
      );
    navigation.goBack();
  };

  return (
    <Layout style={style.container}>
      {loading ? (
        <View style={{alignItems: 'center', paddingTop: 16}}>
          <Spinner size="giant" />
        </View>
      ) : (
        <ScrollView>
          <ScreenTitle title={title} />
          <Text category="h6" style={style.subtitle}>
            {description}
          </Text>
          {data.map((q, i) => {
            // console.log('Data in do survey');
            // console.log(q);
            return (
              <QuestionWithOptions
                questionNo={i + 1}
                question={q.question}
                options={q.options}
                onIndexSelected={(index) => {
                  setChoice({...choice, [i]: index});
                }}
                key={i}
              />
            );
          })}
          <Button style={style.button} onPress={() => sendSurvey()}>
            Submit
          </Button>
        </ScrollView>
      )}
    </Layout>
  );
}

export default DoSurveyScreen;
