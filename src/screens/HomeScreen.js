import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import ForecastComponent from "../components/ForecastComponent";

function Home() {
  const [location, setLocation] = useState(null);

  const loadCurrentLocation = async () => {
    // permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    loadCurrentLocation();
  }, []);

  if (!location) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return <ForecastComponent location={location}/>;
}

export default Home;
