const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.surveyComplete = functions.https.onCall(async (data, context) => {
  // uuid of user who completed survey
  const uuid = context.auth.uid;

  await admin
    .firestore()
    .collection("users")
    .doc(uuid)
    .collection("coupons")
    .add({
      code: "SURVEY",
      title: "Get 20% off",
      description: "Thanks for completing a survey",
    });
});

exports.redeemReferral = functions.https.onCall(async (data, context) => {
  // uuid of user
  const uuid = context.auth.uid;

  // uuid as coupon code
  const referrer = data.code;

  await admin
    .firestore()
    .collection("users")
    .doc(uuid)
    .collection("coupons")
    .add({
      code: "NEWUSER",
      title: "Get 30% off",
      description: "Welcome to Cube Stop",
    });
  await admin
    .firestore()
    .collection("users")
    .doc(referrer)
    .collection("coupons")
    .add({
      code: "REFERRER",
      title: "Get 10% off",
      description: "Thanks for bringing new users to Cube Stop",
    });
});
