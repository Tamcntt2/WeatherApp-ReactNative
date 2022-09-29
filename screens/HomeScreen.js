import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
// import Geolocation from '@react-native-community/geolocation';

import color from "../contains/color";

import HourlyItem from "./HourlyItem";
import DailyItem from "./DailyItem";

import imageCloudy from ".././assets/cloudy.png";
import imageCircle from ".././assets/celsius.png";
import imageOpacity from ".././assets/opacity.png";
import imageVector from ".././assets/vector.png";
import imageWindy from ".././assets/windy.png";
import imageNight from ".././assets/night.png";
import imageNightCloudy from ".././assets/night-cloudy.png";
import imageRainy from ".././assets/rainy.png";
import imageRainy1 from ".././assets/rainy-1.png";
import imageStorm from ".././assets/storm.png";
import imageSun from ".././assets/sun.png";
import imageSunCloudy from ".././assets/sun-cloudy.png";
import imageSunset from ".././assets/sunset.png";

const DATA_HOUR = [
  {
    id: "0",
    hour: "10",
    icon: ".././assets/cloudy.png",
    temp: "8",
  },
  {
    id: "1",
    hour: "10",
    icon: ".././assets/cloudy.png",
    temp: "8",
  },
  {
    id: "2",
    hour: "10",
    icon: ".././assets/cloudy.png",
    temp: "8",
  },
  {
    id: "3",
    hour: "10",
    icon: ".././assets/cloudy.png",
    temp: "8",
  },
  {
    id: "4",
    hour: "10",
    icon: ".././assets/cloudy.png",
    temp: "8",
  },
];

// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const API_KEY = "cdcf3a31296891107b71508fb208f5a0";
// let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_KEY}`;
let url = `https://api.openweathermap.org/data/3.0/onecall?&units=metric&exclude=minutely&appid=${API_KEY}`;

function Home() {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);

    // permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }

    // get current location
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    // fetches the weather data
    const response = await fetch(
      // `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      `${url}&lat=21.027669&lon=105.795009`
      // `https://api.openweathermap.org/data/3.0/onecall?lat=21.0309072&lon=105.7817332&appid=ABC`
    );
    const data = await response.json();

    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
    } else {
      setForecast(data);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadForecast();
  }, []);

  if (!forecast) {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const current = forecast.current.weather[0];

  return (
    <SafeAreaView
      style={styles.container}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={() => loadForecast()}
      //   />
      // }
    >
      <View style={styles.top}>
        <View style={styles.top_left}>
          <Text style={styles.text_city}>Hà Nội</Text>
          <Text style={styles.text_temp}>10°</Text>
          <View style={styles.cloudyContainer}>
            <Text style={styles.text_cloudy}>Cloudy</Text>
          </View>
        </View>
        <View style={styles.top_right}>
          <Image style={{ width: 133, height: 108 }} source={imageCloudy} />
        </View>
      </View>

      <View style={styles.center}>
        <View View style={styles.infoContainer}>
          <View style={styles.info}>
            <Image style={styles.imageInfo} source={imageOpacity} />
            <Text style={styles.textInfo}>13%</Text>
          </View>
          <View style={styles.info}>
            <Image style={styles.imageInfo} source={imageVector} />
            <Text style={styles.textInfo}>1024 hPa</Text>
          </View>
          <View style={styles.info}>
            <Image style={styles.imageInfo} source={imageWindy} />
            <Text style={styles.textInfo}>9km/h</Text>
          </View>
        </View>
        <View style={styles.todayContainer}>
          <Text style={styles.text_today}>Today</Text>
        </View>

        <View style={styles.hourlyContainer}>
          <HourlyItem />
          <HourlyItem />
          <HourlyItem />
          <HourlyItem />
          <HourlyItem />
        </View>
      </View>

      <View style={styles.dailyContainer}>
        <DailyItem />
        <DailyItem />
        <DailyItem />
        <DailyItem />
        <DailyItem />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  top: {
    flex: 2,
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
    flex: 2,
    flexDirection: "column",
  },
  todayContainer: {
    flex: 1,
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
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
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
