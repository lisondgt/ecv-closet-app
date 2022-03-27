import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import styles from '../../assets/styles/style.js';

import StarFilledOrange from './../../assets/images/star-filled-orange.svg';
import StarOutlineOrange from './../../assets/images/star-outline-orange.svg';


export default function RatingStarsButton({ maxRating, onSelect, ItemValue }) {

    const [defaultRating, setDefaultRating] = useState(ItemValue);

    const selectHandler = (item) => {
        if (defaultRating != item) {
            onSelect(item);
            setDefaultRating(item);
        } else {
            onSelect('');
            setDefaultRating('');
        }
    };

    return (
        <View style={styles.ContainerRatingButton}>
            {maxRating.map((item) => {
                return (
                    <TouchableOpacity
                        style={styles.RatingButton}
                        activeOpacity={0.7}
                        key={item.value}
                        onPress={() => selectHandler(item.value)}>
                        {item.value <= defaultRating
                            ? <StarFilledOrange width={40} height={40} />
                            : <StarOutlineOrange width={40} height={40} />
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};