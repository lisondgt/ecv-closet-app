import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { AuthService } from '../../services/AuthService';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';

const Login = ({ navigation }) => {

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  updateInputVal = (value, name) => {
    const state = values;
    state[name] = value;
    setValues(state);
  }

  userLogin = () => {
    if (values.email === '' && values.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      setIsLoading(true)
      new AuthService().signIn(values.email, values.password).then(() => {
        setIsLoading(false)
      })
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()}
          style={styles.IconHeaderLeft}>
          <ChevronLeftOrange width={25} height={25} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.ContainerView}>
      {isLoading === true ?
        <View style={viewStyles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
        : null
      }
      <Text style={styles.H2TitleCenter}>Content de te revoir !</Text>
      <View style={styles.MarginBottom20}>
        <View style={styles.MarginBottom10}>
          <Text style={styles.Text}>Adresse email</Text>
        </View>
        <TextInput
          style={styles.input}
          label={"Email"}
          autoCapitalize='none'
          keyboardType="email-address"
          autoCorrect={false}
          onChangeText={(value) => updateInputVal(value, 'email')}
        />
      </View>
      <View style={styles.MarginBottom40}>
        <View style={styles.MarginBottom10}>
          <Text style={styles.Text}>Mot de passe</Text>
        </View>
        <TextInput
          style={styles.input}
          label={"Password"}
          onChangeText={(value) => updateInputVal(value, 'password')}
          secureTextEntry={true}
        />
      </View>
      <View>
        <View style={styles.MarginBottom15}>
          <TouchableOpacity
            style={styles.PrimaryButton}
            onPress={() => userLogin()}>
            <Text style={styles.PrimaryButtonText}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const viewStyles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F1F1'
  }
})

export default Login;