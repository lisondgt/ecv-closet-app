import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ClothingDao } from '../../dao/ClothingDao';
import { StorageService } from '../../services/StorageService';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import CameraWhite from './../../../assets/images/camera-white.svg';
import ImageWhite from './../../../assets/images/image-white.svg';
import PencilWhite from './../../../assets/images/pencil-alt-white.svg';
import TimesDark from './../../../assets/images/times-dark.svg';

const ClothingUpdateImage = ({ route, navigation }) => {

    const { key, ItemValue } = route.params;
    const [imageUri, setImageUri] = useState(ItemValue);
    const [imageName, setImageName] = useState("");
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

    async function updateItem() {
        if (imageUri !== ItemValue) {
            new StorageService().uploadAndGetUrl(imageName, imageUri).then((url) => {
                const clothingDao = new ClothingDao();
                clothingDao.update(key, {
                    image: url,
                }).then(() => navigation.goBack());
            });
        } else {
            navigation.goBack();
        }
    }

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
                        <View style={styles.MarginBottom10}>
                            <TouchableOpacity
                                onPress={selectImage}
                                style={styles.PrimaryButtonIcon}>
                                <ImageWhite style={styles.PrimaryButtonIconIcon} />
                                <Text style={styles.PrimaryButtonIconText}>Galerie de photos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Text style={styles.H2Title}>Modifier l'image</Text>
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
                    onPress={() => updateItem()}
                    style={styles.PrimaryButton}>
                    <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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

export default ClothingUpdateImage;