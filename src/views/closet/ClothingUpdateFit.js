import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RadioButtonClothingFit from '../../components/RadioButtonClothingFit';
import { ClothingDao } from '../../dao/ClothingDao';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';

const ClothingUpdateFit = ({ route, navigation }) => {

  const { key, ItemValue } = route.params;
  const [option, setOption] = useState(ItemValue);


  async function updateItem() {
    const clothingDao = new ClothingDao();
    clothingDao.update(key, {
      fit: option,
    }).then(() => navigation.goBack())
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
      <Text style={styles.H2Title}>Modifier l'état</Text>
        <RadioButtonClothingFit ItemValue={ItemValue} onSelect={(value) => setOption(value)} />
      <View style={styles.ContainerPrimaryButtonBottom}>
        <TouchableOpacity
          style={styles.PrimaryButton}
          onPress={() => updateItem()}>
          <Text style={styles.PrimaryButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ClothingUpdateFit;