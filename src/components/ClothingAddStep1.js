import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Modal } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import styles from '../../assets/styles/style.js';

import CameraWhite from '../../assets/images/camera-white.svg';
import ImageWhite from '../../assets/images/image-white.svg';
import PencilWhite from '../../assets/images/pencil-alt-white.svg';

export default function ClothingAddStep1({ values, selectHandler, nextStep }) {

    const [imageUri, setImageUri] = useState(values.imageUri);
    const [imageName, setImageName] = useState(values.imageName);
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

    const saveImage = () => {
        selectHandler(imageName, 'imageName');
        selectHandler(imageUri, 'imageUri');
        nextStep();
    }

    return (
        <View>
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
                        <View style={styles.textCenter}>
                            <Text style={styles.H3Title}>Modifier la photo</Text>
                        </View>
                        <View style={styles.MarginBottom10}>
                            <TouchableOpacity
                                onPress={cameraLaunch}
                                style={styles.PrimaryButtonIcon}>
                                <CameraWhite style={styles.PrimaryButtonIconIcon} />
                                <Text style={styles.PrimaryButtonIconText}>Caméra</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.MarginBottom10}>
                            <TouchableOpacity
                                onPress={selectImage}
                                style={styles.PrimaryButtonIcon}>
                                <ImageWhite style={styles.PrimaryButtonIconIcon} />
                                <Text style={styles.PrimaryButtonIconText}>Galerie de photos</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.textCenter}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.CancelText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {imageUri !== "" ? (
                <View>
                    <View style={componentStyles.ContainerImage}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}>
                            <View style={componentStyles.ColImage}>
                                <View style={componentStyles.ContentImage}>
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={componentStyles.Image}
                                    />
                                </View>

                                <View
                                    style={componentStyles.EditIconContainer}>
                                    <View style={componentStyles.EditIcon}>
                                        <PencilWhite width={8} height={8} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => saveImage()}
                        style={styles.PrimaryButton}>
                        <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <View style={styles.MarginBottom10}>
                        <TouchableOpacity
                            onPress={cameraLaunch}
                            style={styles.PrimaryButtonIcon}>
                            <CameraWhite style={styles.PrimaryButtonIconIcon} />
                            <Text style={styles.PrimaryButtonIconText}>Caméra</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={selectImage}
                        style={styles.PrimaryButtonIcon}>
                        <ImageWhite style={styles.PrimaryButtonIconIcon} />
                        <Text style={styles.PrimaryButtonIconText}>Galerie de photos</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const componentStyles = StyleSheet.create({
    ContainerImage: {
        alignItems: 'center',
        marginBottom: 20,
    },
    ColImage: {
        width: '70%'
    },
    ContentImage: {
        width: '100%',
        aspectRatio: 1
    },
    Image: {
        width: '100%',
        height: '100%'
    },
    EditIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    EditIcon: {
        backgroundColor: '#808F9D',
        borderRadius: 20,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});