import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RatingStarsButton from '../../components/RatingStarsButton';

import { ClothingDao } from '../../dao/ClothingDao';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';

const ClothingUpdateRate = ({ route, navigation }) => {

    const data = [
        {
            value: 1
        },
        {
            value: 2
        },
        {
            value: 3
        },
        {
            value: 4
        },
        {
            value: 5
        },
    ];

    const { key, ItemValue } = route.params;
    const maxRating = data;
    const [option, setOption] = useState(ItemValue);

    function updateItem() {
        const clothingDao = new ClothingDao();
        clothingDao.update(key, {
            rate: option,
        }).then(() => navigation.goBack());
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
            <Text style={styles.H2Title}>Modifier la note</Text>
            <RatingStarsButton maxRating={maxRating} ItemValue={ItemValue} onSelect={(value) => setOption(value)} />
            <View style={styles.ContainerPrimaryButtonBottom}>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={() => updateItem()}>
                    <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default ClothingUpdateRate;