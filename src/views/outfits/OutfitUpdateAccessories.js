import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { ClothingDao } from '../../dao/ClothingDao';
import { OutfitDao } from '../../dao/OutfitDao';
import { AuthService } from '../../services/AuthService';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import CheckOrange from '../../../assets/images/check-circle-orange.svg';

export default function OutfitUpdateAccessories({ route, navigation }) {

    const { key, values } = route.params;
    const currentUserId = new AuthService().getUser().uid;
    const isFocused = useIsFocused();
    const [clothingAccessories, setClothingAccessories] = useState([]);
    const [accessories, setAccessories] = useState(values);

    useEffect(() => {

        if (isFocused) {
            const clothingDao = new ClothingDao();
            clothingDao.fetchAllByType('Accessoires', currentUserId).then(setClothingAccessories);
        }

    }, [isFocused]);

    const selectItem = (item) => {
        if (accessories.length < 4 & !accessories.includes(item.image)) {
            setAccessories([
                ...accessories,
                item.image
            ]);
        } else if (accessories.includes(item.image)) {
            var array = [...accessories];
            var index = array.indexOf(item.image);
            array.splice(index, 1);
            setAccessories(array);
        }
    };

    async function updateItem() {
        const outfitDao = new OutfitDao();
        outfitDao.update(key, {
            accessories: accessories,
        }).then(() => navigation.goBack());
    }

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
                                    accessories.includes(item.image) ? fileStyle.CardAccessoriesImgSelected : fileStyle.CardAccessoriesImg
                                }
                            />
                            {
                                accessories.includes(item.image) ?
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
            <Text style={styles.H3Title}>Modifier les accessoires</Text>
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
                    onPress={() => updateItem()}>
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
        right: 15,
        width: '100%',
    }
});