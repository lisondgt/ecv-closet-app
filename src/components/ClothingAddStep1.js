import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Modal } from 'react-native';
import ImageLibrary from './ImageLibrary.js';
import CameraLaunch from './CameraLaunch.js';

import styles from '../../assets/styles/style.js';

import CameraWhite from '../../assets/images/camera-white.svg';
import PencilWhite from '../../assets/images/pencil-alt-white.svg';
import TimesDark from '../../assets/images/times-dark.svg';

export default function ClothingAddStep1({ values, selectHandler, nextStep }) {

    const [imageUri, setImageUri] = useState(values.imageUri);
    const [imageName, setImageName] = useState(values.imageName);
    const [modalVisible, setModalVisible] = useState(false);

    const saveImage = () => {
        selectHandler(imageName, 'imageName');
        selectHandler(imageUri, 'imageUri');
        nextStep();
    };

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
                            <CameraLaunch onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
                        </View>
                        <View style={styles.MarginBottom10}>
                            <ImageLibrary onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
                        </View>
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
                        <CameraLaunch onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
                    </View>
                    <ImageLibrary onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
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