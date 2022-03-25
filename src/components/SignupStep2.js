import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import styles from '../../assets/styles/style.js';

export default function SignupStep2({ email, onChangeEmail, emailErrorMessage, nextStep }) {

    return (
        <View style={styles.ContainerView}>
            <View style={styles.MarginBottom40}>
                <Text style={styles.H2TitleCenter}>... et maintenant ton adresse email</Text>
            </View>
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
                    onChangeText={onChangeEmail}
                    value={email}
                />
                {emailErrorMessage ? <Text style={styles.textDanger}>{emailErrorMessage}</Text> : null}
            </View>
            <View style={styles.ContainerPrimaryButtonBottom}>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={nextStep}>
                    <Text style={styles.PrimaryButtonText}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const componentStyles = StyleSheet.create({
});