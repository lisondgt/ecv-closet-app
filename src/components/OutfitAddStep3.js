import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { ClothingDao } from '../dao/ClothingDao';
import { AuthService } from '../services/AuthService';

import styles from '../../assets/styles/style.js';
import CheckOrange from '../../assets/images/check-circle-orange.svg';

export default function OutfitAddStep3({ values, setValues, prevStep }) {

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
        if (values.accessoriesImage.length < 4 & !values.accessoriesImage.includes(item.imageUrl)) {
            setValues({
                ...values,
                "accessoriesImage": [...values.accessoriesImage, item.imageUrl],
                "accessoriesKey": [...values.accessoriesKey, item.key],
            });
        } else if (values.accessoriesImage.includes(item.imageUrl)) {
            var arrayImage = [...values.accessoriesImage];
            var indexImage = arrayImage.indexOf(item.imageUrl);
            arrayImage.splice(indexImage, 1);
            var arrayKey = [...values.accessoriesKey];
            var indexKey = arrayKey.indexOf(item.key);
            arrayKey.splice(indexKey, 1);
            setValues({
                ...values,
                "accessoriesImage": arrayImage,
                "accessoriesKey": arrayKey,
            });
        }
    };

    renderEmptyContainer = () => {
        return (
            <View style={fileStyle.AccessoriesMargin}>
                <Text style={styles.Text}>Vous avez aucun accessoire</Text>
            </View>
        );
    };

    renderListItem = ({ item }) => {
        return (
            <View style={fileStyle.AccessoriesCol}>
                <View style={fileStyle.AccessoriesMargin}>
                    <TouchableOpacity
                        onPress={() => selectItem(item)}>
                        <View style={fileStyle.AccessoriesCard}>
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={
                                    values.accessoriesImage.includes(item.imageUrl) ? fileStyle.CardAccessoriesImgSelected : fileStyle.CardAccessoriesImg
                                }
                            />
                            {
                                values.accessoriesImage.includes(item.imageUrl) ?
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
                    ListEmptyComponent={this.renderEmptyContainer}
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