import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import OutfitAddStep1 from '../../components/OutfitAddStep1.js';
import OutfitAddStep2 from '../../components/OutfitAddStep2.js';
import OutfitAddStep3 from '../../components/OutfitAddStep3.js';

import { OutfitDao } from '../../dao/OutfitDao.js';
import { AuthService } from '../../services/AuthService';

import styles from './../../../assets/styles/style.js';

import ChevronLeftOrange from './../../../assets/images/chevron-left-orange.svg';
import TimesOrange from './../../../assets/images/times-orange.svg';

const OutfitAdd = ({ navigation }) => {

  const userId = new AuthService().getUser().uid;
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    userId: userId,
    top: "",
    bottom: "",
    layer: "",
    shoes: "",
    accessories: [],
    season: ""
  });

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
          style={styles.IconHeaderLeft}>
          <Text style={styles.CancelText}>Annuler</Text>
        </TouchableOpacity>

    );
  };

  const HeaderRight = () => {
    return (
      step > 1 ?
        <TouchableOpacity
          onPress={() => navigation.navigate('OutfitList')}
          style={styles.IconHeaderRight}>
          <TimesOrange width={25} height={25} />
        </TouchableOpacity>
        : null

    );
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const selectHandler = (value, name) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  function addItem() {
    const outfitDao = new OutfitDao();
    outfitDao.push({
      userId: values.userId,
      top: values.top,
      bottom: values.bottom,
      layer: values.layer,
      shoes: values.shoes,
      accessories: values.accessories,
      season: values.season,
    }).then(() => navigation.navigate('OutfitList'));
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
    <View style={styles.ContainerView}>
      {updateHeader()}
      {
        {
          1: <OutfitAddStep1
            values={values}
            selectHandler={selectHandler}
            nextStep={nextStep}
          />,
          2: <OutfitAddStep2
            values={values}
            selectHandler={selectHandler}
            nextStep={nextStep}
            addItem={addItem} />,
          3: <OutfitAddStep3
            values={values}
            selectHandler={selectHandler}
            prevStep={prevStep} />
        }[step]
      }
    </View>
  );

};

const fileStyle = StyleSheet.create({

});

export default OutfitAdd;