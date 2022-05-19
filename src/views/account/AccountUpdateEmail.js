import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Preloader from '../../components/Preloader';
import { AuthService } from '../../services/AuthService.js';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from '../../../assets/images/chevron-left-orange.svg';

const AccountUpdateEmail = ({ navigation }) => {

    const authService = new AuthService();
    const [isLoading, setIsLoading] = useState(false);
    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState(authService.getUser().email);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [errorPasswordMessage, setErrorPasswordMessage] = useState('');

    emailValidation = async () => {
        let errorFlag = false;
        let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        setErrorPasswordMessage("");

        // input validation
        if (regEmail.test(email) === false) {
            errorFlag = true;
            setEmailErrorMessage("L'adresse e-mail est mal formatée");
        }

        if (!errorFlag) {
            setEmailErrorMessage("");
            changeEmail();
        }
    };

    const changeEmail = () => {
        setIsLoading(true);
        authService.reauthenticate(password).then(() => {
            authService.changeEmail(email);
        })
            .then(() => setIsLoading(false))
            .then(() => navigation.goBack())
            .catch(error => {
                setIsLoading(false);
                switch (error.code) {
                    case 'auth/wrong-password':
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
                {errorPasswordMessage ? <Text style={styles.textDanger}>{errorPasswordMessage}</Text> : null}
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
            {isLoading === true ?
                <Preloader />
                : null
            }
        </View>
    );
};

export default AccountUpdateEmail;