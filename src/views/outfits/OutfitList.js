import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, SectionList, FlatList, Image } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import styles from './../../../assets/styles/style.js';

import IconPlusWhite from './../../../assets/images/icon-plus-white.svg';

const OutfitList = ({ navigation }) => {

  const sections = [
    {
      title: "Été",
      count: 0,
      data: [
        {
          list: []
        },
      ],
    },
    {
      title: "Printemps",
      count: 0,
      data: [
        {
          list: []
        },
      ],
    },
    {
      title: "Automne",
      count: 0,
      data: [
        {
          list: []
        },
      ],
    },
    {
      title: "Hiver",
      count: 0,
      data: [
        {
          list: []
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
              onPress={() => navigation.navigate('OutfitAdd')}
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
          <TouchableOpacity>
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
    return item.name;
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
      <Text style={styles.Subtitle}>0 Tenues</Text>
      <Text style={styles.H1Title}>Mes tenues</Text>
      <SectionList
        sections={sections}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderSection}
      />
    </View>
  );
};

export default OutfitList;

