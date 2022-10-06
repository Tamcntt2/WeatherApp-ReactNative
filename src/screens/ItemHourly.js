import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import color from "../contains/color";

function ItemHourly(props) {
  return (
    <View style={styles.hourly}>
      <Text style={styles.textHour1}>{props.hour}</Text>
      <Image
        style={{
          width: 40,
          height: 40,
          marginTop: 7,
          flex: 1,
        }}
        source={{
          uri: `http://openweathermap.org/img/wn/${props.icon}@4x.png`,
        }}
      />
      <Text style={styles.textHour2}>{props.temp}°</Text>
    </View>
  );
}

export default ItemHourly;

const styles = StyleSheet.create({
  hourly: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textHour1: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 21,
  },
  textHour2: {
    color: color.textColor,
    // fontFamily: 'Roboto Condensed',
    // fontWeight: 700,
    fontSize: 22,
    fontStyle: "normal",
    lineHeight: 28,
    marginTop: 7,
  },
});
