import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import { AuthService } from '../../services/AuthService.js';
import { ClothingDao } from './../../dao/ClothingDao';
import { ClothingCalendarDao } from '../../dao/ClothingCalendarDao';

import styles from '../../../assets/styles/style.js';

import ShirtGrey from '../../../assets/images/shirt-grey-3.svg';
import TrousersGrey from '../../../assets/images/trousers-grey-3.svg';
import DressGrey from '../../../assets/images/dress-grey-3.svg';
import SkirtGrey from '../../../assets/images/skirt-grey-3.svg';
import JacketGrey from '../../../assets/images/jacket-grey-3.svg';
import ShoeGrey from '../../../assets/images/shoe-grey-3.svg';
import RingGrey from '../../../assets/images/ring-grey-3.svg';

const Analytics = () => {

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
  const [calendarClothing, setCalendarClothing] = useState([]);

  const clothingWorn = [];
  calendarClothing.forEach(obj => {
    if (!clothingWorn.some(o => o.clothingKey === obj.clothingKey)) {
      clothingWorn.push({ ...obj });
    }
  });
  const pourcentageClothingWorn = Math.round((clothingWorn.length / totalItems) * 100);



  useEffect(() => {

    if (isFocused) {
      const clothingDao = new ClothingDao();
      const clothingCalendarDao = new ClothingCalendarDao();
      clothingDao.fetchAllByType('Hauts', currentUserId).then(setClothingTops),
        clothingDao.fetchAllByType('Pantalons', currentUserId).then(setClothingBottoms),
        clothingDao.fetchAllByType('Robes', currentUserId).then(setClothingDresses),
        clothingDao.fetchAllByType('Jupes', currentUserId).then(setClothingSkirts),
        clothingDao.fetchAllByType('Vestes / Manteaux', currentUserId).then(setClothingLayers),
        clothingDao.fetchAllByType('Chaussures', currentUserId).then(setClothingShoes),
        clothingDao.fetchAllByType('Accessoires', currentUserId).then(setClothingAccessories),
        clothingCalendarDao.fetchAllByUserId(currentUserId).then(setCalendarClothing);
    }

  }, [isFocused]);

  const sections = [
    {
      title: "Hauts",
      count: clothingTops.length,
      image: <ShirtGrey width={50} height={50} />,
    },
    {
      title: "Pantalons",
      count: clothingBottoms.length,
      image: <TrousersGrey width={50} height={50} />,
    },
    {
      title: "Robes",
      count: clothingDresses.length,
      image: <DressGrey width={50} height={50} />,
    },
    {
      title: "Jupes",
      count: clothingSkirts.length,
      image: <SkirtGrey width={50} height={50} />,
    },
    {
      title: "Vestes / Manteaux",
      count: clothingLayers.length,
      image: <JacketGrey width={50} height={50} />,
    },
    {
      title: "Chaussures",
      count: clothingShoes.length,
      image: <ShoeGrey width={50} height={50} />,
    },
    {
      title: "Accessoires",
      count: clothingAccessories.length,
      image: <RingGrey width={50} height={50} />,
    },
  ];

  const sectionsSorted = [].concat(sections)
    .sort((a, b) => a.count < b.count ? 1 : -1);

  renderListItem = ({ item, index }) => {
    return (
      <View style={viewStyles.ListItem}>
        <Text style={viewStyles.ListIndex}>{index + 1}.</Text>
        <View style={viewStyles.ListImage}>
          {item.image}
        </View>
        <View style={viewStyles.ListText}>
          <Text style={viewStyles.ListTitle}>{item.title}</Text>
          <Text style={viewStyles.ListNumber}>{item.count} articles</Text>
        </View>
      </View>
    );
  };

  keyExtractor = (item) => {
    return item.title;
  };

  return (
    <View style={styles.ContainerView}>
      <Text style={styles.H1Title}>Mes données</Text>
      <View style={viewStyles.ContainerBgBlue}>
        <View style={viewStyles.ContainerText}>
          <Text style={viewStyles.TextLeft}>{pourcentageClothingWorn ? pourcentageClothingWorn : 0}% de votre placard porté</Text>
          <Text style={viewStyles.TextRight}>{clothingWorn.length} sur {totalItems}</Text>
        </View>
        <ProgressBar progress={
          isNaN(pourcentageClothingWorn) ? 0
            : pourcentageClothingWorn === Infinity ? 0
              : !pourcentageClothingWorn ? 0
                : pourcentageClothingWorn / 100
        } color={'#FFFFFF'} style={viewStyles.ProgressBar} />
      </View>
      <View style={viewStyles.ContainerChiffresCles}>
        <View style={viewStyles.MarginChiffreCles}>
          <View style={viewStyles.ContentChiffreCles}>
            <Text style={viewStyles.ChiffreCle}>{totalItems}</Text>
            <Text style={viewStyles.TextChiffreCle}>Articles au total</Text>
          </View>
        </View>
        <View style={viewStyles.MarginChiffreCles}>
          <View style={viewStyles.ContentChiffreCles}>
            <Text style={viewStyles.ChiffreCle}>{totalItems - clothingWorn.length}</Text>
            <Text style={viewStyles.TextChiffreCle}>Articles non porté</Text>
          </View>
        </View>
      </View>
      <Text style={styles.H3Title}>Top de mes vêtements</Text>
      <FlatList
        data={sectionsSorted}
        style={viewStyles.ListTop}
        renderItem={this.renderListItem}
        keyExtractor={this.keyExtractor}
      />
    </View>
  );
};
const viewStyles = StyleSheet.create({
  ContainerBgBlue: {
    backgroundColor: '#748CAA',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20
  },
  ContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  TextLeft: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFFFFF'
  },
  TextRight: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
    color: '#FFFFFF'
  },
  ProgressBar: {
    backgroundColor: '#3D5C76',
    height: 10,
    borderRadius: 10
  },
  ContainerChiffresCles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: -7.5,
    marginBottom: 20
  },
  MarginChiffreCles: {
    marginHorizontal: 7.5,
    flex: 1 / 2
  },
  ContentChiffreCles: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  ChiffreCle: {
    fontFamily: 'Jost-Medium',
    fontSize: 30,
    color: '#09091A',
    marginRight: 10
  },
  TextChiffreCle: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    color: '#09091A',
    maxWidth: 67
  },
  ListTop: {
    marginBottom: 15
  },
  ListItem: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ListIndex: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    color: '#808F9D',
    marginRight: 10
  },
  ListImage: {
    width: 70,
    height: 70,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  ListTitle: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    color: '#09091A',
    marginBottom: 5
  },
  ListNumber: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
    color: '#808F9D'
  }
});
export default Analytics;