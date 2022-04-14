import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RadioButtonClothingSeason from './RadioButtonClothingSeason.js';

import styles from '../../assets/styles/style.js';

import IconPlusWhite from '../../assets/images/icon-plus-white.svg';
import { ScrollView } from 'react-native-gesture-handler';

export default function OutfitAddStep2({ values, selectHandler, nextStep, addItem }) {

    return (
        <ScrollView>
            <View style={fileStyle.ItemsCard}>
                <View style={fileStyle.ImagesContainer}>
                    {values.top ?
                        <View style={fileStyle.ImagesCol}>
                            <View style={fileStyle.ImagesMargin}>
                                <Image
                                    source={{ uri: values.top }}
                                    style={fileStyle.ImageCard}
                                />
                            </View>
                        </View>
                        : null
                    }
                    {values.bottom ?
                        <View style={fileStyle.ImagesCol}>
                            <View style={fileStyle.ImagesMargin}>
                                <Image
                                    source={{ uri: values.bottom }}
                                    style={fileStyle.ImageCard}
                                />
                            </View>
                        </View>
                        : null
                    }
                    {values.layer ?
                        <View style={fileStyle.ImagesCol}>
                            <View style={fileStyle.ImagesMargin}>
                                <Image
                                    source={{ uri: values.layer }}
                                    style={fileStyle.ImageCard}
                                />
                            </View>
                        </View>
                        : null
                    }
                    {values.shoes ?
                        <View style={fileStyle.ImagesCol}>
                            <View style={fileStyle.ImagesMargin}>
                                <Image
                                    source={{ uri: values.shoes }}
                                    style={fileStyle.ImageCard}
                                />
                            </View>
                        </View>
                        : null
                    }
                </View>
            </View>
            <View style={styles.MarginBottom10}>
                <Text style={styles.Text}>Compléter ma tenue avec des accessoires...</Text>
            </View>
            <View style={fileStyle.ContainerCardButton}>
                {values.accessories.map((item) => {
                    return (
                        <View style={fileStyle.CardButtonCol}>
                            <View style={fileStyle.CardButtonMargin}>
                                <TouchableOpacity
                                    onPress={nextStep}>
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
                })}
                {values.accessories.length < 4 ?
                    <View style={fileStyle.CardButtonCol}>
                        <View style={fileStyle.CardButtonMargin}>
                            <TouchableOpacity
                                onPress={nextStep}>
                                <View style={fileStyle.CardButtonAdd}>
                                    <View style={styles.CardAddIcon}>
                                        <IconPlusWhite width={20} height={20} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : null
                }
            </View>
            <Text style={styles.H3Title}>Saison</Text>
            <RadioButtonClothingSeason ItemValue={values.season} onSelect={(value) => { selectHandler(value, 'season'); }} />
            <View style={styles.ContainerPrimaryButton} >
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={addItem}>
                    <Text style={styles.PrimaryButtonText}>Enregistrer ma tenue</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const fileStyle = StyleSheet.create({
    ItemsCard: {
        width: '100%',
        aspectRatio: 1,
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
});