import {Layout, Text, Spinner} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import screens from '../constants/screens';
import ScreenTitle from '../components/ScreenTitle';
import SurveyItem from './components/SurveyItem';
import NoSurvey from './components/NoSurvey';
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

// const surveys = [
//   {
//     title: 'Travel Needs',
//     description: 'Survey to understand your travel needs',
//     id: '1',
//   },
//   {
//     title: 'Travel Needs',
//     description: 'Survey to understand your travel needs',
//     id: '2',
//   },
//   {
//     title: 'Travel Needs',
//     description: 'Survey to understand your travel needs.',
//     id: '3',
//   },
//   {
//     title: 'Travel Needs',
//     description: 'Survey to understand your travel needs',
//     id: '4',
//   },
//   {
//     title: 'Travel Needs',
//     description: 'Survey to understand your travel needs',
//     id: '5',
//   },
//   {
//     title: 'Travel Needs',
//     description: 'Survey to understand your travel needs',
//     id: '6',
//   },
// ];

function SurveyScreen({navigation}) {
  const message1 =
    "We're always working hard to make Cube Stop an ideal place for you to stop and rest on your journey.";

  const messsage2 =
    'To help us be the best we can be, please consider taking part in surveys below and we will send you a coupon you can use on your next visit.';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [completeSurveysId, setCompleteSurveysId] = useState([]);

  useEffect(() => {
    firestore()
      .collection('surveys')
      .onSnapshot((querySnap) => {
        let tempData = [];
        querySnap.forEach((docSnap) => {
          let d = docSnap.data();
          console.log(docSnap);
          tempData.push({
            title: d.title,
            description: d.description,
            id: docSnap.id,
          });
        });
        console.log(tempData);
        setData(tempData);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('surveyResponse')
      .onSnapshot((querySnap) => {
        const tempIds = [];
        querySnap.forEach((docSnap) => {
          tempIds.push(docSnap.id);
        });
        setCompleteSurveysId(tempIds);
      });
  }, []);

  let dataFiltered = data;
  if (completeSurveysId.length !== 0)
    dataFiltered = data.filter((item) => completeSurveysId.includes(item.id));

  return (
    <Layout style={style.container}>
      {loading ? (
        <View style={{alignItems: 'center', paddingTop: 16}}>
          <Spinner size="giant" />
        </View>
      ) : (
        <ScrollView>
          <ScreenTitle title="Help make Cube Stop Better" />
          <Text category="h6" style={style.common}>
            {message1}
          </Text>
          <Text category="h6" style={{...style.common, marginTop: 8}}>
            {messsage2}
          </Text>
          <Text category="h5" style={style.title}>
            Available Surveys
          </Text>
          {dataFiltered.length !== 0 ? (
            dataFiltered.map((s) => (
              <SurveyItem
                title={s.title}
                description={s.description}
                key={s.id}
                onPress={() => {
                  navigation.navigate(screens.doSurveyScreen, {
                    surveyId: s.id,
                    title: s.title,
                    description: s.description,
                  });
                }}
              />
            ))
          ) : (
            <NoSurvey />
          )}
        </ScrollView>
      )}
    </Layout>
  );
}

export default SurveyScreen;
