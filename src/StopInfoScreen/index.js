import {Layout, Text, Button} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Carousel from './components/Carousel';
import Facilities from './components/Facilities';
import FoodStop from './components/FoodStop';
import openMap from 'react-native-open-maps';

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
    marginTop: 8,
  },
  image: {
    height: 200,
    width: undefined,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

// const data = {
//   name: 'Chinnar',
//   address:
//     'NH 48, Bangalore to Chennai Highway, Village Chinnar, Tamil Nadu 635117',
//   lat: '',
//   long: '',
// };

function StopInfoScreen({route}) {
  const {data} = route.params;

  const driveHere = () => {
    openMap({latitude: data.lat, longitude: data.long, provider: 'google'});
  };

  return (
    <Layout style style={style.container}>
      <ScrollView>
        <Carousel />
        <Text category="h4" style={style.title}>
          {data.name}
        </Text>
        <Text category="p1" style={style.common}>
          {data.address}
        </Text>
        <Button style={style.button} onPress={() => driveHere()}>
          Drive Here
        </Button>
        <Text category="h5" style={style.title}>
          Facilities
        </Text>
        <Facilities />
        <Text category="h5" style={{...style.title, marginBottom: 8}}>
          Food Stops
        </Text>
        <FoodStop
          description="The world’s first chef-less Indian-veg cuisine quick service restaurant, having the presence across the regions of India. With an emphasis on consistency in taste, quality, service and ambience, Cafe Udupi Ruchi serves the guests with tasty, healthy and safe vegetarian food based on a unique concept, offering wide range of Indian veg cuisine food, serving from breakfast to dinner including South Indian, North Indian and Continental fusion."
          imgSrc={require('../../res/image/demo_cafe.jpg')}
          name="Cafe Udupi Ruchi"
        />
        <FoodStop
          name="Chai Thela"
          description="Chai Thela came into existence in 2015, as an interpretation to create an authentic and hygienic place for ‘Chai’. With a focus on offering the best quality, fresh and hygienic tea along with accompaniments that go well with it. One can find a range of everyday and exotic tea flavors at Chai Thela."
          imgSrc={require('../../res/image/demo_thela.jpg')}
        />
      </ScrollView>
    </Layout>
  );
}

export default StopInfoScreen;
