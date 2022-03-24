import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

import styles from './../../../assets/styles/style.js';

import IconPlusWhite from './../../../assets/images/icon-plus-white.svg';

const Calendar = ({ navigation }) => {

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
      <Text>Calendar</Text>
    </View>
  );
}
export default Calendar;