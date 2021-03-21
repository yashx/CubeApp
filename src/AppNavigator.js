import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import FeedbackScreen from './FeedbackScreen';
import ReferralScreen from './ReferralScreen';
import StopInfoScreen from './StopInfoScreen';
import SurveyScreen from './SurveyScreen';
import {createStackNavigator} from '@react-navigation/stack';
import screens from './constants/screens';
import DoSurveyScreen from './DoSurveyScreen';
import LogInScreen from './HomeScreen/LogInScreen';

function AppNavigator() {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={screens.homeScreen}
        screenOptions={{title: ''}}>
        <Screen
          options={{headerShown: false}}
          name={screens.homeScreen}
          component={HomeScreen}
        />
        <Screen component={FeedbackScreen} name={screens.feedbackScreen} />
        <Screen component={ReferralScreen} name={screens.referralScreen} />
        <Screen component={StopInfoScreen} name={screens.stopInfoScreen} />
        <Screen component={SurveyScreen} name={screens.surveyScreen} />
        <Screen component={DoSurveyScreen} name={screens.doSurveyScreen} />
        <Screen
          component={LogInScreen}
          options={{headerShown: false}}
          name={screens.loginScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
