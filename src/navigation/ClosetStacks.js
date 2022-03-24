import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ClosetTabs from './ClosetTabs';
import ClothingAdd from './../views/closet/ClothingAdd';
import OutfitAdd from './../views/outfits/OutfitAdd';
import ClothingDetail from './../views/closet/ClothingDetail';
import ClothingUpdateImage from './../views/closet/ClothingUpdateImage';
import ClothingUpdateType from './../views/closet/ClothingUpdateType';
import ClothingUpdateColor from './../views/closet/ClothingUpdateColor';
import ClothingUpdateSeason from './../views/closet/ClothingUpdateSeason';
import ClothingUpdateSize from './../views/closet/ClothingUpdateSize';
import ClothingUpdateStatus from './../views/closet/ClothingUpdateStatus';
import ClothingUpdateFit from './../views/closet/ClothingUpdateFit';
import ClothingUpdateRate from './../views/closet/ClothingUpdateRate';

import ClosetLogo from './../../assets/images/closet-logo.svg';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <ClosetLogo width={70} height={26} />
  );
}

function ClosetStacks() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#F0F1F1' },
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="Home" component={ClosetTabs} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="ClothingAdd" component={ClothingAdd} />
      <Stack.Screen name="ClothingDetail" component={ClothingDetail} />
      <Stack.Screen name="ClothingUpdateImage" component={ClothingUpdateImage} />
      <Stack.Screen name="ClothingUpdateType" component={ClothingUpdateType} />
      <Stack.Screen name="ClothingUpdateColor" component={ClothingUpdateColor} />
      <Stack.Screen name="ClothingUpdateSeason" component={ClothingUpdateSeason} />
      <Stack.Screen name="ClothingUpdateSize" component={ClothingUpdateSize} />
      <Stack.Screen name="ClothingUpdateStatus" component={ClothingUpdateStatus} />
      <Stack.Screen name="ClothingUpdateFit" component={ClothingUpdateFit} />
      <Stack.Screen name="ClothingUpdateRate" component={ClothingUpdateRate} />
      <Stack.Screen name="OutfitAdd" component={OutfitAdd} />
    </Stack.Navigator>
  );
}

export default ClosetStacks;