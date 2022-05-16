import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { ClothingDao } from '../dao/ClothingDao';
import { AuthService } from '../services/AuthService';

import ShirtGrey from '../../assets/images/shirt-grey-3.svg';
import ShirtOrange from '../../assets/images/shirt-orange.svg';
import TrousersGrey from '../../assets/images/trousers-grey-3.svg';
import TrousersOrange from '../../assets/images/trousers-orange.svg';
import JacketGrey from '../../assets/images/jacket-grey-3.svg';
import JacketOrange from '../../assets/images/jacket-orange.svg';
import ShoeGrey from '../../assets/images/shoe-grey-3.svg';
import ShoeOrange from '../../assets/images/shoe-orange.svg';
import CheckOrange from '../../assets/images/check-circle-orange.svg';

import styles from '../../assets/styles/style.js';

export default function OutfitAddStep1({ values, setValues, nextStep }) {

    const currentUserId = new AuthService().getUser().uid;
    const isFocused = useIsFocused();
    const [dataFlatlist, setDataFlatList] = useState([]);
    const [clothingTops, setClothingTops] = useState([]);
    const [clothingBottoms, setClothingBottoms] = useState([]);
    const [clothingLayers, setClothingLayers] = useState([]);
    const [clothingShoes, setClothingShoes] = useState([]);
    const [defaultRadio, setDefaultRadio] = useState('');

    useEffect(() => {

        if (isFocused) {
            const clothingDao = new ClothingDao();

            clothingDao.fetchAllByType('Hauts', currentUserId).then(setClothingTops);
            clothingDao.fetchAllBottoms(currentUserId).then(setClothingBottoms);
            clothingDao.fetchAllByType('Vestes / Manteaux', currentUserId).then(setClothingLayers);
            clothingDao.fetchAllByType('Chaussures', currentUserId).then(setClothingShoes);
        }

    }, [isFocused]);

    const data = [
        {
            value: 'Hauts',
            firebaseName: 'top',
            daoValue: clothingTops,
            imageDefault: <ShirtGrey width={50} height={50} />,
            imageSelected: <ShirtOrange width={50} height={50} />,
        },
        {
            value: 'Pantalons',
            firebaseName: 'bottom',
            daoValue: clothingBottoms,
            imageDefault: <TrousersGrey width={50} height={50} />,
            imageSelected: <TrousersOrange width={50} height={50} />,
        },
        {
            value: 'Vestes / Manteaux',
            firebaseName: 'layer',
            daoValue: clothingLayers,
            imageDefault: <JacketGrey width={50} height={50} />,
            imageSelected: <JacketOrange width={50} height={50} />,
        },
        {
            value: 'Chaussures',
            firebaseName: 'shoes',
            daoValue: clothingShoes,
            imageDefault: <ShoeGrey width={50} height={50} />,
            imageSelected: <ShoeOrange width={50} height={50} />,
        }
    ];

    const selectCategory = (item) => {
        setDefaultRadio(item.firebaseName);
        setDataFlatList(item.daoValue);
    };

    const selectItem = (item) => {
        if (values[defaultRadio + "Image"] != item.imageUrl && values[defaultRadio + "Key"] != item.key) {
            setValues({
                ...values,
                [defaultRadio + "Image"]: item.imageUrl,
                [defaultRadio + "Key"]: item.key
            });
        } else {
            setValues({
                ...values,
                [defaultRadio + "Image"]: "",
                [defaultRadio + "Key"]: ""
            });
        }
    };

    renderEmptyContainer = () => {
        return (
            <View style={fileStyle.ClothingMargin}>
                <Text style={styles.Text}>Vous n'avez aucun article dans cette catégorie</Text>
            </View>
        );
    };

    renderListItem = ({ item }) => {
        return (
            <View style={fileStyle.ClothingCol}>
                <View style={fileStyle.ClothingMargin}>
                    <TouchableOpacity
                        onPress={() => selectItem(item)}>
                        <View style={fileStyle.ClothingCard}>
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={
                                    item.imageUrl === values[defaultRadio + "Image"] ? fileStyle.CardClothingImgSelected : fileStyle.CardClothingImg
                                }
                            />
                            {
                                item.imageUrl === values[defaultRadio + "Image"] ?
                                    <View style={fileStyle.CardClothingCheck}>
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
            <Text style={styles.H1Title}>Créer une tenue</Text>
            <View>
                <View style={fileStyle.ContainerCardButton}>
                    {data.map((item) => {
                        return (
                            <View key={item.firebaseName} style={fileStyle.CardButtonCol}>
                                <View style={fileStyle.CardButtonMargin}>
                                    <TouchableOpacity
                                        onPress={() => selectCategory(item)}>
                                        <View style={
                                            item.firebaseName === defaultRadio ? fileStyle.CardButtonImageSelected : fileStyle.CardButtonImageUnselected
                                        }>

                                            {values[item.firebaseName + "Image"] ?
                                                <Image
                                                    source={{ uri: values[item.firebaseName + "Image"] }}
                                                    style={fileStyle.CardButtonImageItem}
                                                />
                                                : item.firebaseName === defaultRadio ? item.imageSelected : item.imageDefault
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View style={fileStyle.ClothingView}>
                    <FlatList
                        data={dataFlatlist}
                        numColumns={4}
                        renderItem={this.renderListItem}
                        ListEmptyComponent={this.renderEmptyContainer}
                        keyExtractor={this.keyExtractor}
                        scrollEnabled={false}
                        style={fileStyle.ClothingList}
                        columnWrapperStyle={fileStyle.ClothingRow}
                    />
                </View>
            </View>
            {values.topKey || values.bottomKey || values.layerKey || values.shoesKey ?
                <View style={fileStyle.ContainerPrimaryButtonBottom}>
                    <TouchableOpacity
                        style={styles.PrimaryButton}
                        onPress={nextStep}>
                        <Text style={styles.PrimaryButtonText}>Suivant</Text>
                    </TouchableOpacity>
                </View>
                : null
            }
        </View>
    );
}

const fileStyle = StyleSheet.create({
    ContainerCardButton: {
        flexDirection: 'row',
        marginHorizontal: -5,
        paddingBottom: 30
    },
    CardButtonCol: {
        flex: 1 / 4
    },
    CardButtonMargin: {
        marginHorizontal: 5
    },
    CardButtonImageSelected: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#DD6E42',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CardButtonImageUnselected: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CardButtonImageItem: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    CardClothingCheck: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ClothingView: {
        marginBottom: 15
    },
    ClothingList: {
        margin: -7,
    },
    ClothingRow: {
        justifyContent: 'flex-start'
    },
    ClothingCol: {
        flex: 1 / 4
    },
    ClothingMargin: {
        margin: 7,
    },
    ClothingCard: {
        width: '100%',
        aspectRatio: 1
    },
    CardClothingImg: {
        width: '100%',
        height: '100%',
    },
    CardClothingImgSelected: {
        width: '100%',
        height: '100%',
        opacity: 0.8
    },
    ContainerPrimaryButtonBottom: {
        position: 'absolute',
        bottom: 60,
        right: 0,
        width: '100%',
    }
});