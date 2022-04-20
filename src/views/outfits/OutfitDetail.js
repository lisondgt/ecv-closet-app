import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { OutfitDao } from '../../dao/OutfitDao.js';

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
    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {
            const outfitDao = new OutfitDao();
            outfitDao.fetchOne(key).then(setOutfitItem);
        }

    }, [isFocused]);

    console.log('outfitItem', outfitItem);

    const deleteItem = () => {
        const outfitDao = new OutfitDao();
        outfitDao.remove(key).then(() => navigation.navigate('OutfitList'));
    };

    const deteteAlert = () =>
        Alert.alert(
            "Supprimer",
            "Êtes vous sûre de vouloir supprimer cette tenue ?",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteItem() }
            ]
        );

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
                    onPress={deteteAlert}
                    style={styles.IconHeaderRight}>
                    <TrashIconOrange width={25} height={25} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.ContainerView}>
            <TouchableOpacity
                onPress={() => navigation.navigate('OutfitUpdate', {
                    key: key,
                    values: {
                        top: outfitItem.top,
                        bottom: outfitItem.bottom,
                        layer: outfitItem.layer,
                        shoes: outfitItem.shoes
                    }
                })}>
                <View style={fileStyle.ItemsCard}>
                    <View style={fileStyle.EditButton}>
                        <Text style={fileStyle.EditText}>Modifier</Text>
                        <PencilWhite width={10} height={10} />
                    </View>
                    <View style={fileStyle.ImagesContainer}>
                        {outfitItem.top ?
                            <View style={fileStyle.ImagesCol}>
                                <View style={fileStyle.ImagesMargin}>
                                    <Image
                                        source={{ uri: outfitItem.top }}
                                        style={fileStyle.ImageCard}
                                    />
                                </View>
                            </View>
                            : null
                        }
                        {outfitItem.bottom ?
                            <View style={fileStyle.ImagesCol}>
                                <View style={fileStyle.ImagesMargin}>
                                    <Image
                                        source={{ uri: outfitItem.bottom }}
                                        style={fileStyle.ImageCard}
                                    />
                                </View>
                            </View>
                            : null
                        }
                        {outfitItem.layer ?
                            <View style={fileStyle.ImagesCol}>
                                <View style={fileStyle.ImagesMargin}>
                                    <Image
                                        source={{ uri: outfitItem.layer }}
                                        style={fileStyle.ImageCard}
                                    />
                                </View>
                            </View>
                            : null
                        }
                        {outfitItem.shoes ?
                            <View style={fileStyle.ImagesCol}>
                                <View style={fileStyle.ImagesMargin}>
                                    <Image
                                        source={{ uri: outfitItem.shoes }}
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
                {outfitItem.accessories ?
                    outfitItem.accessories.map((item) => {
                        return (
                            <View style={fileStyle.CardButtonCol}>
                                <View style={fileStyle.CardButtonMargin}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('OutfitUpdateAccessories', {
                                            key: key,
                                            values: outfitItem.accessories
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
                    : <View style={fileStyle.CardButtonCol}>
                        <View style={fileStyle.CardButtonMargin}>
                            <TouchableOpacity>
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