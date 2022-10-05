import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';

import color from "../contains/color";
import imageCloudy from "../.././assets/cloudy.png";
import imageOpacity from "../.././assets/opacity.png";
import imageWindy from "../.././assets/windy.png";
import imageSearch from "../.././assets/search.png";

const DATA_FAVORITE = [
  {
    id: "0",
    location: "Hà Nội",
    icon: ".././assets/cloudy.png",
    temp: "18",
    humidity: "13",
    wind_speed: "9",
  },
  {
    id: "1",
    location: "Hà Nội",
    icon: ".././assets/cloudy.png",
    temp: "18",
    humidity: "13",
    wind_speed: "9",
  },
  {
    id: "2",
    location: "Hà Nội",
    icon: ".././assets/cloudy.png",
    temp: "18",
    humidity: "13",
    wind_speed: "9",
  },
  {
    id: "3",
    location: "Hà Nội",
    icon: ".././assets/cloudy.png",
    temp: "18",
    humidity: "13",
    wind_speed: "9",
  },
  {
    id: "4",
    location: "Hà Nội",
    icon: ".././assets/cloudy.png",
    temp: "18",
    humidity: "13",
    wind_speed: "9",
  },
];

const ItemFavorite = ({
  location,
  icon,
  temp,
  humidity,
  wind_speed,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.itemFavorite}>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.itemFavoriteLeft}>
          <Text style={styles.text_temp}>{temp}°</Text>
          <Text style={styles.text_city}>{location}</Text>
        </View>
        <View style={styles.itemFavoriteRight}>
          <Image style={{ width: 47, height: 40 }} source={imageCloudy} />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          // paddingHorizontal: 10
        }}
      >
        <View style={styles.info}>
          <Image style={styles.imageInfo} source={imageOpacity} />
          <Text style={styles.textInfo}>{humidity}%</Text>
        </View>
        <View style={styles.info}>
          <Image style={styles.imageInfo} source={imageWindy} />
          <Text style={styles.textInfo}>{wind_speed}km/h</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

function Favorite({ navigation }) {
  function renderItemHour({ item }) {
    const pressHandler = () => {
      navigation.navigate("FavoriteOverview");
    };

    return (
      <ItemFavorite
        location={item.location}
        icon={item.icon}
        temp={item.temp}
        humidity={item.humidity}
        wind_speed={item.wind_speed}
        onPress={pressHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginLeft: 12,
            tintColor: "rgba(164, 164, 164, 1)",
          }}
          source={imageSearch}
        />
        <TextInput
          style={styles.textSearchBar}
          placeholder="Tìm kiếm"
          type="text"
        />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          numColumns={2}
          data={DATA_FAVORITE}
          renderItem={renderItemHour}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },
  searchBar: {
    backgroundColor: "rgba(240, 239, 239, 1)",
    borderRadius: 10,
    height: 50,
    width: "90%",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 50,
    flexDirection: "row",
  },
  textSearchBar: {
    marginLeft: 20,
    color: "rgba(164, 164, 164, 1)",
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 23,
    flex: 1,
  },

  listContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  itemFavorite: {
    borderRadius: 20,
    // borderStyle: "solid 2",
    borderWidth: 2,
    width: 150,
    height: 150,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(242, 242, 242, 1)",
    margin: 15,
  },
  itemFavoriteLeft: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemFavoriteRight: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text_city: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 23,
  },
  tempContainer: {
    flexDirection: "row",
    height: 50,
  },
  text_temp: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 40,
    fontStyle: "normal",
    lineHeight: 47,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  textInfo: {
    marginLeft: 5,
    color: "black",
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 500,
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 16,
  },
  imageInfo: {
    width: 17,
    height: 15,
    tintColor: color.textColor,
  },
});

export default Favorite;
