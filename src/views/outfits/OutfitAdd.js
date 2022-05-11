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
    topImage: "",
    topKey: "",
    bottomImage: "",
    bottomKey: "",
    layerImage: "",
    layerKey: "",
    shoesImage: "",
    shoesKey: "",
    accessoriesImage: [],
    accessoriesKey: [],
    season: "",
  });
  const [seasonErrorMessage, setSeasonErrorMessage] = useState('');

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

  seasonValidation = async () => {
    let errorFlag = false;

    // input validation
    if (values.season.length == 0) {
      errorFlag = true;
      setSeasonErrorMessage("La saison est un champ obligatoire");
    }

    if (errorFlag) {
      console.log("errorFlag");

      /** Call Your API */
    } else {
      setSeasonErrorMessage("");
      addItem();
    }
  };

  function addItem() {
    const outfitDao = new OutfitDao();
    outfitDao.push({
      userId: values.userId,
      topKey: values.topKey,
      bottomKey: values.bottomKey,
      layerKey: values.layerKey,
      shoesKey: values.shoesKey,
      accessoriesKey: values.accessoriesKey,
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
            setValues={setValues}
            nextStep={nextStep}
          />,
          2: <OutfitAddStep2
            values={values}
            selectHandler={selectHandler}
            seasonErrorMessage={seasonErrorMessage}
            nextStep={nextStep}
            addItem={seasonValidation} />,
          3: <OutfitAddStep3
            values={values}
            setValues={setValues}
            prevStep={prevStep} />
        }[step]
      }
    </View>
  );

};

const fileStyle = StyleSheet.create({

});

export default OutfitAdd;