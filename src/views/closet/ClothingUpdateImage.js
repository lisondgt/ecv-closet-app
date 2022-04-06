import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ModalComponent from '../../components/ModalComponent';
import ImageLibrary from '../../components/ImageLibrary';
import CameraLaunch from '../../components/CameraLaunch';
import { ClothingDao } from '../../dao/ClothingDao';
import { StorageService } from '../../services/StorageService';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import PencilWhite from './../../../assets/images/pencil-alt-white.svg';

const ClothingUpdateImage = ({ route, navigation }) => {

    const { key, ItemValue } = route.params;
    const [imageUri, setImageUri] = useState(ItemValue);
    const [imageName, setImageName] = useState("");
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
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} modalTitle={modalTitle} modalContent={modalContent()} />
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