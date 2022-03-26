import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AuthService } from '../../services/AuthService.js';
import { StorageService } from '../../services/StorageService.js';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from '../../../assets/images/chevron-left-orange.svg';
import CameraGrey from '../../../assets/images/camera-grey.svg';
import CameraWhite from '../../../assets/images/camera-white.svg';
import ImageWhite from '../../../assets/images/image-white.svg';
import TimesDark from '../../../assets/images/times-dark.svg';

const AccountUpdate = ({ navigation }) => {

    const isFocused = useIsFocused();
    const authService = new AuthService();
    const [firstname, onChangeFirstname] = useState('');
    const [lastname, onChangeLastname] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [imageName, setImageName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {

        if (isFocused && authService.getUser().displayName) {
            const getLastname = authService.getUser().displayName.replace(/[\[\]?.,\/#!$%\^&\*;:{}=\\|_~()]/g, "").split(" ");
            const userLastname = getLastname[getLastname.length - 1];
            onChangeLastname(userLastname);
            onChangeFirstname(authService.getUser().displayName.replace(/ .*/, ''));
            setImageUri(authService.getUser().photoURL);
        }

    }, [isFocused]);

    const cameraLaunch = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setModalVisible(false);
                const imageUri = response.assets.map(item => item.uri).toString();
                const imageName = response.assets.map(item => item.fileName).toString();
                setImageUri(imageUri);
                setImageName(imageName);
            }
        });
    };

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setModalVisible(false);
                const imageUri = response.assets.map(item => item.uri).toString();
                const imageName = response.assets.map(item => item.fileName).toString();
                setImageUri(imageUri);
                setImageName(imageName);
            }
        });
    };

    const deleteImage = () => {
        setModalVisible(false);
        setImageUri(null);
        setImageName(null);
    };

    editUser = () => {

        if ((imageUri !== authService.getUser().photoURL) && (imageUri !== null)) {
            new StorageService().uploadAndGetUrl(imageName, imageUri).then((photoURL) => {
                return authService.editUser({ firstname, lastname, photoURL }).then(() => navigation.goBack());
            });
        } else if (imageUri == authService.getUser().photoURL) {
            return authService.editUser({ firstname, lastname }).then(() => navigation.goBack());
        } else {
            return authService.editUser({ firstname, lastname, photoURL: '' }).then(() => navigation.goBack());
        }
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            {imageUri !== null ? (
                                <Text style={styles.H3TitleNoMargin}>Modifier la photo</Text>
                            ) : (
                                <Text style={styles.H3TitleNoMargin}>Ajouter une photo</Text>
                            )}
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}>
                                <TimesDark width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.MarginBottom10}>
                            <TouchableOpacity
                                onPress={cameraLaunch}
                                style={styles.PrimaryButtonIcon}>
                                <CameraWhite style={styles.PrimaryButtonIconIcon} />
                                <Text style={styles.PrimaryButtonIconText}>Caméra</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.MarginBottom20}>
                            <TouchableOpacity
                                onPress={selectImage}
                                style={styles.PrimaryButtonIcon}>
                                <ImageWhite style={styles.PrimaryButtonIconIcon} />
                                <Text style={styles.PrimaryButtonIconText}>Galerie de photos</Text>
                            </TouchableOpacity>
                        </View>
                        {imageUri !== null ? (
                            <TouchableOpacity
                                style={styles.contentCenter}
                                onPress={deleteImage}
                            >
                                <Text style={styles.CancelText}>Supprimer</Text>
                            </TouchableOpacity>) : (null)}
                    </View>
                </View>
            </Modal>
            <Text style={styles.H1Title}>Modifier mes informations</Text>
            <View style={styles.contentCenter}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                    {imageUri !== null ? (
                        <View>
                            <View style={styles.MarginBottom10}>
                                <Image
                                    source={{ uri: imageUri }}
                                    style={viewStyles.Image}
                                />
                            </View>
                            <Text style={styles.CancelTextCenter}>Modifier</Text>
                        </View>
                    ) : (
                        <View
                            style={viewStyles.buttonCamera}>
                            <CameraGrey width={50} height={50} />
                        </View>
                    )}
                </TouchableOpacity>
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
                    onPress={editUser}>
                    <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const viewStyles = StyleSheet.create({
    buttonCamera: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#ACB5BC',
        borderRadius: 150,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Image: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: '#ACB5BC',
        borderRadius: 150,
        borderRadius: 150
    }
});

export default AccountUpdate;