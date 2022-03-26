import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import ClothingAddStep1 from '../../components/ClothingAddStep1';
import ClothingAddStep2 from '../../components/ClothingAddStep2';
import ClothingAddStep3 from '../../components/ClothingAddStep3';
import { ClothingDao } from '../../dao/ClothingDao';
import { AuthService } from '../../services/AuthService';
import { StorageService } from '../../services/StorageService';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import TimesOrange from './../../../assets/images/times-orange.svg';

const ClothingAdd = ({ navigation }) => {

    const userId = new AuthService().getUser().uid;
    const [values, setValues] = useState({
        userId: userId,
        imageUrl: "",
        imageName: "",
        imageUri: "",
        type: "",
        color: "",
        season: "",
        size: "",
        status: "",
        fit: "",
        rate: "",
    });

    const [step, setStep] = useState(1);

    const HeaderLeft = () => {
        return (
            step > 1 ?
                <TouchableOpacity
                    onPress={prevStep}
                    style={styles.IconHeaderLeft}>
                    <ChevronLeftOrange width={25} height={25} />
                </TouchableOpacity>
                : <TouchableOpacity
                    onPress={() =>
                        navigation.goBack()}
                    style={styles.CancelTextLink}>
                    <Text style={styles.CancelText}>Annuler</Text>
                </TouchableOpacity>

        );
    };

    const HeaderRight = () => {
        return (
            step > 1 ?
                <TouchableOpacity
                    onPress={() => navigation.navigate('ClothingList')}
                    style={styles.IconHeaderRight}>
                    <TimesOrange width={25} height={25} />
                </TouchableOpacity>
                : null

        );
    };

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        } else if (step === 3) {
            console.log(values);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const selectHandler = (value, name) => {
        const state = values;
        state[name] = value;
        setValues(state);
    };

    function addItem() {
        new StorageService().uploadAndGetUrl(imageName, imageUri).then((url) => {
            const clothingDao = new ClothingDao();
            clothingDao.push({
                userId: values.userId,
                image: url,
                type: values.type,
                color: values.color,
                season: values.season,
                size: values.size,
                status: values.status,
                fit: values.fit,
                rate: values.rate,
            });
        }).then(() => navigation.navigate('ClothingList'));
    }

    const updateHeader = () => {
        return (
            navigation.setOptions({
                headerLeft: () => (
                    <HeaderLeft />
                ),
                headerRight: () => (
                    <HeaderRight />
                )
            })
        );
    };

    return (
        <ScrollView style={styles.ContainerView}>
            {updateHeader()}
            {
                {
                    1: <ClothingAddStep1 values={values} selectHandler={selectHandler} nextStep={nextStep} />,
                    2: <ClothingAddStep2 values={values} selectHandler={selectHandler} nextStep={nextStep} />,
                    3: <ClothingAddStep3 values={values} selectHandler={selectHandler} />,
                }[step]
            }
            <View style={styles.ContainerPrimaryButton}>
                <TouchableOpacity onPress={nextStep}>
                    {step === 3 ?
                        <TouchableOpacity
                            style={styles.PrimaryButton}
                            onPress={() => addItem()}>
                            <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                        </TouchableOpacity>
                        : null
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

};
export default ClothingAdd;