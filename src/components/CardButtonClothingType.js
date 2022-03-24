import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from '../../assets/styles/style.js';

import ShirtGrey from '../../assets/images/shirt-grey-3.svg';
import ShirtOrange from '../../assets/images/shirt-orange.svg';
import TrousersGrey from '../../assets/images/trousers-grey-3.svg';
import TrousersOrange from '../../assets/images/trousers-orange.svg';
import DressGrey from '../../assets/images/dress-grey-3.svg';
import DressOrange from '../../assets/images/dress-orange.svg';
import SkirtGrey from '../../assets/images/skirt-grey-3.svg';
import SkirtOrange from '../../assets/images/skirt-orange.svg';
import JacketGrey from '../../assets/images/jacket-grey-3.svg';
import JacketOrange from '../../assets/images/jacket-orange.svg';
import ShoeGrey from '../../assets/images/shoe-grey-3.svg';
import ShoeOrange from '../../assets/images/shoe-orange.svg';
import RingGrey from '../../assets/images/ring-grey-3.svg';
import RingOrange from '../../assets/images/ring-orange.svg';

export default function CardButtonClothingType({ onSelect, ItemValue }) {

    const data = [
        {
            value: 'Hauts',
            imageDefault: <ShirtGrey width={100} height={100} />,
            imageSelected: <ShirtOrange width={100} height={100} />
        },
        {
            value: 'Pantalons',
            imageDefault: <TrousersGrey width={100} height={100} />,
            imageSelected: <TrousersOrange width={100} height={100} />
        },
        {
            value: 'Robes',
            imageDefault: <DressGrey width={100} height={100} />,
            imageSelected: <DressOrange width={100} height={100} />
        },
        {
            value: 'Jupes',
            imageDefault: <SkirtGrey width={100} height={100} />,
            imageSelected: <SkirtOrange width={100} height={100} />
        },
        {
            value: 'Vestes / Manteaux',
            imageDefault: <JacketGrey width={100} height={100} />,
            imageSelected: <JacketOrange width={100} height={100} />
        },
        {
            value: 'Chaussures',
            imageDefault: <ShoeGrey width={100} height={100} />,
            imageSelected: <ShoeOrange width={100} height={100} />
        },
        {
            value: 'Accessoires',
            imageDefault: <RingGrey width={100} height={100} />,
            imageSelected: <RingOrange width={100} height={100} />
        },
    ];

    const [defaultRadio, setDefaultRadio] = useState(ItemValue);

    const selectHandler = (value) => {
        onSelect(value);
        setDefaultRadio(value);
    };

    return (
        <View style={styles.ContainerCardButton}>
            {data.map((item) => {
                return (
                    <View key={item.value} style={styles.ColCardButton}>
                        <View style={styles.MarginCardButton}>
                            <TouchableOpacity
                                onPress={() => selectHandler(item.value)}>
                                <View style={
                                    item.value === defaultRadio ? styles.CardButtonImageSelected : styles.CardButtonImageUnselected
                                }>
                                    {item.value === defaultRadio ? item.imageSelected : item.imageDefault}
                                </View>
                                <View style={styles.ContainerTextCardButton}>
                                    <Text style={styles.H3Title}>{item.value}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </View>

    );
}