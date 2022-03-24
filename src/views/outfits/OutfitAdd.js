import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './../../../assets/styles/style.js';

const OutfitAdd = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()}
          style={styles.CancelTextLink}>
          <Text style={styles.CancelText}>Annuler</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Outfit Add</Text>
    </View>
  );

}
export default OutfitAdd;