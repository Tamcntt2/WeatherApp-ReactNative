import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import color from "../contains/color";

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

function HourlyItem(props) {
  return (
    <View style={styles.hourly}>
      <Text style={styles.text_hour_1}>15</Text>
      <Image style={{ width: 35, height: 30, marginTop: 7, }} source={imageCloudy} />
      <Text style={styles.text_hour_2}>10°</Text>
    </View>
  );
}

export default HourlyItem;

const styles = StyleSheet.create({
  hourly: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text_hour_1: {
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
    fontSize: 22,
    fontStyle: "normal",
    lineHeight: 28,
    marginTop: 7,
  },
});
