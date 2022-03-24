import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './../../../assets/styles/style.js';

import IconPlusWhite from './../../../assets/images/icon-plus-white.svg';

const OutfitList = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OutfitAdd')}
          style={styles.AddIcon}>
          <IconPlusWhite width={15} height={15} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Outfit List</Text>
    </View>
  );

}
export default OutfitList;