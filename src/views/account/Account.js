import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

import styles from '../../../assets/styles/style.js';

import UserGrey from '../../../assets/images/user-grey.svg';
import ChevronRightGrey from '../../../assets/images/chevron-right-grey.svg';


const Account = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [user, setUser] = useState({
    displayName: '',
    photoURL: '',
  });

  useEffect(() => {

    if (isFocused) {
      setUser({
        displayName: auth().currentUser.displayName,
        photoURL: auth().currentUser.photoURL
      })
      const userOk = auth().currentUser;

      userOk.providerData.forEach((userInfo) => {
        console.log('User info for provider: ', userInfo);
      });
    }

  }, [isFocused]);

  const SignOutAlert = () =>
    Alert.alert(
      "Deconnexion",
      "Êtes vous sûre de vouloir vous deconnecter ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Oui", onPress: () => signOut() }
      ]
    );

  signOut = () => {
    auth().signOut()
      .catch(error => setUser({ errorMessage: error.message }))
  }

  return (
    <View style={styles.ContainerView}>
      <Text style={styles.H1Title}>Mon compte</Text>
      <View style={styles.MarginBottom10}>
        <View style={styles.contentCenter}>
          {user.photoURL !== "" ? (
            <View>
              <Image
                source={{ uri: user.photoURL }}
                style={viewStyles.Image}
              />
            </View>
          ) : (
            <View
              style={viewStyles.buttonCamera}>
              <UserGrey width={50} height={50} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.MarginBottom40}>
        <Text style={viewStyles.Username}>{user.displayName}</Text>
      </View>
      <View style={styles.MarginBottom40}>
        <View style={viewStyles.UserFieldContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountUpdate')}>
            <View style={viewStyles.UserField}>
              <View style={viewStyles.ContentLeft}>
                <Text style={styles.Text}>Modifier mon profil</Text>
              </View>
              <View style={viewStyles.ContentRight}>
                <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={viewStyles.UserField}>
              <View style={viewStyles.ContentLeft}>
                <Text style={styles.Text}>Changer de mot de passe</Text>
              </View>
              <View style={viewStyles.ContentRight}>
                <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={viewStyles.UserField}>
              <View style={viewStyles.ContentLeft}>
                <Text style={styles.Text}>Supprimer mon compte</Text>
              </View>
              <View style={viewStyles.ContentRight}>
                <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SignOutAlert()}>
            <View style={viewStyles.UserField}>
              <View style={viewStyles.ContentLeft}>
                <Text style={styles.Text}>Deconnexion</Text>
              </View>
              <View style={viewStyles.ContentRight}>
                <ChevronRightGrey style={viewStyles.MarginLeft} width={15} height={15} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const viewStyles = StyleSheet.create({
  Username: {
    fontFamily: 'Jost-Medium',
    fontSize: 18,
    textAlign: 'center',
    color: '#09091A'
  },
  editButton: {
    backgroundColor: '#748CAA',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  editText: {
    fontFamily: 'Jost-Regular',
    fontSize: 12,
    marginRight: 5,
    color: '#FFFFFF'
  },
  buttonCamera: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ACB5BC',
    borderRadius: 150,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Image: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: '#ACB5BC',
    borderRadius: 150,
    borderRadius: 150
  },
  UserFieldContainer: {
    marginTop: 1
  },
  UserField: {
    borderTopColor: '#ACB5BC',
    borderTopWidth: 1,
    borderBottomColor: '#ACB5BC',
    borderBottomWidth: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -1
  },
  deleteAccount: {
    fontFamily: 'Jost-Regular',
    fontSize: 15,
    color: '#dc3545'
  }
});

export default Account;