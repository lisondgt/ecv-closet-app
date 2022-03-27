import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function Preloader() {

    return (
        <View style={ComponentStyles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
        </View>

    );
}

const ComponentStyles = StyleSheet.create({
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(240, 241, 241, 0.5)'
    }
});