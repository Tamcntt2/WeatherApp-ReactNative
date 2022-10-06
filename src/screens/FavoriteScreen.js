import { View, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionic from "react-native-vector-icons/Ionicons";

import FavoriteOverviewScreen from "./FavoriteOverviewScreen";
import FavoriteListScreen from "./FavoriteListScreen";

const Stack = createNativeStackNavigator();

const Favorite = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTitle: false,
            headerBackVisible: true,
            headerLargeTitle: false,
          }}
          name="FavoriteList"
          component={FavoriteListScreen}
        />
        <Stack.Screen
          name="FavoriteOverview"
          component={FavoriteOverviewScreen}
          options={{
            title: "",
            headerBackVisible: true,
            headerRight: () => (
              <View>
                <TouchableOpacity>
                  <Ionic name="star-outline" size={25} color="red" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Favorite;
