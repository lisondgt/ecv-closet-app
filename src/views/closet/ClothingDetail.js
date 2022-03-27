import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import RatingStars from '../../components/RatingStars';
import { ClothingDao } from './../../dao/ClothingDao';

import styles from './../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import TrashIconOrange from './../../../assets/images/trash-alt-orange.svg';
import PencilWhite from './../../../assets/images/pencil-alt-white.svg';
import TshirtDark from './../../../assets/images/tshirt-dark.svg';
import PalettetDark from './../../../assets/images/palette-dark.svg';
import CloudSunDark from './../../../assets/images/cloud-sun-dark.svg';
import RulerDark from './../../../assets/images/ruler-dark.svg';
import QuestionCircleDark from './../../../assets/images/question-circle-dark.svg';
import ArrowsDark from './../../../assets/images/arrows-alt-h-dark.svg';
import StarDark from './../../../assets/images/star-dark.svg';
import ChevronRightGrey from './../../../assets/images/chevron-right-grey.svg';

const ClothingDetail = ({ route, navigation }) => {

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

    const { key } = route.params;
    const [clothingItem, setClothingItem] = useState([]);
    const maxRating = RatingData;
    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {
            const clothingDao = new ClothingDao();
            clothingDao.fetchOne(key).then(setClothingItem);
        }

    }, [isFocused]);

    const deleteItem = () => {
        const clothingDao = new ClothingDao();
        clothingDao.remove(key).then(() => navigation.navigate('ClothingList'));
    };

    const deteteAlert = () =>
        Alert.alert(
            "Supprimer",
            "Êtes vous sûre de vouloir supprimer cet article ?",
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
            <View style={viewStyles.ContainerImage}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingUpdateImage', {
                        key: key,
                        ItemValue: clothingItem.image,
                    })}>
                    <View style={viewStyles.ColImage}>
                        <View style={viewStyles.ContentImage}>
                            <Image
                                source={{ uri: clothingItem.image }}
                                style={viewStyles.Image}
                            />
                        </View>

                        <View
                            style={viewStyles.EditIconContainer}>
                            <View style={viewStyles.EditIcon}>
                                <PencilWhite width={8} height={8} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={viewStyles.ClothingFieldContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingUpdateType', {
                        key: key,
                        ItemValue: clothingItem.type,
                    })}>
                    <View style={viewStyles.ClothingField}>
                        <View style={viewStyles.ContentLeft}>
                            <TshirtDark style={viewStyles.MarginRight} width={15} height={15} />
                            <Text style={styles.Text}>Catégorie</Text>
                        </View>
                        <View style={viewStyles.ContentRight}>
                            <Text style={styles.Text}>{clothingItem.type}</Text>
                            <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingUpdateColor', {
                        key: key,
                        ItemValue: clothingItem.color,
                    })}>
                    <View style={viewStyles.ClothingField}>
                        <View style={viewStyles.ContentLeft}>
                            <PalettetDark style={viewStyles.MarginRight} width={15} height={15} />
                            <Text style={styles.Text}>Couleur</Text>
                        </View>
                        <View style={viewStyles.ContentRight}>
                            <Text style={styles.Text}>{clothingItem.color}</Text>
                            <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingUpdateSeason', {
                        key: key,
                        ItemValue: clothingItem.season,
                    })}>
                    <View style={viewStyles.ClothingField}>
                        <View style={viewStyles.ContentLeft}>
                            <CloudSunDark style={viewStyles.MarginRight} width={15} height={15} />
                            <Text style={styles.Text}>Saison</Text>
                        </View>
                        <View style={viewStyles.ContentRight}>
                            <Text style={styles.Text}>{clothingItem.season}</Text>
                            <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingUpdateSize', {
                        key: key,
                        ItemValue: clothingItem.size,
                    })}>
                    <View style={viewStyles.ClothingField}>
                        <View style={viewStyles.ContentLeft}>
                            <RulerDark style={viewStyles.MarginRight} width={15} height={15} />
                            <Text style={styles.Text}>Taille</Text>
                        </View>
                        <View style={viewStyles.ContentRight}>
                            <Text style={styles.Text}>{clothingItem.size}</Text>
                            <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingUpdateStatus', {
                        key: key,
                        ItemValue: clothingItem.status,
                    })}>
                    <View style={viewStyles.ClothingField}>
                        <View style={viewStyles.ContentLeft}>
                            <QuestionCircleDark style={viewStyles.MarginRight} width={15} height={15} />
                            <Text style={styles.Text}>Statut</Text>
                        </View>
                        <View style={viewStyles.ContentRight}>
                            <Text style={styles.Text}>{clothingItem.status}</Text>
                            <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingUpdateFit', {
                        key: key,
                        ItemValue: clothingItem.fit,
                    })}>
                    <View style={viewStyles.ClothingField}>
                        <View style={viewStyles.ContentLeft}>
                            <ArrowsDark style={viewStyles.MarginRight} width={15} height={15} />
                            <Text style={styles.Text}>État</Text>
                        </View>
                        <View style={viewStyles.ContentRight}>
                            <Text style={styles.Text}>{clothingItem.fit}</Text>
                            <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingUpdateRate', {
                        key: key,
                        ItemValue: clothingItem.rate,
                    })}>
                    <View style={viewStyles.ClothingField}>
                        <View style={viewStyles.ContentLeft}>
                            <StarDark style={viewStyles.MarginRight} width={15} height={15} />
                            <Text style={styles.Text}>Note</Text>
                        </View>
                        <View style={viewStyles.ContentRight}>
                            <RatingStars maxRating={maxRating} RateValue={clothingItem.rate} />
                            <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const viewStyles = StyleSheet.create({
    ContainerImage: {
        alignItems: 'center',
        marginBottom: 20,
    },
    ColImage: {
        width: '70%'
    },
    ContentImage: {
        width: '100%',
        aspectRatio: 1
    },
    Image: {
        width: '100%',
        height: '100%'
    },
    EditIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    EditIcon: {
        backgroundColor: '#808F9D',
        borderRadius: 20,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ClothingFieldContainer: {
        marginTop: 1
    },
    ClothingField: {
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
export default ClothingDetail;