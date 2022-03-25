import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

import styles from './../../../assets/styles/style.js';

import ClosetLogo from './../../../assets/images/closet-logo.svg';

const Home = ({ navigation }) => {
  return (
    <ImageBackground source={require('./../../../assets/images/background-home.png')} resizeMode="cover" style={viewStyles.ImageBackground}>
      <View style={styles.ContainerView}>
        <ClosetLogo width={230} height={83} style={viewStyles.Logo} />
        <Text style={viewStyles.TextIntro}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
        <View style={styles.ContainerPrimaryButtonBottom}>
          <View style={styles.MarginBottom15}>
            <TouchableOpacity
              style={styles.PrimaryButton}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.PrimaryButtonText}>Inscription</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.SecondaryButton}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.SecondaryButtonText}>Connexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const viewStyles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    justifyContent: "center"
  },
  Logo: {
    marginTop: 80,
    marginBottom: 20,
    alignSelf: 'center'
  },
  TextIntro: {
    textAlign: 'center',
    color: '#DD6E42',
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    marginHorizontal: 80
  }
})

export default Home;