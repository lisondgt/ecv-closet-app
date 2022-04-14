import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { ClothingDao } from '../dao/ClothingDao';
import { AuthService } from '../services/AuthService';

import styles from '../../assets/styles/style.js';
import CheckOrange from '../../assets/images/check-circle-orange.svg';

export default function OutfitAddStep3({ values, selectHandler, prevStep }) {

    const currentUserId = new AuthService().getUser().uid;
    const isFocused = useIsFocused();
    const [clothingAccessories, setClothingAccessories] = useState([]);

    useEffect(() => {

        if (isFocused) {
            const clothingDao = new ClothingDao();
            clothingDao.fetchAllByType('Accessoires', currentUserId).then(setClothingAccessories);
        }

    }, [isFocused]);

    const selectItem = (item) => {
        if (values.accessories.length < 4) {
            selectHandler([...values.accessories, item.image], "accessories");
        }
    };

    renderListItem = ({ item }) => {
        return (
            <View style={fileStyle.AccessoriesCol}>
                <View style={fileStyle.AccessoriesMargin}>
                    <TouchableOpacity
                        onPress={() => selectItem(item)}>
                        <View style={fileStyle.AccessoriesCard}>
                            <Image
                                source={{ uri: item.image }}
                                style={
                                    values.accessories.includes(item.image) ? fileStyle.CardAccessoriesImgSelected : fileStyle.CardAccessoriesImg
                                }
                            />
                            {
                                values.accessories.includes(item.image) ?
                                    <View style={fileStyle.CardAccessoriesCheck}>
                                        <CheckOrange width={15} height={15} />
                                    </View>
                                    : null
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    keyExtractor = (item) => {
        return item.key;
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.H3Title}>Ajouter des accessoires</Text>
            <View style={fileStyle.AccessoriesView}>
                <FlatList
                    data={clothingAccessories}
                    numColumns={4}
                    renderItem={this.renderListItem}
                    keyExtractor={this.keyExtractor}
                    scrollEnabled={false}
                    style={fileStyle.AccessoriesList}
                    columnWrapperStyle={fileStyle.AccessoriesRow}
                />
            </View>
            <View style={fileStyle.ContainerPrimaryButtonBottom}>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={prevStep}>
                    <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const fileStyle = StyleSheet.create({
    AccessoriesView: {
        marginBottom: 15
    },
    AccessoriesList: {
        margin: -7,
    },
    AccessoriesRow: {
        justifyContent: 'flex-start'
    },
    AccessoriesCol: {
        flex: 1 / 4
    },
    AccessoriesMargin: {
        margin: 7,
    },
    AccessoriesCard: {
        width: '100%',
        aspectRatio: 1
    },
    CardAccessoriesImg: {
        width: '100%',
        height: '100%',
    },
    CardAccessoriesImgSelected: {
        width: '100%',
        height: '100%',
        opacity: 0.8
    },
    CardAccessoriesCheck: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContainerPrimaryButtonBottom: {
        position: 'absolute',
        bottom: 60,
        right: 0,
        width: '100%',
    }
});