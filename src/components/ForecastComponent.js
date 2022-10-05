import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
  FlatList,
  RefreshControl,
  // AsyncStorage,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Location from "expo-location";
import color from "../contains/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HourlyItem from "../screens/ItemHourly";
import DailyItem from "../screens/ItemDaily";
import imageOpacity from "../.././assets/opacity.png";
import imageVector from "../.././assets/vector.png";
import imageWindy from "../.././assets/windy.png";

function ForecastComponent(props) {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const loadForecast = async () => {
    setRefreshing(true);

    // permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = props.location;
    setLocation(location);
    console.log("location:::", location);
    let address = await Location.reverseGeocodeAsync(location.coords);
    setAddress(address);
    console.log("Address::: ", address);

    fetchDataFromApi(location.coords.latitude, location.coords.longitude);

    // console.log("Location::: ", location);
    setRefreshing(false);
  };

  const axios = require("axios").default;

  const fetchDataFromApi = (latitude, longitude) => {
    axios
      .get(
        "https://api.openweathermap.org/data/3.0/onecall?exclude=minutely&units=metric",
        {
          params: {
            appid: "1b5dcb72d707f1eca07003b425497af6",
            lat: latitude,
            lon: longitude,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setForecast(response.data);
      })
      .catch((error) => console.log("Error::: ", error));
  };

  useEffect(() => {
    loadForecast();
  }, []);

  if (!forecast) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const current = forecast.current.weather[0];

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadForecast()}
          />
        }
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.top}>
          <View style={styles.top_left}>
            <Text style={styles.text_city}>{address[0].region}</Text>
            <Text style={styles.text_temp}>
              {forecast.current.temp.toFixed()}°
            </Text>
            <View style={styles.cloudyContainer}>
              <Text
                style={styles.text_cloudy}
                onPress={() => {
                  loadLocation();
                  loadForecast();
                }}
              >
                {current.main}
              </Text>
            </View>
          </View>
          <View style={styles.top_right}>
            <Image
              style={{
                width: 200,
                height: 150,
                flex: 1,
                tintColor: color.tintColorIconWeather,
              }}
              source={{
                uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
              }}
            />
          </View>
        </View>

        <View style={styles.center}>
          <View View style={styles.infoContainer}>
            <View style={styles.info}>
              <Image style={styles.imageInfo} source={imageOpacity} />
              <Text style={styles.textInfo}>{forecast.current.humidity}%</Text>
            </View>
            <View style={styles.info}>
              <Image style={styles.imageInfo} source={imageVector} />
              <Text style={styles.textInfo}>
                {forecast.current.pressure} hPa
              </Text>
            </View>
            <View style={styles.info}>
              <Image style={styles.imageInfo} source={imageWindy} />
              <Text style={styles.textInfo}>
                {forecast.current.wind_speed}km/h
              </Text>
            </View>
          </View>
          <View style={styles.todayContainer}>
            <Text style={styles.text_today}>Today</Text>
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.hourlyContainer}
          >
            {forecast.hourly.slice(0, 5).map((item) => {
              var dt = new Date(item.dt * 1000);
              return (
                <HourlyItem
                  temp={Math.round(item.temp)}
                  icon={item.weather[0].icon}
                  hour={dt.getHours()}
                />
              );
            })}
          </ScrollView>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.dailyContainer}
        >
          {forecast.daily.slice(0, 5).map((item) => {
            var dt = new Date(item.dt * 1000);
            return (
              <DailyItem
                temp={Math.round(item.temp.min)}
                feels_like={Math.round(item.temp.max)}
                icon={item.weather[0].icon}
                day={days[dt.getDay()]}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  top: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  top_left: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  top_right: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text_city: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 36,
    fontStyle: "normal",
    lineHeight: 42,
  },
  tempContainer: {
    flexDirection: "row",
    height: 82,
    marginTop: 8,
  },
  text_temp: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 70,
    fontStyle: "normal",
    lineHeight: 82,
  },
  cloudyContainer: {
    marginTop: 15,
    backgroundColor: "#F0EFEF",
    borderRadius: 20,
  },
  text_cloudy: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    fontSize: 17,
    fontStyle: "normal",
    lineHeight: 20,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  center: {
    paddingTop: 20,
    flexDirection: "column",
  },
  todayContainer: {
    flex: 1,
    paddingTop: 10,
  },
  text_today: {
    color: "#BDCBD7",
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 500,
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 23,
    marginLeft: 20,
  },
  infoContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInfo: {
    marginLeft: 10,
    color: "black",
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 500,
    fontSize: 17,
    fontStyle: "normal",
    lineHeight: 20,
  },
  hourlyContainer: {
    flex: 3,
    flexDirection: "row",
    paddingTop: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text_hour_1: {
    flex: 1,
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 21,
  },
  text_hour_2: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 28,
  },

  dailyContainer: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default ForecastComponent;
