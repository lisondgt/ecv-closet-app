import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from "@react-navigation/native";
import { AuthService } from './../services/AuthService';

import Home from './../views/login-registration/Home';
import Login from './../views/login-registration/Login';
import Signup from './../views/login-registration/Signup';
import ClosetTabs from './ClosetTabs';
import ClothingAdd from './../views/closet/ClothingAdd';
import ClothingDetail from './../views/closet/ClothingDetail';
import ClothingUpdateImage from './../views/closet/ClothingUpdateImage';
import ClothingUpdateType from './../views/closet/ClothingUpdateType';
import ClothingUpdateColor from './../views/closet/ClothingUpdateColor';
import ClothingUpdateSeason from './../views/closet/ClothingUpdateSeason';
import ClothingUpdateSize from './../views/closet/ClothingUpdateSize';
import ClothingUpdateStatus from './../views/closet/ClothingUpdateStatus';
import ClothingUpdateFit from './../views/closet/ClothingUpdateFit';
import ClothingUpdateRate from './../views/closet/ClothingUpdateRate';
import OutfitAdd from './../views/outfits/OutfitAdd';
import OutfitDetail from '../views/outfits/OutfitDetail';
import OutfitUpdate from '../views/outfits/OutfitUpdate';
import OutfitUpdateAccessories from '../views/outfits/OutfitUpdateAccessories';
import OutfitUpdateSeason from '../views/outfits/OutfitUpdateSeason';
import AccountUpdate from './../views/account/AccountUpdate';
import AccountUpdateEmail from '../views/account/AccountUpdateEmail';
import AccountUpdatePassword from '../views/account/AccountUpdatePassword';
import AccountDelete from '../views/account/AcountDelete';

import ClosetLogo from './../../assets/images/closet-logo.svg';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <ClosetLogo width={70} height={26} />
  );
}

function ClosetStacks() {

  const isFocused = useIsFocused();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    if (isFocused) {
      return new AuthService().getUserState(onAuthStateChanged);
    }
  }, [isFocused]);

  if (initializing) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#F0F1F1' },
        headerShadowVisible: false,
      }}>
      {user ? (
        <>
          <Stack.Screen name="ClosetTabs" component={ClosetTabs} options={{
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
          <Stack.Screen name="OutfitDetail" component={OutfitDetail} />
          <Stack.Screen name="OutfitUpdate" component={OutfitUpdate} />
          <Stack.Screen name="OutfitUpdateAccessories" component={OutfitUpdateAccessories} />
          <Stack.Screen name="OutfitUpdateSeason" component={OutfitUpdateSeason} />
          <Stack.Screen name="AccountUpdate" component={AccountUpdate} />
          <Stack.Screen name="AccountUpdateEmail" component={AccountUpdateEmail} />
          <Stack.Screen name="AccountUpdatePassword" component={AccountUpdatePassword} />
          <Stack.Screen name="AccountDelete" component={AccountDelete} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default ClosetStacks;