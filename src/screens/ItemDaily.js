import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import color from "../contains/color";

import imageRainy from "../.././assets/rainy.png";

function DailyItem(props) {
  return (
    <View style={styles.daily}>
      <Text style={styles.text_hour_1}>{props.day}</Text>
      <View style={{ flex: 1 }}>
        <Image
          style={{
            width: 40,
            height: 40,
            flex: 1,
            tintColor: color.tintColorIconWeather,
          }}
          source={{
            uri: `http://openweathermap.org/img/wn/${props.icon}@4x.png`,
          }}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.text_hour_2}>{props.temp}°</Text>
        <Text style={styles.textDaily2}>{props.feels_like}°</Text>
      </View>
    </View>
  );
}

export default DailyItem;

const styles = StyleSheet.create({
  hourly: {
    flex: 1,
    flexDirection: "column",
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
  daily: {
    flex: 1,
    paddingLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textDaily2: {
    textColor: color.textColor2,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 28,
    marginLeft: 10,
  },
});
