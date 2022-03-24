import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../../assets/styles/style.js';

export default function RadioButtonClothingSeason({ onSelect, ItemValue }) {

    const data = [
        {
            title: '☀️ Été',
            value: 'Été'
        },
        {
            title: '❄️ Hiver',
            value: 'Hiver'
        },
        {
            title: '⛅️ Printemps',
            value: 'Printemps'
        },
        {
            title: '🌧 Automne',
            value: 'Automne'
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
                        }>{item.title}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}