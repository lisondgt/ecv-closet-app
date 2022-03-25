import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ClothingList from './../views/closet/ClothingList';
import OutfitList from './../views/outfits/OutfitList';
import Calendar from './../views/calendar/Calendar';
import Analytics from './../views/analytics/Analytics';
import Account from './../views/account/Account';

import ClosetLogo from './../../assets/images/closet-logo.svg';
import ClothesHangerOrange from './../../assets/images/clothes-hanger-orange.svg';
import ClothesHangerDark from './../../assets/images/clothes-hanger-dark.svg';
import TshirtOrange from './../../assets/images/tshirt-orange.svg';
import TshirtDark from './../../assets/images/tshirt-dark.svg';
import CalendarOrange from './../../assets/images/calendar-orange.svg';
import CalendarDark from './../../assets/images/calendar-dark.svg';
import AnalyticsOrange from './../../assets/images/analytics-orange.svg';
import AnalyticsDark from './../../assets/images/analytics-dark.svg';
import UserOrange from './../../assets/images/user-orange.svg';
import UserDark from './../../assets/images/user-dark.svg';

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <ClosetLogo width={70} height={26} />
  );
}

function ClosetTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          border: 'none',
          boxShadow: '5px 0px 5px rgba(0, 0, 0, 0.1)',
          shadowColor: '#000000',
          shadowOffset: { width: 5, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#F0F1F1' },
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        name="ClothingList"
        component={ClothingList}
        options={{
          tabBarLabel: 'Closet',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => (
            focused
              ? <ClothesHangerOrange width={30} height={30} />
              : <ClothesHangerDark width={30} height={30} />
          ),
        }} />
      <Tab.Screen
        name="OutfitList"
        component={OutfitList}
        options={{
          tabBarLabel: 'Outfits',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => (
            focused
              ? <TshirtOrange width={30} height={30} />
              : <TshirtDark width={30} height={30} />
          ),
        }} />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => (
            focused
              ? <CalendarOrange width={30} height={30} />
              : <CalendarDark width={30} height={30} />
          ),
        }} />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarLabel: 'Analytics',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => (
            focused
              ? <AnalyticsOrange width={30} height={30} />
              : <AnalyticsDark width={30} height={30} />
          ),
        }} />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => (
            focused
              ? <UserOrange width={30} height={30} />
              : <UserDark width={30} height={30} />
          ),
        }} />
    </Tab.Navigator>
  );
}

export default ClosetTabs;