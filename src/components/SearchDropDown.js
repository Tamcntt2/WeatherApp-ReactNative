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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 10,
          backgroundColor: "red",
          width: "100%",
        }}
      >
        <View style={{ flex: 1, width: "100%" }}>
          {props.locationSearch.map((itemD) => {
            return (
              <TouchableOpacity
                onPress={(item) => {
                  console.log("Drop:::", itemD);
                  const lat = itemD.lat;
                  const lon = itemD.lon;
                  const address = itemD.address;
                  props.navigation.navigate("FavoriteOverview", {
                    latitude: lat,
                    longitude: lon,
                    isFavorite: false,
                    handleAddDataStorage: props.handleAddDataStorage,
                    handleDeleteDataStorage: props.handleDeleteDataStorage,
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
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 20,
    fontSize: 15,
  },
});

export default SearchDropDown;
