import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Swiper from 'react-native-swiper';
import { useIsFocused } from "@react-navigation/native";
import { OutfitDao } from '../../dao/OutfitDao.js';
import { AuthService } from '../../services/AuthService.js';

import styles from './../../../assets/styles/style.js';

import PencilWhite from './../../../assets/images/pencil-alt-white.svg';
import IconPlusWhite from './../../../assets/images/icon-plus-white.svg';
import CheckCornerOrange from './../../../assets/images/check-corner-orange.svg';

const Calendar = ({ navigation }) => {

  const currentUserId = new AuthService().getUser().uid;
  const [outfitItems, setOutfitItems] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const isFocused = useIsFocused();
  let today = new Date();

  useEffect(() => {

    if (isFocused) {
      const outfitDao = new OutfitDao();
      outfitDao.fetchAllById(currentUserId).then(setOutfitItems);
    }

  }, [isFocused]);

  function addDateWorn(key, dateWorn) {
    const outfitDao = new OutfitDao();
    outfitDao.update(key, {
      dateWorn: [
        ...dateWorn,
        selectedDate
      ]
    });
    outfitDao.fetchAllById(currentUserId).then(setOutfitItems);
  }

  function removeDateWorn(key, dateWorn) {
    const outfitDao = new OutfitDao();
    var array = [...dateWorn];
    var index = array.indexOf(selectedDate);
    array.splice(index, 1);
    outfitDao.update(key, {
      dateWorn: array
    });
    outfitDao.fetchAllById(currentUserId).then(setOutfitItems);
  }

  return (
    <View style={styles.ContainerView}>
      <View style={fileStyle.ContainerTop}>
        <CalendarStrip
          selectedDate={selectedDate}
          scrollable
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          style={{ height: 60, marginBottom: 10 }}
          calendarHeaderStyle={{ fontFamily: 'Lora-SemiBold', fontSize: 18, marginBottom: 10, textTransform: 'uppercase', color: '#09091A' }}
          dateNumberStyle={{ fontFamily: 'Jost-Regular', fontSize: 14, color: '#09091A' }}
          dateNameStyle={{ fontFamily: 'Jost-Regular', fontSize: 10, color: '#09091A' }}
          highlightDateNumberStyle={{ fontFamily: 'Jost-Regular', fontSize: 14, color: '#DD6E42' }}
          highlightDateNameStyle={{ fontFamily: 'Jost-Regular', fontSize: 10, color: '#DD6E42' }}
          iconLeft={require('./../../../assets/images/chevron-left-dark.png')}
          iconRight={require('./../../../assets/images/chevron-right-dark.png')}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={(date) => {
            setSelectedDate(date.format("YYYY-MM-DD"));
          }}
        />
      </View>
      <Swiper style={fileStyle.wrapper} dotStyle={fileStyle.dotStyle} activeDotStyle={fileStyle.activeDotStyle}>
        {outfitItems ?
          outfitItems.map((item) => {
            return (
              <View key={item.key} style={fileStyle.SilderOutfit}>
                <View style={item.dateWorn.includes(selectedDate)
                  ? fileStyle.ItemsCardSelected
                  : fileStyle.ItemsCard}>
                  {item.dateWorn.includes(selectedDate) ?
                    <View style={fileStyle.ContainerCheckConer}>
                      <CheckCornerOrange width={80} height={80} />
                    </View>
                    :
                    <TouchableOpacity style={fileStyle.EditButton}
                      onPress={() => navigation.navigate('OutfitDetail', {
                        key: item.key,
                      })}>
                      <Text style={fileStyle.EditText}>Modifier</Text>
                      <PencilWhite width={10} height={10} />
                    </TouchableOpacity>
                  }
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
                  {item.accessories ?
                    <View style={fileStyle.AccessoriesContainer}>
                      {item.accessories.map((item) => {
                        return (
                          <View key={item} style={fileStyle.AccessorieCol}>
                            <View style={fileStyle.AccessorieMargin}>
                              <Image
                                source={{ uri: item }}
                                style={fileStyle.AccessorieCard}
                              />
                            </View>
                          </View>
                        );
                      })}
                    </View>
                    : null
                  }
                  <View style={fileStyle.centeredView}>
                    {item.dateWorn.includes(selectedDate) ?
                      <TouchableOpacity style={fileStyle.SecondaryButton} onPress={() => {
                        removeDateWorn(item.key, item.dateWorn);
                      }}>
                        <Text style={fileStyle.SecondaryButtonText}>Retirer cette tenue</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={fileStyle.PrimaryButton} onPress={() => {
                        addDateWorn(item.key, item.dateWorn);
                      }}>
                        <Text style={fileStyle.PrimaryButtonText}>Choisir cette tenue</Text>
                      </TouchableOpacity>
                    }
                  </View>
                </View>
              </View>

            );
          })
          :
          <TouchableOpacity
            onPress={() => navigation.navigate('OutfitAdd')}
            style={fileStyle.CardAddButton}>
            <Text style={fileStyle.CardAddText}>Ajouter une tenue</Text>
            <View style={fileStyle.CardAddIcon}>
              <IconPlusWhite width={20} height={20} />
            </View>
          </TouchableOpacity>
        }
      </Swiper>
    </View>
  );
};
const fileStyle = StyleSheet.create({
  ContainerTop: {
    marginBottom: 10
  },
  ContainerWeather: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  TextWeather: {
    marginLeft: 5,
    fontFamily: 'Jost-Regular',
    fontSize: 12,
    color: '#808F9D'
  },
  ContainerCheckConer: {
    position: 'absolute',
    top: -2,
    right: -2,
    zIndex: 1
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
  CardAddText: {
    marginBottom: 10,
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    color: '#808F9D'
  },
  CardAddIcon: {
    backgroundColor: '#808F9D',
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotStyle: {
    backgroundColor: 'transparent',
    borderColor: '#09091A',
    borderWidth: 1,
    width: 10,
    height: 10,
    borderRadius: 5
  },
  activeDotStyle: {
    backgroundColor: '#09091A',
    borderColor: '#09091A',
    borderWidth: 1,
    width: 10,
    height: 10,
    borderRadius: 5
  },
  ItemsCardSelected: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    borderColor: '#DD6E42',
    borderWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    marginBottom: 20
  },
  ItemsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    marginBottom: 20
  },
  EditButton: {
    backgroundColor: '#748CAA',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  EditText: {
    fontFamily: 'Jost-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    marginRight: 5
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
  AccessoriesContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: -2
  },
  AccessorieCol: {
    flex: 1 / 4
  },
  AccessorieMargin: {
    marginHorizontal: 2
  },
  AccessorieCard: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    marginTop: 10,
    alignSelf: 'center'
  },
  PrimaryButton: {
    backgroundColor: '#DD6E42',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  PrimaryButtonText: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  SecondaryButton: {
    borderColor: '#DD6E42',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  SecondaryButtonText: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    color: '#DD6E42',
    textAlign: 'center'
  },
});
export default Calendar;