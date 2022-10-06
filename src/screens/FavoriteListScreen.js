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
import React, { useEffect, useState } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchDropDown from "../components/SearchDropDown";

import color from "../contains/color";
import imageOpacity from "../.././assets/opacity.png";
import imageWindy from "../.././assets/windy.png";

import values from "../contains/values";

const DATA_FAVORITE = [
  {
    id: "0",
    latitude: 21.028511,
    longitude: 105.804817,
    address: "Hà Nội",
    icon: "10d",
    temp: 25.01,
    humidity: 88,
    wind_speed: 1.65,
  },
  {
    id: "1",
    latitude: 35.652832,
    longitude: 139.839478,
    address: "Tokyo",
    icon: "10d",
    temp: 25.01,
    humidity: 88,
    wind_speed: 1.65,
  },
  {
    id: "2",
    latitude: 40.73061,
    longitude: -73.935242,
    address: "New York",
    icon: "10d",
    temp: 25.01,
    humidity: 88,
    wind_speed: 1.65,
  },
];

const ItemFavorite = ({
  address,
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
          <Text style={styles.text_city}>{address}</Text>
        </View>
        <View style={styles.itemFavoriteRight}>
          <Image
            style={{
              width: 55,
              height: 10,
              flex: 1,
            }}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}@4x.png`,
            }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
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

const axios = require("axios").default;

function Favorite({ navigation }) {
  function renderItemFavorite({ item }) {
    const location_item = {
      coords: { latitude: item.latitude, longitude: item.longitude },
    };
    const pressHandler = ({}) => {
      navigation.navigate("FavoriteOverview", {
        latitude: item.latitude,
        longitude: item.longitude,
      });
    };

    return (
      <ItemFavorite
        address={item.address}
        icon={item.icon}
        temp={item.temp.toFixed()}
        humidity={item.humidity}
        wind_speed={item.wind_speed}
        // address={address[0].region}
        // icon={forecast.current.weather[0].icon}
        // temp={forecast.current.temp}
        // humidity={forecast.current.humidity}
        // wind_speed={forecast.current.wind_speed}
        onPress={pressHandler}
      />
    );
  }

  const [filteredData, setFilteredData] = useState(null);

  // const [forecast, setForecast] = useState(null);
  // const [address, setAddress] = useState(null);

  // async function getAddress() {
  //   axios
  //     .get(
  //       "https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&units=metric",
  //       {
  //         params: {
  //           appid: values.key_API,
  //           lat: item.latitude,
  //           lon: item.longitude,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setForecast(response.data);
  //     })
  //     .catch((error) => console.log("Error::: ", error));
  //   let location = {
  //     latitude: item.latitude,
  //     longitude: item.longitude,
  //   };
  //   let address = await Location.reverseGeocodeAsync(location);
  //   setAddress(address);
  // }

  // const navigation = useNavigation();

  const [locationSearch, setLocationSearch] = useState(null); // array object location
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    // load Favorite
    // ...
    setFilteredData(DATA_FAVORITE);

    // navigation: search bar header
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Tìm kiếm",
        onChangeText: (event) => {
          const text = event.nativeEvent.text.trim();
          if (text) {
            setSearching(true);
            searchFilterFunction(text);
          } else {
            setSearching(false);
          }
        },
      },
    });
  }, [navigation]);

  const searchFilterFunction = async (text) => {

    // nominatim openstreetmap: get location from address
    axios
      .get("https://nominatim.openstreetmap.org/search?format=json", {
        params: {
          country: "VN",
          city: text,
        },
      })
      .then(async (response) => {
        if (response.data) {
          await setLocationSearch(response.data);
          console.log("Address search::: ", response.data);
        } else {
        }
      })
      .catch((error) => console.log("Error::: ", error));
  };

  if (!DATA_FAVORITE.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Vui lòng thêm thành phố yêu thích!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!searching && (
        <FlatList
          numColumns={2}
          data={filteredData}
          renderItem={renderItemFavorite}
          keyExtractor={(item) => item.id}
        />
      )}

      {searching && locationSearch && (
        <SearchDropDown navigation={navigation} locationSearch={locationSearch} />
      )}
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
    width: 15,
    height: 12,
    tintColor: color.textColor,
  },
});

export default Favorite;
