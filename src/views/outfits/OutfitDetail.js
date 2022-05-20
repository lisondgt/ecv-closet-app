import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import ModalComponent from '../../components/ModalComponent';
import { OutfitDao } from '../../dao/OutfitDao.js';
import { OutfitCalendarDao } from '../../dao/OutfitCalendarDao.js';
import { ClothingCalendarDao } from '../../dao/ClothingCalendarDao.js';
import { OutfitService } from '../../services/OutfitService.js';

import styles from './../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import TrashIconOrange from './../../../assets/images/trash-alt-orange.svg';
import PencilWhite from './../../../assets/images/pencil-alt-white.svg';
import CloudSunDark from './../../../assets/images/cloud-sun-dark.svg';
import ChevronRightGrey from './../../../assets/images/chevron-right-grey.svg';
import IconPlusWhite from './../../../assets/images/icon-plus-white.svg';

const OutfitDetail = ({ route, navigation }) => {

    const { key } = route.params;
    const [outfitItem, setOutfitItem] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {
            const outfitService = new OutfitService();
            outfitService.fetchOne(key).then(setOutfitItem);
        }

    }, [isFocused]);

    const modalContent = () => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => deleteItem()}
                    style={styles.PrimaryButton}
                >
                    <Text style={styles.PrimaryButtonText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        );
    };

    function deleteItem() {
        const outfitCalendarDao = new OutfitCalendarDao();
        const clothingCalendarDao = new ClothingCalendarDao();
        const outfitDao = new OutfitDao();

        outfitCalendarDao.removeCalendarByOutfitKey(key);
        if (outfitItem.topKey) {
            clothingCalendarDao.removeCalendarByClothingKey(outfitItem.topKey);
        }
        if (outfitItem.bottomKey) {
            clothingCalendarDao.removeCalendarByClothingKey(outfitItem.bottomKey);
        }
        if (outfitItem.layerKey) {
            clothingCalendarDao.removeCalendarByClothingKey(outfitItem.layerKey);
        }
        if (outfitItem.shoesKey) {
            clothingCalendarDao.removeCalendarByClothingKey(outfitItem.shoesKey);
        }
        if (outfitItem.accessoriesKey && outfitItem.accessoriesKey.length > 0) {
            outfitItem.accessoriesKey.map((item) => {
                clothingCalendarDao.removeCalendarByClothingKey(item);
            });
        }
        outfitDao.remove(key)
            .then(() => setModalVisible(false))
            .then(() => navigation.navigate('OutfitList'));
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
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.IconHeaderRight}>
                    <TrashIconOrange width={25} height={25} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.ContainerView}>
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} modalTitle={"Êtes vous sûre de vouloir supprimer cette tenue ?"} modalContent={modalContent()} />
            <TouchableOpacity
                onPress={() => navigation.navigate('OutfitUpdate', {
                    key: key,
                    values: {
                        topImage: outfitItem.topImage,
                        topKey: outfitItem.topKey,
                        bottomImage: outfitItem.bottomImage,
                        bottomKey: outfitItem.bottomKey,
                        layerImage: outfitItem.layerImage,
                        layerKey: outfitItem.layerKey,
                        shoesImage: outfitItem.shoesImage,
                        shoesKey: outfitItem.shoesKey
                    }
                })}>
                <View style={fileStyle.ItemsCard}>
                    <View style={fileStyle.EditButton}>
                        <Text style={fileStyle.EditText}>Modifier</Text>
                        <PencilWhite width={10} height={10} />
                    </View>
                    <View style={fileStyle.ImagesContainer}>
                        {outfitItem.topImage ?
                            <View style={fileStyle.ImagesCol}>
                                <View style={fileStyle.ImagesMargin}>
                                    <Image
                                        source={{ uri: outfitItem.topImage }}
                                        style={fileStyle.ImageCard}
                                    />
                                </View>
                            </View>
                            : null
                        }
                        {outfitItem.bottomImage ?
                            <View style={fileStyle.ImagesCol}>
                                <View style={fileStyle.ImagesMargin}>
                                    <Image
                                        source={{ uri: outfitItem.bottomImage }}
                                        style={fileStyle.ImageCard}
                                    />
                                </View>
                            </View>
                            : null
                        }
                        {outfitItem.layerImage ?
                            <View style={fileStyle.ImagesCol}>
                                <View style={fileStyle.ImagesMargin}>
                                    <Image
                                        source={{ uri: outfitItem.layerImage }}
                                        style={fileStyle.ImageCard}
                                    />
                                </View>
                            </View>
                            : null
                        }
                        {outfitItem.shoesImage ?
                            <View style={fileStyle.ImagesCol}>
                                <View style={fileStyle.ImagesMargin}>
                                    <Image
                                        source={{ uri: outfitItem.shoesImage }}
                                        style={fileStyle.ImageCard}
                                    />
                                </View>
                            </View>
                            : null
                        }
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.MarginBottom10}>
                <Text style={styles.Text}>Accessoires</Text>
            </View>
            <View style={fileStyle.ContainerCardButton}>
                {outfitItem.accessoriesKey != undefined && outfitItem.accessoriesKey.length > 0 ?
                    outfitItem.accessoriesImage.map((item) => {
                        return (
                            <View key={item} style={fileStyle.CardButtonCol}>
                                <View style={fileStyle.CardButtonMargin}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('OutfitUpdateAccessories', {
                                            key: key,
                                            values: {
                                                accessoriesImage: outfitItem.accessoriesImage,
                                                accessoriesKey: outfitItem.accessoriesKey
                                            }
                                        })}>
                                        <View style={fileStyle.CardButtonAdd}>
                                            <Image
                                                source={{ uri: item }}
                                                style={fileStyle.CardButtonImageItem}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })
                    :
                    <View style={fileStyle.CardButtonCol}>
                        <View style={fileStyle.CardButtonMargin}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('OutfitUpdateAccessories', {
                                    key: key,
                                    values: {
                                        accessoriesImage: outfitItem.accessoriesImage,
                                        accessoriesKey: outfitItem.accessoriesKey
                                    }
                                })}>
                                <View style={fileStyle.CardButtonAdd}>
                                    <View style={styles.CardAddIcon}>
                                        <IconPlusWhite width={20} height={20} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('OutfitUpdateSeason', {
                    key: key,
                    ItemValue: outfitItem.season
                })}>
                <View style={fileStyle.OutfitField}>
                    <View style={fileStyle.ContentLeft}>
                        <CloudSunDark style={fileStyle.MarginRight} width={15} height={15} />
                        <Text style={styles.Text}>Saison</Text>
                    </View>
                    <View style={fileStyle.ContentRight}>
                        <Text style={styles.Text}>{outfitItem.season}</Text>
                        <ChevronRightGrey style={fileStyle.MarginLeft} width={15} height={15} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const fileStyle = StyleSheet.create({
    ItemsCard: {
        width: '100%',
        minHeight: 380,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        marginBottom: 20
    },
    EditButton: {
        backgroundColor: '#748CAA',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    EditText: {
        fontFamily: 'Jost-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        marginRight: 5
    },
    ImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: -5
    },
    ImagesCol: {
        width: '50%'
    },
    ImagesMargin: {
        margin: 5
    },
    ImageCard: {
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContainerCardButton: {
        flexDirection: 'row',
        marginHorizontal: -5,
        paddingBottom: 20
    },
    CardButtonCol: {
        flex: 1 / 4
    },
    CardButtonMargin: {
        marginHorizontal: 5
    },
    CardButtonAdd: {
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
    OutfitFieldContainer: {
        marginTop: 1
    },
    OutfitField: {
        borderTopColor: '#ACB5BC',
        borderTopWidth: 1,
        borderBottomColor: '#ACB5BC',
        borderBottomWidth: 1,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -1
    },
    ContentLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    MarginRight: {
        marginRight: 10
    },
    ContentRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    MarginLeft: {
        marginLeft: 10
    }
});
export default OutfitDetail;