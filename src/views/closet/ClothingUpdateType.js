import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RadioButtonClothingType from '../../components/RadioButtonClothingType';
import { ClothingDao } from '../../dao/ClothingDao';

import styles from '../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';

const ClothingUpdateType = ({ route, navigation }) => {

  const { key, ItemValue } = route.params;
  const [option, setOption] = useState(ItemValue);

  function updateItem() {
    const clothingDao = new ClothingDao();
    clothingDao.update(key, {
      type: option,
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
      <Text style={styles.H2Title}>Modifier le type</Text>
      <View style={styles.ContainerRadioButton}>
        <RadioButtonClothingType ItemValue={ItemValue} onSelect={(value) => setOption(value)} />
      </View>
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
export default ClothingUpdateType;