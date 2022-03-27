import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../../assets/styles/style.js';

export default function SignupStep4({ password, onChangePassword, passwordErrorMessage, confirmPassword, onChangeConfirmPassword, confirmPasswordErrorMessage, registerUser }) {

    return (
        <View style={styles.ContainerView}>
            <View style={styles.MarginBottom40}>
                <Text style={styles.H2TitleCenter}>Pour finir, tu peux choisir un mot de passe</Text>
            </View>
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
                {passwordErrorMessage ? <Text style={styles.textDanger}>{passwordErrorMessage}</Text> : null}
            </View>
            <View style={styles.MarginBottom20}>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Confirmation du mot de passe</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Mot de passe"}
                    onChangeText={onChangeConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry={true}
                />
                {confirmPasswordErrorMessage ? <Text style={styles.textDanger}>{confirmPasswordErrorMessage}</Text> : null}
            </View>
            <View style={styles.ContainerPrimaryButtonBottom}>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={() => registerUser()}>
                    <Text style={styles.PrimaryButtonText}>Créer mon compte</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}