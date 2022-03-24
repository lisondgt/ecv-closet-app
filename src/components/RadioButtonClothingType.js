import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from '../../assets/styles/style.js';

export default function RadioButtonClothingType({ onSelect, ItemValue }) {

    const data = [
        {
            value: 'Hauts'
        },
        {
            value: 'Pantalons'
        },
        {
            value: 'Robes'
        },
        {
            value: 'Jupes'
        },
        {
            value: 'Marron'
        },
        {
            value: 'Vestes / Manteaux'
        },
        {
            value: 'Chaussures'
        },
        {
            value: 'Accessoires'
        },
    ];

    const [defaultRadio, setDefaultRadio] = useState(ItemValue);

    const selectHandler = (value) => {
        if (defaultRadio != value) {
            onSelect(value);
            setDefaultRadio(value);
        } else {
            onSelect('');
            setDefaultRadio('');
        }
    };

    return (
        <View style={styles.ContainerRadioButton}>
            {data.map((item) => {
                return (
                    <TouchableOpacity
                        style={
                            item.value === defaultRadio ? styles.RadioButtonSelected : styles.RadioButtonUnselected
                        }
                        key={item.value}
                        onPress={() => selectHandler(item.value)}>
                        <Text style={
                            item.value === defaultRadio ? styles.RadioTextSelected : styles.RadioTextUnselected
                        }>{item.value}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>

    );
}