import React from 'react';
import { Text, View } from 'react-native';
import CardButtonClothingType from './CardButtonClothingType';

import styles from '../../assets/styles/style.js';

export default function ClothingAddStep2({ values, selectHandler, nextStep }) {

    return (
        <View style={styles.MarginBottom60}>
            <Text style={styles.H1Title}>Choisis le type de vêtement</Text>
            <CardButtonClothingType ItemValue={values.type} onSelect={(value) => { selectHandler(value, 'type'); nextStep(); }} />
        </View>
    );
}