import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, SectionList, FlatList, Image } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { ClothingDao } from './../../dao/ClothingDao';
import { AuthService } from '../../services/AuthService';

import styles from './../../../assets/styles/style.js';

import IconPlusWhite from './../../../assets/images/icon-plus-white.svg';

const ClothingList = ({ navigation }) => {

  const currentUserId = new AuthService().getUser().uid;
  const isFocused = useIsFocused();
  const [clothingTops, setClothingTops] = useState([]);
  const [clothingBottoms, setClothingBottoms] = useState([]);
  const [clothingDresses, setClothingDresses] = useState([]);
  const [clothingSkirts, setClothingSkirts] = useState([]);
  const [clothingLayers, setClothingLayers] = useState([]);
  const [clothingShoes, setClothingShoes] = useState([]);
  const [clothingAccessories, setClothingAccessories] = useState([]);
  const totalItems = clothingTops.length
    + clothingBottoms.length
    + clothingDresses.length
    + clothingSkirts.length
    + clothingLayers.length
    + clothingShoes.length
    + clothingAccessories.length;

  useEffect(() => {

    if (isFocused) {
      const clothingDao = new ClothingDao();

      clothingDao.fetchAllByType('Hauts', currentUserId).then(setClothingTops);
      clothingDao.fetchAllByType('Pantalons', currentUserId).then(setClothingBottoms);
      clothingDao.fetchAllByType('Robes', currentUserId).then(setClothingDresses);
      clothingDao.fetchAllByType('Jupes', currentUserId).then(setClothingSkirts);
      clothingDao.fetchAllByType('Vestes / Manteaux', currentUserId).then(setClothingLayers);
      clothingDao.fetchAllByType('Chaussures', currentUserId).then(setClothingShoes);
      clothingDao.fetchAllByType('Accessoires', currentUserId).then(setClothingAccessories);
    }

  }, [isFocused]);

  const sections = [
    {
      title: "Hauts",
      count: clothingTops.length,
      data: [
        {
          list: clothingTops
        },
      ],
    },
    {
      title: "Pantalons",
      count: clothingBottoms.length,
      data: [
        {
          list: clothingBottoms
        },
      ],
    },
    {
      title: "Robes",
      count: clothingDresses.length,
      data: [
        {
          list: clothingDresses
        },
      ],
    },
    {
      title: "Jupes",
      count: clothingSkirts.length,
      data: [
        {
          list: clothingSkirts
        },
      ],
    },
    {
      title: "Vestes / Manteaux",
      count: clothingLayers.length,
      data: [
        {
          list: clothingLayers
        },
      ],
    },
    {
      title: "Chaussures",
      count: clothingShoes.length,
      data: [
        {
          list: clothingShoes
        },
      ],
    },
    {
      title: "Accessoires",
      count: clothingAccessories.length,
      data: [
        {
          list: clothingAccessories
        },
      ],
    },
  ];

  const renderEmptyContainer = () => {
    return (
      <View style={styles.CardAddContainer}>
        <View style={styles.CardAddCol}>
          <View style={styles.CardAddMargin}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ClothingAdd')}
              style={styles.CardAddButton}>
              <View style={styles.CardAddIcon}>
                <IconPlusWhite width={20} height={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderSection = ({ item }) => {
    return (
      <View style={styles.ClothingView}>
        <FlatList
          data={item.list}
          numColumns={3}
          renderItem={this.renderListItem}
          keyExtractor={this.keyExtractor}
          scrollEnabled={false}
          style={styles.ClothingList}
          columnWrapperStyle={styles.ClothingRow}
          ListEmptyComponent={renderEmptyContainer}
        />
      </View>
    );
  };

  renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.HeaderH3Clothing}>
        <Text style={styles.H3Title}>{section.title} <Text style={styles.H3Subtitle}>({section.count})</Text></Text>
      </View>
    );
  };

  renderListItem = ({ item }) => {
    return (
      <View style={styles.ClothingCol}>
        <View style={styles.ClothingMargin}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ClothingDetail', {
              key: item.key
            })}
          >
            <View style={styles.ClothingCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.CardClothingImg}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  keyExtractor = (item) => {
    return item.key;
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ClothingAdd')}
          style={styles.AddIcon}>
          <IconPlusWhite width={15} height={15} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.ContainerView}>
      <Text style={styles.Subtitle}>{totalItems} Articles</Text>
      <Text style={styles.H1Title}>Ma garde robe</Text>
      <SectionList
        sections={sections}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderSection}
      />
    </View>
  );
};

export default ClothingList;

