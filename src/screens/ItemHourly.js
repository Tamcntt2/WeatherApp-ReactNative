import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import color from "../contains/color";

function HourlyItem(props) {
  return (
    <View style={styles.hourly}>
      <Text style={styles.text_hour_1}>{props.hour}</Text>
      <Image
        style={{
          width: 40,
          height: 40,
          marginTop: 7,
          flex: 1,
          tintColor: color.tintColorIconWeather,
        }}
        source={{
          uri: `http://openweathermap.org/img/wn/${props.icon}@4x.png`,
        }}
      />
      <Text style={styles.text_hour_2}>{props.temp}°</Text>
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
