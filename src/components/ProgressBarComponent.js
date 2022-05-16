import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function ProgressBarComponent({ progress }) {

    return (
        <ProgressBar progress={progress} color={'#DD6E42'} style={ComponentStyles.ProgressBar} />
    );
}

const ComponentStyles = StyleSheet.create({
    ProgressBar: {
        borderColor: '#DD6E42',
        borderWidth: 1,
        backgroundColor: '#F0F1F1',
        height: 10,
        borderRadius: 10
    }
});