import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RadioButtonClothingColor from '../components/RadioButtonClothingColor';
import RadioButtonClothingSeason from '../components/RadioButtonClothingSeason';
import RadioButtonClothingSize from '../components/RadioButtonClothingSize';
import RadioButtonClothingStatus from '../components/RadioButtonClothingStatus';
import RadioButtonClothingFit from '../components/RadioButtonClothingFit';
import RatingStarsButton from '../components/RatingStarsButton';

import styles from '../../assets/styles/style.js';

export default function ClothingAddStep3({ values, selectHandler }) {

    const RatingData = [
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

    const maxRating = RatingData;

    return (
        <View>
            <Text style={styles.H1Title}>Choisis les options</Text>
            <Image
                source={{ uri: values.imageUri }}
                style={viewStyles.Image}
            />
            <View style={viewStyles.marginBottom}>
                <Text style={styles.H3Title}>Couleur principale</Text>
                <RadioButtonClothingColor ItemValue={values.color} onSelect={(value) => { selectHandler(value, 'color'); }} />
            </View>
            <View style={viewStyles.marginBottom}>
                <Text style={styles.H3Title}>Saison</Text>
                <RadioButtonClothingSeason ItemValue={values.season} onSelect={(value) => { selectHandler(value, 'season'); }} />
            </View>
            <View style={viewStyles.marginBottom}>
                <Text style={styles.H3Title}>Taille</Text>
                <RadioButtonClothingSize ItemValue={values.size} onSelect={(value) => { selectHandler(value, 'size'); }} />
            </View>
            <View style={viewStyles.marginBottom}>
                <Text style={styles.H3Title}>Statut</Text>
                <RadioButtonClothingStatus ItemValue={values.status} onSelect={(value) => { selectHandler(value, 'status'); }} />
            </View>
            <View style={viewStyles.marginBottom}>
                <Text style={styles.H3Title}>État</Text>
                <RadioButtonClothingFit ItemValue={values.fit} onSelect={(value) => { selectHandler(value, 'fit'); }} />
            </View>
            <View>
                <Text style={styles.H3Title}>Note</Text>
                <RatingStarsButton ItemValue={values.rate} maxRating={maxRating} onSelect={(value) => { selectHandler(value, 'rate'); }} />
            </View>
        </View>
    );
}

const viewStyles = StyleSheet.create({
    Image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20
    },
    marginBottom: {
        marginBottom: 20
    }
});