import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { ClothingColorDao } from '../dao/ClothingColorDao';
import { AuthService } from '../services/AuthService';

import styles from '../../assets/styles/style.js';

import PlusDark from './../../assets/images/plus-dark.svg';

export default function RadioButtonClothingColor({ onSelect, ItemValue }) {

    const isFocused = useIsFocused();
    const userId = new AuthService().getUser().uid;
    const [data, setData] = useState([]);
    const [defaultRadio, setDefaultRadio] = useState(ItemValue);
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {

        if (isFocused) {
            const clothingColorDao = new ClothingColorDao();
            clothingColorDao.fetchAllByUserId(userId).then(setData);
        }

    }, []);

    const selectHandler = (value) => {
        if (defaultRadio != value) {
            onSelect(value);
            setDefaultRadio(value);
        } else {
            onSelect('');
            setDefaultRadio('');
        }
    };

    const onChangeText = (text) => {
        setValue(text);
    };

    const submitHandler = (value) => {
        const clothingColorDao = new ClothingColorDao();
        clothingColorDao.push({ value, userId }).then(
            (key) => {
                setData((prevData) => {
                    return [
                        ...prevData,
                        {
                            value,
                            key,
                            userId,
                        },
                    ];
                });
            },
            setDefaultRadio(value),
            selectHandler(value)
        );
    };

    return (
        <View style={styles.ContainerRadioButton}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.H3Title}>Ajouter une nouvelle Couleur</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            placeholder="Couleur"
                        />
                        <View style={styles.ContainerModalButtons}>
                            <TouchableOpacity
                                style={styles.ModalButtonCancel}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.ModalTextButtonCancel}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.ModalButtonSave}
                                onPress={() => {
                                    setValue(submitHandler(value));
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.ModalTextButtonSave}>Enregistrer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {data.map((item) => {
                return (
                    <TouchableOpacity
                        style={
                            item.value === defaultRadio ? styles.RadioButtonSelected : styles.RadioButtonUnselected
                        }
                        key={item.value}
                        onPress={() => selectHandler(item.value)}>
                        <Text style={
                            item.value === defaultRadio ? styles.RadioTextSelected : styles.RadioTextUnselected
                        }>{item.value}</Text>
                    </TouchableOpacity>
                );
            })}
            <TouchableOpacity
                style={styles.ButtonOther}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.TextOther}>Autre</Text>
                <PlusDark width={10} height={10} />
            </TouchableOpacity>
        </View>
    );
}