import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

const SearchDropDown = (props) => {
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#d7e3e5",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {props.locationSearch.map((item) => {
          return (
            <TouchableOpacity
            //   onPress={(item) => {
            //     console.log("Drop:::", item);
            //     props.navigation.navigate("FavoriteOverview", {
            //       latitude: item.lat,
            //       longitude: item.lon,
            //     });
            //   }}
            >
              <Text style={styles.itemDropdown}>{item.display_name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDropdown: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 15,
  },
});

export default SearchDropDown;
