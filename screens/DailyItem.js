import {
    StyleSheet,
    Text,
    View,
    Image,
  } from "react-native";
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
  
  function DailyItem(props) {
    return (
        <View style={styles.daily}>
        <Text style={styles.text_hour_1}>Tu</Text>
        <View style={{ flex: 1 }}>
          <Image style={{ width: 35, height: 35 }} source={imageRainy} />
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Text style={styles.text_hour_2}>8°</Text>
          <Text style={styles.textDaily2}>8°</Text>
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
  