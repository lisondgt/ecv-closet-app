import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ModalComponent from './ModalComponent';
import ImageLibrary from './ImageLibrary.js';
import CameraLaunch from './CameraLaunch.js';

import styles from '../../assets/styles/style.js';

import CameraGrey from '../../assets/images/camera-grey.svg';

export default function SignupStep3({ imageUri, setImageUri, setImageName, nextStep }) {

    const [modalVisible, setModalVisible] = useState(false);
    const modalTitle = imageUri !== null ? (
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
                <View style={styles.MarginBottom20}>
                    <ImageLibrary onSelect={(imageUri, imageName) => { setModalVisible(false), setImageUri(imageUri), setImageName(imageName); }} />
                </View>
                {imageUri !== "" ? (
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

    return (
        <View style={styles.ContainerView}>
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} modalTitle={modalTitle} modalContent={modalContent()} />
            <View style={styles.MarginBottom40}>
                <Text style={styles.H2TitleCenter}>Voudrais tu ajouter une photo de profile ?</Text>
            </View>
            <View style={styles.contentCenter}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                    {imageUri !== null ? (
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
                {imageUri !== null ? (
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