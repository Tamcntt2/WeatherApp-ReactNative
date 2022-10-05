import { StyleSheet, SafeAreaView, AsyncStorage } from "react-native";
import React from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import MenuScreen from "./src/screens/MenuScreen";
import MapScreen from "./src/screens/MapScreen";

const Tab = createBottomTabNavigator();

export default function App() {
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
