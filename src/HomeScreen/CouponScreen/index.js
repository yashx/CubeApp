import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import MyCoupon from './components/MyCoupon';
import EarnCoupon from './components/EarnCoupon';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// const data = [
//   {
//     id: 1,
//     code: 'KOTAK125',
//     title: 'Get 20% discount using Kotak Credit Card or Debit Card',
//     description:
//       'Get 20% discount using Kotak Credit Card or Debit Card Get 20% discount using Kotak Credit Card or Debit Card',
//   },
//   {
//     id: 2,
//     code: 'KOTAK125',
//     title: 'Get 20% discount using Kotak Credit Card or Debit Card',
//     description:
//       'Get 20% discount using Kotak Credit Card or Debit Card Get 20% discount using Kotak Credit Card or Debit Card',
//   },
//   {
//     id: 3,
//     code: 'KOTAK125',
//     title: 'Get 20% discount using Kotak Credit Card or Debit Card',
//     description:
//       'Get 20% discount using Kotak Credit Card or Debit Card Get 20% discount using Kotak Credit Card or Debit Card',
//   },
//   {
//     id: 4,
//     code: 'KOTAK125',
//     title: 'Get 20% discount using Kotak Credit Card or Debit Card',
//     description:
//       'Get 20% discount using Kotak Credit Card or Debit Card Get 20% discount using Kotak Credit Card or Debit Card',
//   },
//   {
//     id: 5,
//     code: 'KOTAK125',
//     title: 'Get 20% discount using Kotak Credit Card or Debit Card',
//     description:
//       'Get 20% discount using Kotak Credit Card or Debit Card Get 20% discount using Kotak Credit Card or Debit Card',
//   },
//   {
//     id: 6,
//     code: 'KOTAK125',
//     title: 'Get 20% discount using Kotak Credit Card or Debit Card',
//     description:
//       'Get 20% discount using Kotak Credit Card or Debit Card Get 20% discount using Kotak Credit Card or Debit Card',
//   },
//   {
//     id: 7,
//     code: 'KOTAK125',
//     title: 'Get 20% discount using Kotak Credit Card or Debit Card',
//     description:
//       'Get 20% discount using Kotak Credit Card or Debit Card Get 20% discount using Kotak Credit Card or Debit Card',
//   },
//   {
//     id: 8,
//     code: 'KOTAK125',
//     title: 'Get 20% discount using Kotak Credit Card or Debit Card',
//     description:
//       'Get 20% discount using Kotak Credit Card or Debit Card Get 20% discount using Kotak Credit Card or Debit Card',
//   },
// ];

function CouponScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('coupons')
      .onSnapshot((querySnap) => {
        tempData = [];
        querySnap.forEach((docSnap) => {
          let d = docSnap.data();
          tempData.push({
            code: d.code,
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

  return (
    <Layout style={{flex: 1}}>
      {loading ? (
        <View style={{alignItems: 'center', paddingTop: 16}}>
          <Spinner size="giant" />
        </View>
      ) : (
        <ScrollView>
          <EarnCoupon />
          <MyCoupon data={data} />
        </ScrollView>
      )}
    </Layout>
  );
}

export default CouponScreen;
