import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import styles from '../../assets/styles/style.js';

import CameraWhite from '../../assets/images/camera-white.svg';

export default function CameraLaunch({ onSelect }) {

    const cameraLaunch = () => {
        const options = {
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5,
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
                const imageUri = response.assets.map(item => item.uri).toString();
                const imageName = response.assets.map(item => item.fileName).toString();
                onSelect(imageUri, imageName);
            }
        });
    };

    return (
        <TouchableOpacity
            onPress={cameraLaunch}
            style={styles.PrimaryButtonIcon}>
            <CameraWhite style={styles.PrimaryButtonIconIcon} />
            <Text style={styles.PrimaryButtonIconText}>Caméra</Text>
        </TouchableOpacity>
    );
}