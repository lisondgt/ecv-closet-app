import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, SectionList, FlatList, Image, StyleSheet } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { OutfitDao } from '../../dao/OutfitDao.js';
import { AuthService } from '../../services/AuthService.js';

import styles from './../../../assets/styles/style.js';

import IconPlusWhite from './../../../assets/images/icon-plus-white.svg';

const OutfitList = ({ navigation }) => {

  const currentUserId = new AuthService().getUser().uid;
  const isFocused = useIsFocused();
  const [outfitSummer, setOutfitSummer] = useState([]);
  const [outfitSpring, setOutfitSpring] = useState([]);
  const [outfitAutumn, setOutfitAutumn] = useState([]);
  const [outfitWinter, setOutfitWinter] = useState([]);
  const totalItems = outfitSummer.length
    + outfitSpring.length
    + outfitAutumn.length
    + outfitWinter.length;

  useEffect(() => {

    if (isFocused) {
      const outfitDao = new OutfitDao();

      outfitDao.fetchAllBySeason('Été', currentUserId).then(setOutfitSummer);
      outfitDao.fetchAllBySeason('Printemps', currentUserId).then(setOutfitSpring);
      outfitDao.fetchAllBySeason('Automne', currentUserId).then(setOutfitAutumn);
      outfitDao.fetchAllBySeason('Hiver', currentUserId).then(setOutfitWinter);
    }

  }, [isFocused]);

  const sections = [
    {
      title: "Été",
      count: outfitSummer.length,
      data: [
        {
          list: outfitSummer
        },
      ],
    },
    {
      title: "Printemps",
      count: outfitSpring.length,
      data: [
        {
          list: outfitSpring
        },
      ],
    },
    {
      title: "Automne",
      count: outfitAutumn.length,
      data: [
        {
          list: outfitAutumn
        },
      ],
    },
    {
      title: "Hiver",
      count: outfitWinter.length,
      data: [
        {
          list: outfitWinter
        },
      ],
    },
  ];

  const renderEmptyContainer = () => {
    return (
      <View style={fileStyle.CardAddContainer}>
        <View style={fileStyle.CardAddCol}>
          <View style={fileStyle.CardAddMargin}>
            <TouchableOpacity
              onPress={() => navigation.navigate('OutfitAdd')}
              style={fileStyle.CardAddButton}>
              <View style={fileStyle.CardAddIcon}>
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
      <View style={fileStyle.OutfitView}>
        <FlatList
          data={item.list}
          numColumns={3}
          renderItem={this.renderListItem}
          keyExtractor={this.keyExtractor}
          scrollEnabled={false}
          style={fileStyle.OutfitList}
          columnWrapperStyle={fileStyle.OutfitRow}
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
      <View style={fileStyle.OutfitCol}>
        <View style={fileStyle.OutfitMargin}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OutfitDetail', {
              key: item.key
            })}>
            <View style={fileStyle.OutfitCard}>
              <View style={fileStyle.ImagesContainer}>
                {item.top ?
                  <View style={fileStyle.ImagesCol}>
                    <View style={fileStyle.ImagesMargin}>
                      <Image
                        source={{ uri: item.top }}
                        style={fileStyle.ImageCard}
                      />
                    </View>
                  </View>
                  : null
                }
                {item.bottom ?
                  <View style={fileStyle.ImagesCol}>
                    <View style={fileStyle.ImagesMargin}>
                      <Image
                        source={{ uri: item.bottom }}
                        style={fileStyle.ImageCard}
                      />
                    </View>
                  </View>
                  : null
                }
                {item.layer ?
                  <View style={fileStyle.ImagesCol}>
                    <View style={fileStyle.ImagesMargin}>
                      <Image
                        source={{ uri: item.layer }}
                        style={fileStyle.ImageCard}
                      />
                    </View>
                  </View>
                  : null
                }
                {item.shoes ?
                  <View style={fileStyle.ImagesCol}>
                    <View style={fileStyle.ImagesMargin}>
                      <Image
                        source={{ uri: item.shoes }}
                        style={fileStyle.ImageCard}
                      />
                    </View>
                  </View>
                  : null
                }
              </View>
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
            navigation.navigate('OutfitAdd')}
          style={styles.AddIcon}>
          <IconPlusWhite width={15} height={15} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.ContainerView}>
      <Text style={styles.Subtitle}>{totalItems} Tenues</Text>
      <Text style={styles.H1Title}>Mes tenues</Text>
      <SectionList
        sections={sections}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderSection}
      />
    </View>
  );
};

const fileStyle = StyleSheet.create({
  OutfitView: {
    marginBottom: 15
  },
  OutfitList: {
    margin: -7,
  },
  OutfitRow: {
    justifyContent: 'flex-start'
  },
  OutfitCol: {
    flex: 1 / 2
  },
  OutfitMargin: {
    margin: 7,
  },
  OutfitCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    width: '100%',
    aspectRatio: 1,
    padding: 10
  },
  ImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -5
  },
  ImagesCol: {
    width: '50%'
  },
  ImagesMargin: {
    margin: 5
  },
  ImageCard: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CardAddContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  CardAddCol: {
    flex: 1 / 2
  },
  CardAddMargin: {
    margin: 7,
  },
  CardAddButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CardAddIcon: {
    backgroundColor: '#808F9D',
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OutfitList;

