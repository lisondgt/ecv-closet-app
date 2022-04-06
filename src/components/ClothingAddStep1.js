import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import ModalComponent from './ModalComponent';
import ImageLibrary from './ImageLibrary.js';
import CameraLaunch from './CameraLaunch.js';

import styles from '../../assets/styles/style.js';

import PencilWhite from '../../assets/images/pencil-alt-white.svg';

export default function ClothingAddStep1({ values, selectHandler, nextStep }) {

    const [imageUri, setImageUri] = useState(values.imageUri);
    const [imageName, setImageName] = useState(values.imageName);
    const [modalVisible, setModalVisible] = useState(false);
    const modalTitle = imageUri !== "" ? (
        'Modifier la photo'
    ) : (
        'Ajouter une photo'
    );

    const modalContent = () => {
        return (
            <View>
                <View style={styles.MarginBottom10}>
                    <CameraLaunch onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
                </View>
                <View style={styles.MarginBottom10}>
                    <ImageLibrary onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
                </View>
            </View>
        );
    };

    const saveImage = () => {
        selectHandler(imageName, 'imageName');
        selectHandler(imageUri, 'imageUri');
        nextStep();
    };

    return (
        <View>
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} modalTitle={modalTitle} modalContent={modalContent()} />
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