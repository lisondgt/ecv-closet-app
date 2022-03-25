import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import styles from '../../assets/styles/style.js';

export default function SignupStep1({ firstname, onChangeFirstname, lastname, onChangeLastname, nextStep }) {

    return (
        <View style={styles.ContainerView}>
            <View style={styles.MarginBottom40}>
                <Text style={styles.H2TitleCenter}>Bienvenue ! Commençons avec ton nom</Text>
            </View>
            <View style={styles.MarginBottom20}>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Nom</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Nom"}
                    onChangeText={onChangeLastname}
                    value={lastname}
                />
            </View>
            <View style={styles.MarginBottom20}>
                <View style={styles.MarginBottom10}>
                    <Text style={styles.Text}>Prénom</Text>
                </View>
                <TextInput
                    style={styles.input}
                    label={"Prenom"}
                    onChangeText={onChangeFirstname}
                    value={firstname}
                />
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