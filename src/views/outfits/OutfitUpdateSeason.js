import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RadioButtonClothingSeason from '../../components/RadioButtonClothingSeason';
import { OutfitDao } from '../../dao/OutfitDao';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';

const OutfitUpdateSeason = ({ route, navigation }) => {

    const { key, ItemValue } = route.params;
    const [option, setOption] = useState(ItemValue);
    const [seasonErrorMessage, setSeasonErrorMessage] = useState('');

    seasonValidation = async () => {
        let errorFlag = false;

        // input validation
        if (option.length == 0) {
            errorFlag = true;
            setSeasonErrorMessage("La saison est un champ obligatoire");
        }

        if (!errorFlag) {
            setSeasonErrorMessage("");
            updateItem();
        }
    };

    async function updateItem() {
        const outfitDao = new OutfitDao();
        outfitDao.update(key, {
            season: option,
        }).then(() => navigation.goBack());
    }

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
            <Text style={styles.H2Title}>Modifier la saison</Text>
            <RadioButtonClothingSeason ItemValue={ItemValue} onSelect={(value) => setOption(value)} />
            {seasonErrorMessage ? <Text style={styles.textDanger}>{seasonErrorMessage}</Text> : null}
            <View style={styles.ContainerPrimaryButtonBottom}>
                <TouchableOpacity
                    style={styles.PrimaryButton}
                    onPress={() => seasonValidation()}>
                    <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default OutfitUpdateSeason;