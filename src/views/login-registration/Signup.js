import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Preloader from '../../components/Preloader';
import SignupStep1 from '../../components/SignupStep1';
import SignupStep2 from '../../components/SignupStep2';
import SignupStep3 from '../../components/SignupStep3';
import SignupStep4 from '../../components/SignupStep4';
import { AuthService } from '../../services/AuthService';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import TimesOrange from './../../../assets/images/times-orange.svg';
import { StorageService } from '../../services/StorageService';

const Signup = ({ navigation }) => {

  const [firstname, onChangeFirstname] = useState('');
  const [lastname, onChangeLastname] = useState('');
  const [email, onChangeEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const HeaderLeft = () => {
    return (
      step > 1 ?
        <TouchableOpacity
          onPress={prevStep}
          style={styles.IconHeaderLeft}>
          <ChevronLeftOrange width={25} height={25} />
        </TouchableOpacity>
        : <TouchableOpacity
          onPress={() =>
            navigation.goBack()}
          style={styles.IconHeaderLeft}>
          <ChevronLeftOrange width={25} height={25} />
        </TouchableOpacity>

    );
  };

  const HeaderRight = () => {
    return (
      step > 1 ?
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.IconHeaderRight}>
          <TimesOrange width={25} height={25} />
        </TouchableOpacity>
        : null

    );
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  step2Validation = async () => {
    let errorFlag = false;

    // input validation
    if (email.length == 0) {
      errorFlag = true;
      setEmailErrorMessage("L'email est requis");
    }

    if (errorFlag) {
      console.log("errorFlag");

      /** Call Your API */
    } else {
      setEmailErrorMessage("");
      nextStep();
    }
  };

  passwordValidation = async () => {
    let errorFlag = false;

    // input validation
    if (password.length == 0) {
      errorFlag = true;
      setPasswordErrorMessage("Le mot de passe est requis");
    } else if (password.length < 8 || password.length > 20) {
      errorFlag = true;
      setPasswordErrorMessage("Votre mot de passe doit contenir entre 8 et 20 charactères");
    }

    if (confirmPassword.length == 0) {
      errorFlag = true;
      setConfirmPasswordErrorMessage("La confirmation du mot de passe est requise");
    } else if (confirmPassword.length < 8 || confirmPassword.length > 20) {
      errorFlag = true;
      setConfirmPasswordErrorMessage("Votre mot de passe doit contenir entre 8 et 20 charactères");
    } else if (password !== confirmPassword) {
      errorFlag = true;
      setConfirmPasswordErrorMessage("Le mot de passe et la confirmation ne correspondent pas");
    }

    if (errorFlag) {
      console.log("errorFlag");

      /** Call Your API */
    } else {
      setPasswordErrorMessage("");
      setConfirmPasswordErrorMessage("");
      registerUser();
    }
  };

  registerUser = () => {
    const authService = new AuthService();
    if (imageUri !== '') {
      new StorageService().uploadAndGetUrl(imageName, imageUri).then((photoURL) => {
        setIsLoading(true);
        return authService.signUp({ email, password, firstname, lastname, photoURL }).then(() => {
          setIsLoading(false);
        });
      });
    } else {
      setIsLoading(true);
      authService.signUp({ email, password, firstname, lastname }).then(() => {
        setIsLoading(false);
      });
    }

  };

  const updateHeader = () => {
    return (
      navigation.setOptions({
        headerLeft: () => (
          <HeaderLeft />
        ),
        headerRight: () => (
          <HeaderRight />
        )
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {updateHeader()}
      {
        {
          1: <SignupStep1
            firstname={firstname}
            lastname={lastname}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            nextStep={nextStep}
          />,
          2: <SignupStep2
            email={email}
            onChangeEmail={onChangeEmail}
            emailErrorMessage={emailErrorMessage}
            nextStep={step2Validation}
          />,
          3: <SignupStep3
            imageUri={imageUri}
            setImageUri={setImageUri}
            imageName={imageName}
            setImageName={setImageName}
            nextStep={nextStep}
          />,
          4: <SignupStep4
            password={password}
            onChangePassword={onChangePassword}
            confirmPassword={confirmPassword}
            passwordErrorMessage={passwordErrorMessage}
            onChangeConfirmPassword={onChangeConfirmPassword}
            confirmPasswordErrorMessage={confirmPasswordErrorMessage}
            registerUser={passwordValidation}
          />,
        }[step]
      }
      {isLoading === true ?
        <Preloader />
        : null
      }
    </View>
  );
};

export default Signup;