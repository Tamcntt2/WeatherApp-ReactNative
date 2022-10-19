import { StyleSheet, SafeAreaView, AsyncStorage } from "react-native";
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import Ionic from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {requestUserPermission} from "./src/untils/pushNotification";
import HomeScreen from "./src/screens/HomeScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import MenuScreen from "./src/screens/MenuScreen";
import MapScreen from "./src/screens/MapScreen";
import React, { useEffect, useState } from "react";


const Tab = createBottomTabNavigator();

export default function App() {

  useEffect(() => {
    getFCMToken();
    // requestUserPermission();
    // NotificationListner();
  })

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });
  }

  return (
    // <SafeAreaView>
      <NavigationContainer >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Favorite") {
                iconName = focused ? "heart" : "heart-outline";
              } else if (route.name === "Map") {
                iconName = focused ? "map" : "map-outline";
              } else if (route.name === "Menu") {
                iconName = focused ? "menu" : "menu-outline";
              }
              return <Ionic name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            showLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Menu"
            component={MenuScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
