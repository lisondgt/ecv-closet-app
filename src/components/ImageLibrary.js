import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import styles from '../../assets/styles/style.js';

import ImageWhite from '../../assets/images/image-white.svg';

export default function ImageLibrary({ onSelect }) {

    const selectImage = () => {
        const options = {
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5,
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
            } else {
                const imageUri = response.assets.map(item => item.uri).toString();
                const imageName = response.assets.map(item => item.fileName).toString();
                onSelect(imageUri, imageName);
            }
        });
    };

    return (
        <TouchableOpacity
            onPress={selectImage}
            style={styles.PrimaryButtonIcon}>
            <ImageWhite style={styles.PrimaryButtonIconIcon} />
            <Text style={styles.PrimaryButtonIconText}>Galerie de photos</Text>
        </TouchableOpacity>
    );
}