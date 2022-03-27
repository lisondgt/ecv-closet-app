import React from 'react';
import { View } from 'react-native';

import styles from '../../assets/styles/style.js';

import StarFilledOrange from './../../assets/images/star-filled-orange.svg';
import StarOutlineOrange from './../../assets/images/star-outline-orange.svg';


export default function RatingStars({ maxRating, RateValue }) {

    return (
        <View style={styles.ContainerRating}>
            {maxRating.map((item) => {
                return (
                    <View
                        style={styles.RatingStars}
                        key={item.value}>
                        {item.value <= RateValue
                            ? <StarFilledOrange width={20} height={20} />
                            : <StarOutlineOrange width={20} height={20} />
                        }
                    </View>
                );
            })}
        </View>
    );
};