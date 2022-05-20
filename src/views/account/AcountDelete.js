import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Preloader from '../../components/Preloader';
import ModalComponent from '../../components/ModalComponent';
import { AuthService } from '../../services/AuthService.js';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from '../../../assets/images/chevron-left-orange.svg';

const AccountDelete = ({ navigation }) => {

    const authService = new AuthService();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    passwordValidation = async () => {
        let errorFlag = false;

        // input validation
        if (currentPassword.length == 0) {
            errorFlag = true;
            setPasswordErrorMessage("Vous devez saisir votre mot de passe pour supprimer votre compte");
        }

        if (!errorFlag) {
            setPasswordErrorMessage("");
            setModalVisible(true);
        }
    };

    const modalContent = () => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => deleteAccount()}
                    style={styles.PrimaryButton}
                >
                    <Text style={styles.PrimaryButtonText}>Supprimer mon compte</Text>
                </TouchableOpacity>
            </View>
        );
    };

    deleteAccount = () => {
        setIsLoading(true);
        setModalVisible(false);
        authService.reauthenticate(currentPassword).then(() => {
            authService.accountRemove();
        })
            .then(() => setIsLoading(false))
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
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} modalTitle={"Êtes vous sûre de vouloir supprimer votre compte ?"} modalContent={modalContent()} />
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