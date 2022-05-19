import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Preloader from '../../components/Preloader';
import { AuthService } from '../../services/AuthService.js';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from '../../../assets/images/chevron-left-orange.svg';

const AccountDelete = ({ navigation }) => {

    const authService = new AuthService();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    passwordValidation = async () => {
        let errorFlag = false;

        // input validation
        if (currentPassword.length == 0) {
            errorFlag = true;
            setPasswordErrorMessage("Vous devez saisir votre mot de passe pour supprimer votre compte");
        }

        if (!errorFlag) {
            setPasswordErrorMessage("");
            deleteAccountAlert();
        }
    };

    const deleteAccountAlert = () =>
        Alert.alert(
            "Supprimer mon compte",
            "Êtes vous sûre de vouloir supprimer votre compte ?",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Oui", onPress: () => deleteAccount() }
            ]
        );

    deleteAccount = () => {
        setIsLoading(true);
        authService.reauthenticate(currentPassword).then(() => {
            authService.accountRemove();
        })
            .then(() => setIsLoading(false))
            .then(() => navigation.goBack())
            .catch(error => {
                setIsLoading(false);
                switch (error.code) {
                    case 'auth/wrong-password':
                        setPasswordErrorMessage('Vérifier votre mot de passe');
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
            <Text style={styles.H1Title}>Suprimer mon compte</Text>
            <View>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Saisissez votre mot de passe</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Mot de passe"}
                    onChangeText={onChangeCurrentPassword}
                    value={currentPassword}
                    secureTextEntry={true}
                />
                {passwordErrorMessage ? <Text style={styles.textDanger}>{passwordErrorMessage}</Text> : null}
            </View>
            <View style={styles.ContainerPrimaryButtonBottom}>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={passwordValidation}>
                    <Text style={styles.PrimaryButtonText}>Supprimer mon compte</Text>
                </TouchableOpacity>
            </View>
            {isLoading === true ?
                <Preloader />
                : null
            }
        </View>
    );
};

export default AccountDelete;