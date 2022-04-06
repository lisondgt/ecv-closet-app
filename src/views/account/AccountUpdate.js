import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import Preloader from '../../components/Preloader';
import ImageLibrary from '../../components/ImageLibrary';
import CameraLaunch from '../../components/CameraLaunch';
import ModalComponent from '../../components/ModalComponent';
import { useIsFocused } from "@react-navigation/native";
import { AuthService } from '../../services/AuthService.js';
import { StorageService } from '../../services/StorageService.js';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from '../../../assets/images/chevron-left-orange.svg';
import CameraGrey from '../../../assets/images/camera-grey.svg';
import TimesDark from '../../../assets/images/times-dark.svg';

const AccountUpdate = ({ navigation }) => {

    const isFocused = useIsFocused();
    const authService = new AuthService();
    const currentUser = authService.getUser();
    const [isLoading, setIsLoading] = useState(false);
    const [firstname, onChangeFirstname] = useState('');
    const [lastname, onChangeLastname] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [imageName, setImageName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const modalTitle = imageUri !== null ? (
        'Modifier la photo'
    ) : (
        'Ajouter une photo'
    );

    useEffect(() => {

        if (isFocused && currentUser.displayName) {
            const getLastname = currentUser.displayName.replace(/[\[\]?.,\/#!$%\^&\*;:{}=\\|_~()]/g, "").split(" ");
            const userLastname = getLastname[getLastname.length - 1];
            onChangeLastname(userLastname);
            onChangeFirstname(currentUser.displayName.replace(/ .*/, ''));
            setImageUri(currentUser.photoURL);
        }

    }, [isFocused]);

    const modalContent = () => {
        return (
            <View>
                <View style={styles.MarginBottom10}>
                    <CameraLaunch onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
                </View>
                <View style={styles.MarginBottom20}>
                    <ImageLibrary onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
                </View>
                {imageUri !== null ? (
                    <TouchableOpacity
                        style={styles.contentCenter}
                        onPress={deleteImage}
                    >
                        <Text style={styles.CancelText}>Supprimer</Text>
                    </TouchableOpacity>) : (null)}
            </View>
        );
    };

    const deleteImage = () => {
        setModalVisible(false);
        setImageUri(null);
        setImageName('');
    };

    const editUser = () => {

        if ((imageUri !== currentUser.photoURL) && (imageUri !== null)) {
            setIsLoading(true);
            new StorageService().uploadAndGetUrl(imageName, imageUri).then((photoURL) => {
                return authService.editUser({ firstname, lastname, photoURL })
                    .then(() => setIsLoading(false))
                    .then(() => navigation.goBack());
            });
        } else if (imageUri == currentUser.photoURL) {
            setIsLoading(true);
            return authService.editUser({ firstname, lastname })
                .then(() => setIsLoading(false))
                .then(() => navigation.goBack());
        } else {
            setIsLoading(true);
            return authService.editUser({ firstname, lastname, photoURL: '' })
                .then(() => setIsLoading(false))
                .then(() => navigation.goBack());
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
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} modalTitle={modalTitle} modalContent={modalContent()} />
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
            {isLoading === true ?
                <Preloader />
                : null
            }
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