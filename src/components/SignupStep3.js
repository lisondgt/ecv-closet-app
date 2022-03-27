import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import ImageLibrary from './ImageLibrary.js';
import CameraLaunch from './CameraLaunch.js';

import styles from '../../assets/styles/style.js';

import CameraGrey from '../../assets/images/camera-grey.svg';
import TimesDark from '../../assets/images/times-dark.svg';

export default function SignupStep3({ imageUri, setImageUri, setImageName, nextStep }) {

    const [modalVisible, setModalVisible] = useState(false);

    const deleteImage = () => {
        setModalVisible(false);
        setImageUri(null);
        setImageName('');
    };

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