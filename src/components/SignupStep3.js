import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import styles from '../../assets/styles/style.js';

import CameraGrey from '../../assets/images/camera-grey.svg';
import CameraWhite from '../../assets/images/camera-white.svg';
import ImageWhite from '../../assets/images/image-white.svg';
import TimesDark from '../../assets/images/times-dark.svg';

export default function SignupStep3({ imageUri, setImageUri, imageName, setImageName, nextStep }) {

    const [modalVisible, setModalVisible] = useState(false);

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
    }

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
        setImageUri('');
        setImageName('');
    }

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
                            {imageUri !== "" ? (
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
                        {imageUri !== "" ? (
                            <TouchableOpacity
                                style={styles.contentCenter}
                                onPress={deleteImage}
                            >
                                <Text style={styles.CancelText}>Supprimer</Text>
                            </TouchableOpacity>) : (null)}
                    </View>
                </View>
            </Modal>
            <View style={styles.MarginBottom40}>
                <Text style={styles.H2TitleCenter}>Voudrais tu ajouter une photo de profile ?</Text>
            </View>
            <View style={styles.contentCenter}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                    {imageUri !== "" ? (
                        <View>
                            <View style={styles.MarginBottom10}>
                                <Image
                                    source={{ uri: imageUri }}
                                    style={componentStyles.Image}
                                />
                            </View>
                            <Text style={styles.CancelTextCenter}>Modifier</Text>
                        </View>
                    ) : (
                        <View
                            style={componentStyles.buttonCamera}>
                            <CameraGrey width={50} height={50} />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.ContainerPrimaryButtonBottom}>
                {imageUri !== "" ? (
                    <TouchableOpacity
                        style={styles.PrimaryButton}
                        onPress={nextStep}>
                        <Text style={styles.PrimaryButtonText}>Suivant</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.contentCenter}
                        onPress={nextStep}>
                        <Text style={styles.CancelText}>Passer</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const componentStyles = StyleSheet.create({
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