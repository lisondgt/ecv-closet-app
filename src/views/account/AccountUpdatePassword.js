import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from '../../../assets/images/chevron-left-orange.svg';

const AccountUpdatePassword = ({ navigation }) => {

    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [newPassword, onChangeNewPassword] = useState('');
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
    const [confirmNewPassword, onChangeConfirmNewPassword] = useState('');
    const [confirmNewPasswordErrorMessage, setConfirmNewPasswordErrorMessage] = useState('');

    passwordValidation = async () => {
        let errorFlag = false;

        // input validation
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
            setNewPasswordErrorMessage("")
            setConfirmNewPasswordErrorMessage("")
            changePassword()
        }
    }

    const reauthenticate = () => {
        var user = auth().currentUser;
        var cred = auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const changePassword = () => {
        reauthenticate(currentPassword).then(() => {
            auth().currentUser.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
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
        </View>
    );
}

const viewStyles = StyleSheet.create({
});

export default AccountUpdatePassword;