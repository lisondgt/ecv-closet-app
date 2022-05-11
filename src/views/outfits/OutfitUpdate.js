import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { ClothingDao } from '../../dao/ClothingDao';
import { OutfitDao } from '../../dao/OutfitDao';
import { AuthService } from '../../services/AuthService';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import ShirtGrey from './../../../assets/images/shirt-grey-3.svg';
import ShirtOrange from './../../../assets/images/shirt-orange.svg';
import TrousersGrey from './../../../assets/images/trousers-grey-3.svg';
import TrousersOrange from './../../../assets/images/trousers-orange.svg';
import JacketGrey from './../../../assets/images/jacket-grey-3.svg';
import JacketOrange from './../../../assets/images/jacket-orange.svg';
import ShoeGrey from './../../../assets/images/shoe-grey-3.svg';
import ShoeOrange from './../../../assets/images/shoe-orange.svg';
import CheckOrange from './../../../assets/images/check-circle-orange.svg';

const OutfitUpdate = ({ route, navigation }) => {

    const { key, values } = route.params;
    const currentUserId = new AuthService().getUser().uid;
    const isFocused = useIsFocused();
    const [dataFlatlist, setDataFlatList] = useState([]);
    const [clothingTops, setClothingTops] = useState([]);
    const [clothingBottoms, setClothingBottoms] = useState([]);
    const [clothingLayers, setClothingLayers] = useState([]);
    const [clothingShoes, setClothingShoes] = useState([]);
    const [defaultRadio, setDefaultRadio] = useState('');
    const [options, setOptions] = useState({
        topImage: values.topImage,
        topKey: values.topKey,
        bottomImage: values.bottomImage,
        bottomKey: values.bottomKey,
        layerImage: values.layerImage,
        layerKey: values.layerKey,
        shoesImage: values.shoesImage,
        shoesKey: values.shoesKey
    });

    useEffect(() => {

        if (isFocused) {
            const clothingDao = new ClothingDao();

            clothingDao.fetchAllByType('Hauts', currentUserId).then(setClothingTops, setDataFlatList);
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
        if (options[defaultRadio + "Image"] != item.image && options[defaultRadio + "Key"] != item.key) {
            setOptions({
                ...options,
                [defaultRadio + "Image"]: item.image,
                [defaultRadio + "Key"]: item.key
            });
        } else {
            setOptions({
                ...options,
                [defaultRadio + "Image"]: "",
                [defaultRadio + "Key"]: ""
            });
        }
    };

    async function updateItem() {
        const outfitDao = new OutfitDao();
        outfitDao.update(key, {
            topKey: options.topKey,
            bottomKey: options.bottomKey,
            layerKey: options.layerKey,
            shoesKey: options.shoesKey,
        }).then(() => navigation.goBack());
    }

    renderListItem = ({ item }) => {
        return (
            <View style={fileStyle.ClothingCol}>
                <View style={fileStyle.ClothingMargin}>
                    <TouchableOpacity
                        onPress={() => selectItem(item)}>
                        <View style={fileStyle.ClothingCard}>
                            <Image
                                source={{ uri: item.image }}
                                style={
                                    item.image === options[defaultRadio + "Image"] ? fileStyle.CardClothingImgSelected : fileStyle.CardClothingImg
                                }
                            />
                            {
                                item.image === options[defaultRadio + "Image"] ?
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
            <Text style={styles.H2Title}>Modifier la tenue</Text>
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

                                            {options[item.firebaseName + "Image"] ?
                                                <Image
                                                    source={{ uri: options[item.firebaseName + "Image"] }}
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
                        keyExtractor={this.keyExtractor}
                        scrollEnabled={false}
                        style={fileStyle.ClothingList}
                        columnWrapperStyle={fileStyle.ClothingRow}
                    />
                </View>
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
};

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
        right: 15,
        width: '100%',
    }
});

export default OutfitUpdate;