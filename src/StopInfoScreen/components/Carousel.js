import React, {useState} from 'react';
import {ViewPager} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  image: {
    height: 200,
    width: undefined,
  },
});

function Carousel() {
  const [selected, setSelected] = useState(0);

  return (
    <ViewPager selectedIndex={selected} onSelect={(i) => setSelected(i)}>
      <Image
        style={style.image}
        source={require('../../../res/image/demo_stop1.jpg')}
      />
      <Image
        style={style.image}
        source={require('../../../res/image/demo_stop2.jpg')}
      />
      <Image
        style={style.image}
        source={require('../../../res/image/demo_stop3.jpg')}
      />
      <Image
        style={style.image}
        source={require('../../../res/image/demo_stop4.jpg')}
      />
    </ViewPager>
  );
}

export default Carousel;
