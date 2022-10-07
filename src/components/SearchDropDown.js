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
        // backgroundColor: "#d7e3e5",
        width: "100%",
        height: 320,
        marginTop: 3,
        alignItems: "center", justifyContent: "center"
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 10 }}>
        <View style={{ flex: 1 }}>
          {props.locationSearch.map((itemD) => {
            return (
              <TouchableOpacity
                onPress={(item) => {
                  console.log("Drop:::", itemD);
                  props.navigation.navigate("FavoriteOverview", {
                    latitude: itemD.lat,
                    longitude: itemD.lon,
                  });
                }}
              >
                <Text style={styles.itemDropdown}>{itemD.display_name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDropdown: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 20,
    fontSize: 15,
  },
});

export default SearchDropDown;
