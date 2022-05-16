import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ClothingAddStep1 from '../../components/ClothingAddStep1';
import ClothingAddStep2 from '../../components/ClothingAddStep2';
import ClothingAddStep3 from '../../components/ClothingAddStep3';
import ProgressBarComponent from '../../components/ProgressBarComponent';
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
    const [progress, setProgress] = useState(0);

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
        new StorageService().upload(values.imageName, values.imageUri, (progress) => setProgress(progress)).then(() => {
            const clothingDao = new ClothingDao();
            clothingDao.push({
                userId: values.userId,
                image: values.imageName,
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
        <SafeAreaView style={styles.ContainerSafeArea}>
            <ScrollView style={styles.ContainerView}>
                {updateHeader()}
                {
                    {
                        1: <ClothingAddStep1 values={values} selectHandler={selectHandler} nextStep={nextStep} />,
                        2: <ClothingAddStep2 values={values} selectHandler={selectHandler} nextStep={nextStep} />,
                        3: <ClothingAddStep3 values={values} selectHandler={selectHandler} />,
                    }[step]
                }
                {step === 3 ?
                    <View style={styles.ContainerPrimaryButton}>
                        <TouchableOpacity
                            style={styles.PrimaryButton}
                            onPress={() => addItem()}>
                            <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </ScrollView>
            {progress > 0 ?
                <View style={styles.ContainerProgressBar}>
                    <ProgressBarComponent progress={progress} />
                </View>
                : null
            }
        </SafeAreaView>
    );

};
export default ClothingAdd;;