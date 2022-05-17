import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Preloader from '../../components/Preloader';
import { AuthService } from '../../services/AuthService.js';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from '../../../assets/images/chevron-left-orange.svg';

const AccountUpdatePassword = ({ navigation }) => {

    const authService = new AuthService();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState('');
    const [newPassword, onChangeNewPassword] = useState('');
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
    const [confirmNewPassword, onChangeConfirmNewPassword] = useState('');
    const [confirmNewPasswordErrorMessage, setConfirmNewPasswordErrorMessage] = useState('');

    passwordValidation = async () => {
        let errorFlag = false;

        // input validation
        if (currentPassword.length == 0) {
            errorFlag = true;
            setCurrentPasswordErrorMessage("Vous devez saisir votre ancien mot de passe");
        }

        if (newPassword.length == 0) {
            errorFlag = true;
            setNewPasswordErrorMessage("Le mot de passe est requis");
        } else if (newPassword.length < 8 || newPassword.length > 20) {
            errorFlag = true;
            setNewPasswordErrorMessage("Votre mot de passe doit contenir entre 8 et 20 charactères");
        }

        if (confirmNewPassword.length == 0) {
            errorFlag = true;
            setConfirmNewPasswordErrorMessage("La confirmation du mot de passe est requise");
        } else if (confirmNewPassword.length < 8 || confirmNewPassword.length > 20) {
            errorFlag = true;
            setConfirmNewPasswordErrorMessage("Votre mot de passe doit contenir entre 8 et 20 charactères");
        } else if (newPassword !== confirmNewPassword) {
            errorFlag = true;
            setConfirmNewPasswordErrorMessage("Le mot de passe et la confirmation ne correspondent pas");
        }

        if (errorFlag) {
            console.log("errorFlag");

            /** Call Your API */
        } else {
            setNewPasswordErrorMessage("");
            setConfirmNewPasswordErrorMessage("");
            changePassword();
        }
    };

    const changePassword = () => {
        setIsLoading(true);
        authService.reauthenticate(currentPassword).then(() => {
            authService.changePassword(newPassword);
        })
            .then(() => setIsLoading(false))
            .then(() => navigation.goBack());
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
            <Text style={styles.H1Title}>Modifier mon mot de passe</Text>
            <View style={styles.MarginBottom20}>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Ancien mot de passe</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Mot de passe"}
                    onChangeText={onChangeCurrentPassword}
                    value={currentPassword}
                    secureTextEntry={true}
                />
                {currentPasswordErrorMessage ? <Text style={styles.textDanger}>{currentPasswordErrorMessage}</Text> : null}
            </View>
            <View style={styles.MarginBottom20}>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Nouveau mot de passe</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Nouveau mot de passe"}
                    onChangeText={onChangeNewPassword}
                    value={newPassword}
                    secureTextEntry={true}
                />
                {newPasswordErrorMessage ? <Text style={styles.textDanger}>{newPasswordErrorMessage}</Text> : null}
            </View>
            <View>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Confirmation du nouveau mot de passe</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Confirmation du nouveau mot de passe"}
                    onChangeText={onChangeConfirmNewPassword}
                    value={confirmNewPassword}
                    secureTextEntry={true}
                />
                {confirmNewPasswordErrorMessage ? <Text style={styles.textDanger}>{confirmNewPasswordErrorMessage}</Text> : null}
            </View>
            <View style={styles.ContainerPrimaryButtonBottom}>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={passwordValidation}>
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

export default AccountUpdatePassword;