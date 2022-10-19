import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchDropDown from "../components/SearchDropDown";

import color from "../contains/color";
import imageOpacity from "../.././assets/opacity.png";
import imageWindy from "../.././assets/windy.png";
import imageSearch from "../.././assets/search.png";

import values from "../contains/values";

// const DATA = [
//   {
//     id: "0",
//     latitude: 21.028511,
//     longitude: 105.804817,
//     address: "Hà Nội1",
//     icon: "10d",
//     temp: 25.01,
//     humidity: 88,
//     wind_speed: 1.65,
//     isFavorite: true,
//   },
//   {
//     id: "1",
//     latitude: 35.652832,
//     longitude: 139.839478,
//     address: "Tokyo",
//     icon: "10d",
//     temp: 25.01,
//     humidity: 88,
//     wind_speed: 1.65,
//     isFavorite: true,
//   },
//   {
//     id: "2",
//     latitude: 40.73061,
//     longitude: -73.935242,
//     address: "New York",
//     icon: "10d",
//     temp: 25.01,
//     humidity: 88,
//     wind_speed: 1.65,
//     isFavorite: true,
//   },
// ];

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
        }}
      >
        <View style={styles.itemFavoriteLeft}>
          <Text style={styles.textTemp}>{temp}°</Text>
          <Text style={styles.textCity}>{address}</Text>
        </View>
        <View style={styles.itemFavoriteRight}>
          <Image
            style={{
              width: 53,
              height: 50,
              flex: 1,
              marginRight: 7,
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
    const pressHandler = ({}) => {
      navigation.navigate("FavoriteOverview", {
        latitude: item.latitude,
        longitude: item.longitude,
        isFavorite: item.isFavorite,
        handleDeleteDataStorage: handleDeleteDataStorage,
        handleAddDataStorage: handleAddDataStorage,
      });
    };

    return (
      <ItemFavorite
        address={item.address}
        icon={item.icon}
        temp={item.temp.toFixed()}
        humidity={item.humidity}
        wind_speed={item.wind_speed}
        onPress={pressHandler}
      />
    );
  }

  const [locationSearch, setLocationSearch] = useState(null); // array object location
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataListFavorite, setDataListFavorite] = useState(null);

  const loadDataStorage = () => {
    AsyncStorage.getItem("storedData")
      .then((data) => {
        if (data !== null) {
          // let location = JSON.parse(data)
          setDataListFavorite(JSON.parse(data));
        }
      })
      .catch((error) => console.error(error));

    loadForecastFavorite();
  };

  useEffect(() => {
    // handleClearDataStorage();
    loadDataStorage();
  }, []);

  const handleDeleteDataStorage = (latitude, longitude) => {
    const newData = [...dataListFavorite];
    const itemIndex = dataListFavorite.findIndex(
      (item) => item.latitude == latitude && item.longitude == longitude
    );
    newData.splice(itemIndex, 1);

    AsyncStorage.setItem("storedData", JSON.stringify(newData))
      .then(() => {
        setDataListFavorite(newData);
      })
      .catch((error) => console.log(error));
  };

  const handleAddDataStorage = (itemData) => {
    let check = true;
    dataListFavorite.forEach((item) => {
      if (!item.address.localeCompare(itemData.address)) {
        check = false;
        return;
      }
    });

    if (check) {
      const newData = [...dataListFavorite, itemData];
      AsyncStorage.setItem("storedData", JSON.stringify(newData))
        .then(() => {
          setDataListFavorite(newData);
        })
        .catch((error) => console.log(error));
    }

    // navigation.getParent()?.goBack();
  };

  const handleClearDataStorage = () => {
    setDataListFavorite([]);
    AsyncStorage.setItem("storedData", JSON.stringify([]))
      .then(() => {
        setDataListFavorite([]);
      })
      .catch((error) => console.log(error));
  };

  const loadForecastFavorite = async function () {
    for (let i = 0; i < dataListFavorite.length; i++) {
      console.log("Loading favorite:::", i);

      axios
        .get(
          "https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&units=metric",
          {
            params: {
              appid: values.key_API,
              lat: dataListFavorite[i].latitude,
              lon: dataListFavorite[i].longitude,
            },
          }
        )
        .then((response) => {
          dataListFavorite[i].icon = response.data.current.weather[0].icon;
          dataListFavorite[i].temp = response.data.current.temp;
          dataListFavorite[i].humidity = response.data.current.humidity;
          dataListFavorite[i].wind_speed = response.data.current.wind_speed;
        })
        .catch((error) => console.log("Error::: ", error));
      let location = {
        latitude: dataListFavorite[i].latitude,
        longitude: dataListFavorite[i].longitude,
      };
      let address = await Location.reverseGeocodeAsync(location);
      dataListFavorite[i].address = address[0].region;
    }
    setLoading(true);
  };

  const searchFilterFunction = async (text) => {
    // nominatim openstreetmap: get location from address
    axios
      .get("https://nominatim.openstreetmap.org/search?format=json", {
        params: {
          country: "VN",
          city: text,
          addressdetail: 1,
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

  if (!loading) {
    console.log("Loading favorite fail!");
    // return (
    //   <SafeAreaView
    //     style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    //   >
    //     <ActivityIndicator size="large" />
    //   </SafeAreaView>
    // );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "rgba(240, 239, 239, 1)",
            height: 50,
            marginTop: 20,
            marginHorizontal: 10,
          }}
        >
          <Image
            source={imageSearch}
            style={{
              width: 25,
              height: 25,
              tintColor: "#A4A4A4",
              marginLeft: 10,
            }}
          />
          <TextInput
            placeholder="Tìm kiếm"
            style={{
              fontSize: 20,
              width: "80%",
              marginLeft: 20,
              color: "#A4A4A4",
            }}
            onChangeText={(text) => {
              if (text) {
                setSearching(true);
                searchFilterFunction(text);
              } else {
                setSearching(false);
              }
            }}
          />
        </View>

        {!searching && (!dataListFavorite || dataListFavorite.length === 0) && (
          <SafeAreaView
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text style={{ fontSize: "15" }}>
              Vui lòng thêm thành phố yêu thích!
            </Text>
          </SafeAreaView>
        )}

        {!searching && dataListFavorite && (
          <FlatList
            numColumns={2}
            data={dataListFavorite}
            renderItem={renderItemFavorite}
            keyExtractor={(item) => item.id}
          />
        )}

        {searching && locationSearch && (
          <SearchDropDown
            navigation={navigation}
            locationSearch={locationSearch}
            handleAddDataStorage={handleAddDataStorage}
            handleDeleteDataStorage={handleDeleteDataStorage}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },
  itemFavorite: {
    borderRadius: 20,
    // borderStyle: "solid 2",
    borderWidth: 2,
    width: 160,
    height: 150,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(242, 242, 242, 1)",
    marginTop: 15,
    marginHorizontal: 10,
  },
  itemFavoriteLeft: {
    alignItems: "center",
    // backgroundColor: "gray",
    justifyContent: "center",
    // backgroundColor: 'gray',
    width: 100,
  },
  itemFavoriteRight: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  textCity: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 23,
    marginLeft: 5,
  },
  tempContainer: {
    flexDirection: "row",
    height: 50,
  },
  textTemp: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 40,
    fontStyle: "normal",
    lineHeight: 47,
    marginLeft: 15,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 20,
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
