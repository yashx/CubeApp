import ScreenTitle from '../../components/ScreenTitle';
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, PermissionsAndroid} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import StopItem from './components/StopItem';
import screens from '../../constants/screens';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
import HaversineGeolocation from 'haversine-geolocation';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function requestLocationPermission() {
  try {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cube App',
        message: 'To find Cube Stops near you',
      },
    );
  } catch (err) {
    console.warn(err);
  }
}

// const data = [
//   {
//     url:
//       'https://media-cdn.tripadvisor.com/media/photo-s/1c/3f/c9/cd/cube-stop-is-here-to.jpg',
//     title: 'Punjabi Bagh',
//     address: 'Road No. 4, House No. 11, Punjabi Bagh Extension, New Delhi',
//     km: '1.0',
//   },
//   {
//     url:
//       'https://media-cdn.tripadvisor.com/media/photo-s/1c/3f/c9/cd/cube-stop-is-here-to.jpg',
//     title: 'Punjabi Bagh',
//     address: 'Road No. 4, House No. 11, Punjabi Bagh Extension, New Delhi',
//     km: '2.4',
//   },
//   {
//     url:
//       'https://media-cdn.tripadvisor.com/media/photo-s/1c/3f/c9/cd/cube-stop-is-here-to.jpg',
//     title: 'Punjabi Bagh',
//     address: 'Road No. 4, House No. 11, Punjabi Bagh Extension, New Delhi',
//     km: '3.2',
//   },
//   {
//     url:
//       'https://media-cdn.tripadvisor.com/media/photo-s/1c/3f/c9/cd/cube-stop-is-here-to.jpg',
//     title: 'Punjabi Bagh',
//     address: 'Road No. 4, House No. 11, Punjabi Bagh Extension, New Delhi',
//     km: '4.0',
//   },
//   {
//     url:
//       'https://media-cdn.tripadvisor.com/media/photo-s/1c/3f/c9/cd/cube-stop-is-here-to.jpg',
//     title: 'Punjabi Bagh',
//     address: 'Road No. 4, House No. 11, Punjabi Bagh Extension, New Delhi',
//     km: '7.6',
//   },
// ];

function StopsScreen({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchData(userPosition) {
    console.log('firebase fetch');
    firestore()
      .collection('stops')
      .get()
      .then((querySnap) => {
        tempData = [];
        querySnap.forEach((docSnap) => {
          d = docSnap.data();
          const points = [
            {
              latitude: userPosition.coords.latitude,
              longitude: userPosition.coords.longitude,
            },
            {
              latitude: d.lat,
              longitude: d.long,
            },
          ];
          d.distance = HaversineGeolocation.getDistanceBetween(
            points[0],
            points[1],
          );
          tempData.push(d);
        });
        tempData.sort((a, b) => {
          if (a.distance < b.distance) return -1;
          if (a.distance > b.distance) return 1;
          return 0;
        });
        setData(tempData);
        setLoading(false);
      });
  }

  useEffect(() => {
    console.log('get user location');
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        fetchData(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <Layout style={style.container}>
      <ScrollView>
        <ScreenTitle title="Cube Stops" />
        {loading ? (
          <View style={{alignItems: 'center'}}>
            <Spinner size="giant" />
          </View>
        ) : (
          data.map((d, i) => {
            return (
              <StopItem
                data={d}
                key={i}
                onPress={() =>
                  navigation.navigate(screens.stopInfoScreen, {
                    data: d,
                  })
                }
              />
            );
          })
        )}
      </ScrollView>
    </Layout>
  );
}

export default StopsScreen;
