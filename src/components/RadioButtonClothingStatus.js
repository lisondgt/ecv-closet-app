import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import ModalComponent from './ModalComponent';
import { ClothingStatusDao } from '../dao/ClothingStatusDao';
import { AuthService } from '../services/AuthService';

import styles from '../../assets/styles/style.js';

import PlusDark from './../../assets/images/plus-dark.svg';

export default function RadioButtonClothingStatus({ onSelect, ItemValue }) {

    const isFocused = useIsFocused();
    const userId = new AuthService().getUser().uid;
    const [data, setData] = useState([]);
    const [defaultRadio, setDefaultRadio] = useState(ItemValue);
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState("");
    const modalTitle = 'Ajouter un nouveau statut';

    useEffect(() => {

        if (isFocused) {
            const clothingStatusDao = new ClothingStatusDao();
            clothingStatusDao.fetchAllByUserId(userId).then(setData);
        }

    }, [isFocused]);

    const modalContent = () => {
        return (
            <View>
                <View style={styles.MarginBottom20}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        placeholder="Statut"
                    />
                </View>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={() => {
                        setValue(submitHandler(value));
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        );
    };

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
        const clothingStatusDao = new ClothingStatusDao();
        clothingStatusDao.push({ value, userId }).then(
            (key) => {
                setData((prevData) => {
                    return [
                        ...prevData,
                        {
                            value,
                            key,
                            userId
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
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} modalTitle={modalTitle} modalContent={modalContent()} />
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