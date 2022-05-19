import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Preloader from '../../components/Preloader';
import { AuthService } from '../../services/AuthService';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';

const Login = ({ navigation }) => {

  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  updateInputVal = (value, name) => {
    const state = values;
    state[name] = value;
    setValues(state);
  };

  userLogin = () => {
    setIsLoading(true);
    new AuthService().signIn(values.email, values.password)
      .then(() => setIsLoading(false))
      .catch(error => {
        setIsLoading(false);
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorEmailMessage('Vérifier votre adresse email');
            setErrorPasswordMessage('');
          case 'auth/invalid-email':
            setErrorEmailMessage('Vérifier votre adresse email');
            setErrorPasswordMessage('');
          case 'auth/wrong-password':
            setErrorEmailMessage('');
            setErrorPasswordMessage('Vérifier votre mot de passe');
            break;
        }
      });
  };

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
      <Text style={styles.H2TitleCenter}>Content de te revoir !</Text>
      <View style={styles.MarginBottom20}>
        <View style={styles.MarginBottom10}>
          <Text style={styles.Text}>Email</Text>
        </View>
        <TextInput
          style={styles.input}
          label={"Email"}
          autoCapitalize='none'
          keyboardType="email-address"
          autoCorrect={false}
          onChangeText={(value) => updateInputVal(value, 'email')}
        />
        {errorEmailMessage ? <Text style={styles.textDanger}>{errorEmailMessage}</Text> : null}
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
        {errorPasswordMessage ? <Text style={styles.textDanger}>{errorPasswordMessage}</Text> : null}
      </View>
      <View>
        {errorMessage ? <Text style={styles.textDanger}>{errorMessage}</Text> : null}
        <View style={styles.MarginBottom15}>
          <TouchableOpacity
            style={styles.PrimaryButton}
            onPress={() => userLogin()}>
            <Text style={styles.PrimaryButtonText}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading === true ?
        <Preloader />
        : null
      }
    </View>
  );
};

export default Login;