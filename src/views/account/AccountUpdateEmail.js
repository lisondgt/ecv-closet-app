import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from '../../../assets/images/chevron-left-orange.svg';

const AccountUpdateEmail = ({ navigation }) => {

    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState(auth().currentUser.email);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    emailValidation = async () => {
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
          setEmailErrorMessage("")
          changeEmail()
        }
      }

    const reauthenticate = () => {
        var user = auth().currentUser;
        var cred = auth.EmailAuthProvider.credential(
            user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    const changeEmail = () => {
        reauthenticate(password).then(() => {
            auth().currentUser.updateEmail(email).then(() => {
                console.log("Email updated!");
            }).catch((error) => { console.log(error); });
        }).then(() => navigation.goBack())
            .catch((error) => { console.log(error); });
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
            <Text style={styles.H1Title}>Modifier mon email</Text>
            <View style={styles.MarginBottom20}>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Mot de passe</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Mot de passe"}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                />
            </View>
            <View>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Email</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Email"}
                    autoCapitalize='none'
                    keyboardType="email-address"
                    autoCorrect={false}
                    onChangeText={onChangeEmail}
                    value={email}
                />
                {emailErrorMessage ? <Text style={styles.textDanger}>{emailErrorMessage}</Text> : null}
            </View>
            <View style={styles.ContainerPrimaryButtonBottom}>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={emailValidation}>
                    <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const viewStyles = StyleSheet.create({
});

export default AccountUpdateEmail;